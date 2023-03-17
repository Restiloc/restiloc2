module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
  	// ... some other plugins
    [
      'module-resolver',
      {
        "root": ["./src"],
        "alias": {
          "src": "./src",
          "screens": "./src/screens",
          "components": "./src/components",
        }
      },
    ],
  ],
};
