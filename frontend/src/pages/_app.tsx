/**
 * Next.js 앱 진입점
 * AuthProvider와 공통 레이아웃(Header, Footer)을 모든 페이지에 적용합니다.
 */

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from '../contexts/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../styles/globals.css';

/** GitHub Pages SPA 리다이렉트 처리 — 404.html에서 넘어온 경로를 복원 */
function useSpaRedirect() {
  const router = useRouter();
  useEffect(() => {
    const search = window.location.search;
    if (search && search.startsWith('?/')) {
      const path = search.slice(2).replace(/~and~/g, '&');
      router.replace('/' + path, undefined, { shallow: true });
    }
  }, [router]);
}

function AppInner({ Component, pageProps }: AppProps) {
  useSpaRedirect();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default function App(props: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>Travelit - AI와 함께하는 스마트 여행 계획</title>
        <meta name="description" content="AI가 맞춤형 여행 일정을 추천해드립니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppInner {...props} />
    </AuthProvider>
  );
}
