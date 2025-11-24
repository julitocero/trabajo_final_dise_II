# backend/persons-create/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

COPY backend/persons-create/package*.json ./backend/persons-create/
COPY backend/shared ./backend/shared
COPY backend/persons-create ./backend/persons-create

RUN cd backend/persons-create && npm install --no-audit --no-fund

ENV NODE_ENV=development
ENV PORT=4010

EXPOSE 4010

CMD ["sh", "-c", "cd backend/persons-create && npm run dev"]
