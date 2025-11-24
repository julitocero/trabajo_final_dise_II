FROM node:18-alpine

WORKDIR /usr/src/app

COPY frontend/sistema_de_gestion/package*.json ./frontend/sistema_de_gestion/
RUN cd frontend/sistema_de_gestion && npm install --no-audit --no-fund

COPY frontend/sistema_de_gestion ./frontend/sistema_de_gestion
COPY frontend/api.js ./frontend/api.js

ENV CHOKIDAR_USEPOLLING=true
ENV PORT=3000

EXPOSE 3000

CMD ["sh", "-c", "cd frontend/sistema_de_gestion && npm start"]
