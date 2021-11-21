module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'inline-dotenv',
        {
          path: './.env', // See motdotla/dotenv for more options
        },
      ],
    ],
  };
};
