/** @type {import('jest').Config} */
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // next.config.js 및 .env 파일이 위치한 디렉토리
  dir: './',
});

const customJestConfig = {
  moduleNameMapper: {
    // @/ 경로 별칭 → src/ 디렉토리 매핑
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.js'],
};

module.exports = createJestConfig(customJestConfig);
