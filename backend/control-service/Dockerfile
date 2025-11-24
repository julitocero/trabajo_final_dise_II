FROM node:18-alpine

WORKDIR /app

COPY backend/control-service/package*.json ./
RUN npm install --no-audit --no-fund

COPY backend/control-service ./

EXPOSE 5005
CMD ["node", "index.js"]
