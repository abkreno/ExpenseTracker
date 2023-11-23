module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            features: './features',
            components: './components',
            layouts: './layouts',
          },
        },
      ],
    ],
  };
};
