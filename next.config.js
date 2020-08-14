module.exports = {
  distDir: 'build',
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.png$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: 'url-loader'
        }
      ]
    });
    return config;
  }
}