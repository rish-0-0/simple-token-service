FROM node:14-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --production

RUN mkdir -p dist

COPY ./dist ./dist

CMD [ "npm", "start" ]

EXPOSE 4321