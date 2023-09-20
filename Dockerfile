FROM node:13.14.0-alpine

WORKDIR /app

RUN apk add yarn

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
