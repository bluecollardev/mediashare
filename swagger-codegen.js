const { generateTSFiles } = require('swagger-ts-generator');

const path = require('path');

const config = {
  file: path.join(path.resolve(__dirname), 'swagger-spec.json'),
};

generateTSFiles(
  config.file, // This can be either a file containing the Swagger json or the Swagger object itself
  {
    modelFolder: './libs/core/swagger-types',
    enumTSFile: './libs/core/swagger-types',
    // + optionally more configuration
  }
);
