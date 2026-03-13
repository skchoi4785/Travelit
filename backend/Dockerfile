FROM node:20-alpine AS base

WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm ci

# 소스 복사
COPY . .

# Prisma 클라이언트 생성
RUN npx prisma generate

# 개발 모드 실행
CMD ["npm", "run", "start:dev"]
