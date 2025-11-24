# backend/auth/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy only necessary files from repo into image
COPY backend/auth/package*.json ./backend/auth/
COPY backend/shared ./backend/shared
COPY backend/auth ./backend/auth

# Install dependencies for the auth service (works because package.json is in backend/auth)
RUN cd backend/auth && npm install --no-audit --no-fund

ENV NODE_ENV=development
ENV PORT=4001

EXPOSE 4001

CMD ["sh", "-c", "cd backend/auth && npm run dev"]
