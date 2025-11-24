# backend/persons-read/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

COPY backend/persons-read/package*.json ./backend/persons-read/
COPY backend/shared ./backend/shared
COPY backend/persons-read ./backend/persons-read

RUN cd backend/persons-read && npm install --no-audit --no-fund

ENV NODE_ENV=development
ENV PORT=4011

EXPOSE 4011

CMD ["sh", "-c", "cd backend/persons-read && npm run dev"]
