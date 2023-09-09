FROM node:18

WORKDIR /usr/src/app
RUN npm install -g pnpm

COPY /dist .
COPY .en* .
COPY package.json .
COPY pnpm-lock.yaml .
COPY schema.graphql .

RUN pnpm install --prod

EXPOSE 4000
CMD [ "node", "index" ]
