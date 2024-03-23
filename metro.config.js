const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

// Asynchronously retrieve the default configuration
const defaultConfigPromise = getDefaultConfig(__dirname);

module.exports = (async () => {
  const defaultConfig = await defaultConfigPromise;
  const {
    resolver: { sourceExts, assetExts },
  } = defaultConfig;

  // Custom configuration to merge with the default one
  const config = {
    transformer: {
      // Path to the SVG transformer
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
      // Enable the experimental require.context feature
      unstable_allowRequireContext: true,

      assetPlugins: ["expo-asset/tools/hashAssetFiles"],
    },
    resolver: {
      // Exclude 'svg' from asset extensions
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      // Add 'svg' to source extensions
      sourceExts: [...sourceExts, "svg"],
    },
  };

  // Merge and return the final configuration
  return mergeConfig(defaultConfig, config);
})();
