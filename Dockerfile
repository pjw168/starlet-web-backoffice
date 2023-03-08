# 1st Stage
FROM node:16.16-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

ENV NODE_ENV production
CMD ["yarn", "start"]
