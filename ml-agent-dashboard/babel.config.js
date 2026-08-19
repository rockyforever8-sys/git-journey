module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          // Transpile `#private` fields for Expo Go SDK 54 Hermes.
          unstable_transformProfile: 'hermes-v0',
        },
      ],
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@': './src',
          },
        },
      ],
    ],
  }
}
