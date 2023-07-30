/* eslint-disable */
export default {
  displayName: 'user-svc-e2e',
  preset: '../../jest.preset.js',
  globalSetup: '<rootDir>/src/support/global-setup.ts',
  globalTeardown: '<rootDir>/src/support/global-teardown.ts',
  setupFiles: ['<rootDir>/src/support/test-setup.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  transformIgnorePatterns: [
    // Fix for jest-auto-stub
    "/node_modules/(?!(jest-auto-stub)/).*/"
  ],
  moduleFileExtensions: ['ts', 'js', 'html'],
  // coverageDirectory: '../../coverage/user-svc-e2e',
};
