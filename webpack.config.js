/*
 * @Descripttion: 
 * @version: 
 * @Author: liulina
 * @Date: 2022-07-22 10:17:57
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-22 16:13:35
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './examples/src/main.ts',
  output: {
    path: path.resolve(process.cwd(), '../dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/_utils/'),
      '@packages': path.resolve(__dirname, 'src/packages/'),
      '@mixins': path.resolve(__dirname, 'src/packages/_mixins/'),
      '@data': path.resolve(__dirname, 'src/packages/data/'),
      '@feedback': path.resolve(__dirname, 'src/packages/feedback/'),
      '@currency': path.resolve(__dirname, 'src/packages/currency/'),
      '@entry': path.resolve(__dirname, 'src/packages/entry/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: {
          loader: 'ts-loader',
          options: { configFile: 'tsconfig.json' },
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './examples/index.html',
      filename: './index.html',
      favicon: './examples/logo.svg',
      scriptLoading: 'module',
    })
  ],
  devServer: {
    // static: {
    //   directory: path.join(__dirname, 'public'),
    // },
    compress: true,
    port: 9000,
  },
};

