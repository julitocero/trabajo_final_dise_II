# backend/persons-update/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

COPY backend/persons-update/package*.json ./backend/persons-update/
COPY backend/shared ./backend/shared
COPY backend/persons-update ./backend/persons-update

RUN cd backend/persons-update && npm install --no-audit --no-fund

ENV NODE_ENV=development
ENV PORT=4012

EXPOSE 4012

CMD ["sh", "-c", "cd backend/persons-update && npm run dev"]
