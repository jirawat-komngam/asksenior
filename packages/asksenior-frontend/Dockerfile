FROM node:18.16

WORKDIR /app
RUN npm install -g pnpm

COPY /dist .
COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install --prod

RUN npm install -g serve

EXPOSE 3000
CMD serve -s .
