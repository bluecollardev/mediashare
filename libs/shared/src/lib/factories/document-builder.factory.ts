import { DocumentBuilder } from '@nestjs/swagger';

interface DocumentBuilderFactory {
  title: string;
}

const DocumentBuilderFactory = function ({ title }: DocumentBuilderFactory) {
  return new DocumentBuilder()
    .setTitle(title)
    .setDescription('Media Share API')
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .addTag('{userId}');
};

export { DocumentBuilderFactory };
