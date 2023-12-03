# This base image is used to install our monorepo packages!
# We do this to save time on our local builds.
# Rebuild this when package dependencies / node_modules are updated!
# You will have to build this image using the following command from the project root:
# docker build -t authn-test-base -f ./docker/TestBase.dockerfile . <-- don't forget the '.'
# You can then run any of the docker compose services and your build time
# won't be super bogged down by having to install apk and npm dependencies
# whenever you run those projects.
FROM node:16-alpine

# Install utils
# RUN apk add --no-cache python3 make g++ curl nano git
RUN apk add python3 make g++ curl nano git
# Install PM2
# RUN npm install pm2 -g

# Create app dir
RUN mkdir -p /usr/src/app && chown node:node /usr/src/app

# Switch to node user
USER node

# Set workdir to app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image
COPY --chown=node ../../package.json package-lock.json ./
RUN npm i --force
