FROM node:16.13.1-buster as development

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --force

COPY . .

CMD ["npm", "start"]

# seperate build for production
FROM node:16.13.1-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
