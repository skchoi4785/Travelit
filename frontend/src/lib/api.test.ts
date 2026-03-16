/**
 * api.ts Axios 인스턴스 단위 테스트
 * 요청 인터셉터(토큰 첨부), 응답 인터셉터(401 처리) 검증
 *
 * 구현 주의: jest.mock + import 모두 호이스팅되므로
 * 인터셉터 콜백은 beforeAll 안에서 require()로 모듈을 로드해 캡처합니다.
 */

// localStorage Mock
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// document.cookie Mock
Object.defineProperty(document, 'cookie', { writable: true, value: '' });

// window.location Mock
const mockLocation = { href: '', pathname: '/some-page' };
Object.defineProperty(window, 'location', { value: mockLocation, writable: true });

// 인터셉터 콜백 저장 타입
type ReqHandler = (config: { headers: Record<string, string> }) => { headers: Record<string, string> };
type ResHandler = (res: unknown) => unknown;
type ErrHandler = (err: unknown) => Promise<never>;

// 캡처된 인터셉터 콜백을 담을 변수
let requestFulfilled: ReqHandler;
let responseFulfilled: ResHandler;
let responseRejected: ErrHandler;

// axios Mock: 인터셉터 use() 호출 시 콜백을 변수에 저장
jest.mock('axios', () => {
  const instance = {
    interceptors: {
      request: {
        use: (fulfilled: ReqHandler) => {
          requestFulfilled = fulfilled;
        },
      },
      response: {
        use: (fulfilled: ResHandler, rejected: ErrHandler) => {
          responseFulfilled = fulfilled;
          responseRejected = rejected;
        },
      },
    },
  };
  return { create: jest.fn(() => instance) };
});

// beforeAll에서 require()하면 jest.mock 호이스팅 이후에 모듈이 로드되므로
// 인터셉터 콜백이 위 let 변수에 정상 할당됩니다.
beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('./api');
});

describe('api.ts 인터셉터', () => {
  beforeEach(() => {
    localStorageMock.clear();
    mockLocation.href = '';
    mockLocation.pathname = '/some-page';
    document.cookie = '';
  });

  // ── 요청 인터셉터 ─────────────────────────────────────────────────────

  it('accessToken이 있으면 Authorization 헤더에 Bearer 토큰이 첨부된다', () => {
    localStorageMock.setItem('accessToken', 'test-token-123');
    const config = { headers: {} as Record<string, string> };
    const result = requestFulfilled(config);
    expect(result.headers['Authorization']).toBe('Bearer test-token-123');
  });

  it('accessToken이 없으면 Authorization 헤더가 추가되지 않는다', () => {
    const config = { headers: {} as Record<string, string> };
    const result = requestFulfilled(config);
    expect(result.headers['Authorization']).toBeUndefined();
  });

  // ── 응답 인터셉터: 정상 응답 ──────────────────────────────────────────

  it('정상 응답은 그대로 반환된다', () => {
    const response = { status: 200, data: { message: 'ok' } };
    const result = responseFulfilled(response);
    expect(result).toBe(response);
  });

  // ── 응답 인터셉터: 401 처리 ───────────────────────────────────────────

  it('401 응답 시 localStorage의 accessToken이 삭제된다', async () => {
    localStorageMock.setItem('accessToken', 'old-token');
    const removeItemSpy = jest.spyOn(localStorageMock, 'removeItem');
    const error = { response: { status: 401 } };
    await responseRejected(error).catch(() => {});
    expect(removeItemSpy).toHaveBeenCalledWith('accessToken');
  });

  it('401 응답 시 localStorage의 user가 삭제된다', async () => {
    localStorageMock.setItem('user', '{"id":1}');
    const removeItemSpy = jest.spyOn(localStorageMock, 'removeItem');
    const error = { response: { status: 401 } };
    await responseRejected(error).catch(() => {});
    expect(removeItemSpy).toHaveBeenCalledWith('user');
  });

  it('401 응답 시 현재 경로가 /login이 아니면 /login으로 리다이렉트된다', async () => {
    mockLocation.pathname = '/plans';
    const error = { response: { status: 401 } };
    await responseRejected(error).catch(() => {});
    expect(mockLocation.href).toBe('/login');
  });

  it('401 응답 시 현재 경로가 이미 /login이면 리다이렉트하지 않는다', async () => {
    mockLocation.pathname = '/login';
    const error = { response: { status: 401 } };
    await responseRejected(error).catch(() => {});
    expect(mockLocation.href).toBe('');
  });

  it('401 외 에러는 reject된다', async () => {
    const error = { response: { status: 500 } };
    await expect(responseRejected(error)).rejects.toEqual(error);
  });
});
