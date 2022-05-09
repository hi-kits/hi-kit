const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.ex.base');

module.exports = webpackMerge.merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 9000,
    // open: !process.env.CI,
    open: false,
    hot: true
  },
});
