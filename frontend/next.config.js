/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // GitHub Pages 배포: /Travelit 하위 경로에 호스팅
  basePath: isProd ? '/Travelit' : '',
  assetPrefix: isProd ? '/Travelit/' : '',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
