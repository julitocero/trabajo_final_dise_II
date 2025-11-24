# backend/persons/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

COPY backend/persons/package*.json ./backend/persons/
COPY backend/shared ./backend/shared
COPY backend/persons ./backend/persons

RUN cd backend/persons && npm install --no-audit --no-fund

ENV NODE_ENV=development
ENV PORT=4002

EXPOSE 4002

CMD ["sh", "-c", "cd backend/persons && npm run dev"]
