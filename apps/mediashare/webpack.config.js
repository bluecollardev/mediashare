const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  // Resolve relative reference ../Utilities/Platform using react-native-web
  // There is no non-native (i.e. web) version of Utilities/Platform in react-native, so things that depend on it break in a web build.
  config.resolve.alias['../Utilities/Platform'] = 'react-native-web/dist/exports/Platform';
  return config;
};
