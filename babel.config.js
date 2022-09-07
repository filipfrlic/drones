module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          features: './src/features',
          core: './src/core',
        },
      },
    ],
  ],
};
