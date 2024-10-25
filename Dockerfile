# Dockerfile cho App2
FROM node:14

WORKDIR /app

COPY app2/package.json ./
COPY app2/package-lock.json ./

RUN npm install

COPY app2/ ./

CMD ["npm", "start"]
