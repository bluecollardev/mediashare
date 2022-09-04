module.exports = {
  root: true,
  // TODO: Put this in the react-native app project!
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  // rules: { 'no-dupe-class-members': 'off' },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        semi: ['error', 'never'],
        'comma-dangle': ['error', 'never'],
      },
    },
  ],
};
