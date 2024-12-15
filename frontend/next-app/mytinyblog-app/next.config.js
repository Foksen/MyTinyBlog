const path = require("path");

module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@lib": path.resolve(__dirname, "src/lib"),
      "@tailus-ui": path.resolve(__dirname, "src/components/tailus-ui"),
    };
    config.resolve.extensions = [".js", ".jsx", ".ts", ".tsx"];
    return config;
  },
};
