// eslint-disable-next-line no-undef
module.exports = {
  displayName: 'media-api',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/media-api',
  testEnvironment: 'node',
};
