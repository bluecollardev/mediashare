import ReactNativeConfig from 'react-native-config'; // TODO: Use this once/if we eject!

interface ConfigInterface {
  API_SERVER: string | number;
  AWS_ROOT: string;
  VIDEO_ROOT: string;
  UPLOAD_ROOT: string;
  THUMBNAIL_ROOT: string;
  TEST_USER: string;
  TEST_PASSWORD: string;
  AWS_URL: string;
  MAX_UPLOAD: string | number;
  BUILD_FOR: string;
}

const Config: ConfigInterface = {
  API_SERVER: '',
  AWS_ROOT: '',
  VIDEO_ROOT: '',
  UPLOAD_ROOT: '',
  THUMBNAIL_ROOT: '',
  TEST_USER: '',
  TEST_PASSWORD: '',
  AWS_URL: '',
  MAX_UPLOAD: '',
  BUILD_FOR: '',
};

let env;
if (ReactNativeConfig.BUILD_FOR) {
  console.info('loading configuration, using react-native-config');
  env = ReactNativeConfig;
} else if (process.env.BUILD_FOR) {
  console.info('loading configuration, using .env');
  env = process.env;
}
console.info('checking configuratio...');
if (!env.BUILD_FOR) {
  console.info('loading configuration failed, using hardcoded defaults');
  // Hardcode default for now
  env = {
    API_SERVER: 1,
    AWS_ROOT: '',
    VIDEO_ROOT: 'videos/',
    UPLOAD_ROOT: 'uploads/',
    THUMBNAIL_ROOT: 'thumbnails/',
    TEST_USER: '',
    TEST_PASSWORD: '',
    AWS_URL: 'https://mediashare0079445c24114369af875159b71aee1c04439-dev.s3.amazonaws.com/public/',
    MAX_UPLOAD: 104857600,
    BUILD_FOR: 'admin',
  } as ConfigInterface;
}

Config.API_SERVER = env.API_SERVER;
Config.AWS_ROOT = env.AWS_ROOT;
Config.VIDEO_ROOT = env.VIDEO_ROOT;
Config.UPLOAD_ROOT = env.UPLOAD_ROOT;
Config.THUMBNAIL_ROOT = env.THUMBNAIL_ROOT;
Config.TEST_USER = env.TEST_USER;
Config.TEST_PASSWORD = env.TEST_PASSWORD;
Config.AWS_URL = env.AWS_URL;
Config.MAX_UPLOAD = env.MAX_UPLOAD;
Config.BUILD_FOR = env.BUILD_FOR;
console.info('exporting config', Config);

export default Config;
