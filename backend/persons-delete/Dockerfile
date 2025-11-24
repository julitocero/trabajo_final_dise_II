# backend/persons-delete/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

COPY backend/persons-delete/package*.json ./backend/persons-delete/
COPY backend/shared ./backend/shared
COPY backend/persons-delete ./backend/persons-delete

RUN cd backend/persons-delete && npm install --no-audit --no-fund

ENV NODE_ENV=development
ENV PORT=4013

EXPOSE 4013

CMD ["sh", "-c", "cd backend/persons-delete && npm run dev"]
