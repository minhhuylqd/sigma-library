FROM node:16

ADD package.json /tmp/package.json

ADD yarn.lock /tmp/yarn.lock

RUN rm -rf dist

RUN cd /tmp && yarn install

ADD ./ /src

# ADD .env /src/.env

RUN rm -rf src/node_modules && cp -a /tmp/node_modules /src/

WORKDIR /src

RUN yarn build

CMD ["node", "dist/server.js"]