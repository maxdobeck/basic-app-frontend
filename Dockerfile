FROM node:latest

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3131

CMD ["node", "build/dev-server.js"]
