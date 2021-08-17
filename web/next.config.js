const withTM = require("next-transpile-modules")(["three"]);

module.exports = withTM({
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },
  reactStrictMode: true,
});
