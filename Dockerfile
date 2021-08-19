
# FROM node:12.13-buster as development

# ENV NODE_ENV=development

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm ci

# COPY ./apps .

# CMD ["npm", "serve:prod"]

# seperate build for production
FROM node:12.13-buster as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY ./dist/ .

CMD ["node", "main"]
