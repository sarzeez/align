module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      'module-resolver',
      {
        // cwd: 'babelrc',
        root: ['./src'],
        alias: {
          components: './src/components',
          config: './src/config',
          helpers: './src/helpers',
          localization: './src/localization',
          navigation: './src/navigation',
          screens: './src/screens',
          store: './src/store',
          theme: './src/theme',
          typings: './src/typings',
          assets: './src/assets',
          services: './src/services',
          images: './src/images',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
