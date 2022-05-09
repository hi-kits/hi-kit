const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.ex.base');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = webpackMerge.merge(baseConfig, {
  mode: 'production',
  output: {
    filename: '[name].[hash:7].js',
    chunkFilename: '[id].[hash].chunk.js',
  },
  plugins: [
    new cleanWebpackPlugin.CleanWebpackPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: { minimize: true }
    }),
  ]
});
