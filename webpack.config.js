const { addTailwindPlugin } = require('@ngneat/tailwind');
const Dotenv = require('dotenv-webpack');
const tailwindConfig = require('./tailwind.config.js');

module.exports = (config) => {
  config.plugins = [...config.plugins, new Dotenv()];
  addTailwindPlugin({
    webpackConfig: config,
    tailwindConfig,
  });
  return config;
};
