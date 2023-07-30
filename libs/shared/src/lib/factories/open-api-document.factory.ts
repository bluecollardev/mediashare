import { DocumentBuilder } from '@nestjs/swagger';

interface DocumentBuilderFactoryParams {
  globalPrefix?: string;
  title: string;
  description: string;
  version?: string;
  tag?: string;
  servers: any;
}

export const configureOpenApi = (app) => (SwaggerModule) => ({ globalPrefix, title = 'My API', description = 'This is a sample description', version = '', tag = '', servers = [] }: DocumentBuilderFactoryParams) => {
  const builder = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)

  if (version) builder.setVersion(version);
  if (tag) builder.addTag(tag);

  servers.forEach((config) => {
    if (config && typeof config === 'string') {
      builder.addServer(config)
    } else if (config && typeof config === 'object') {
      const { url, description, variables } = config;
      console.info(`Swagger url: ${url} ${description}`);
      builder.addServer(url, description, variables);
    }
  });

  builder.addBearerAuth();
  const doc = builder.build();

  const document = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup(globalPrefix, app, document, { explorer: true });
};
