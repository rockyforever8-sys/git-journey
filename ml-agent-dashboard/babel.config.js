module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          // Expo Go SDK 54 Hermes does not parse `#private` fields.
          // hermes-v0 transpiles them away; hermes-stable leaves them in the bundle.
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
