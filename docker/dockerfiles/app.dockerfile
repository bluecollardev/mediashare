FROM mediashare-base AS project

# Read build args
ARG project
ARG environment=development

# Switch to node user
USER node

# Set workdir to app directory
WORKDIR /usr/src/app

# Copy local code to the container image
COPY --chown=node ../../apps ./apps
COPY --chown=node ../../libs ./libs
COPY --chown=node ../../certs ./certs
COPY --chown=node jest.config.ts jest.preset.js \
  nx.json tsconfig.base.json ./

FROM project AS builder

# Switch to node user
USER node

# Set workdir to app directory
WORKDIR /usr/src/app

# Create dist dir for build output, set ownership + permissions on contents
RUN mkdir -p dist && \
  chmod -R +rwx dist && \
  chown -R node:node dist && \
  chmod -R +rwx dist/. && chown -R node:node dist/.

# Run NX project
ENV command="npm run docker:$project:$environment"
CMD $command
