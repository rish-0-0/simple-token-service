FROM node:14-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --production

COPY dist/* ./dist

RUN npm start

EXPOSE 4321