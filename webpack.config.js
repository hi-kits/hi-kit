/*
 * @Descripttion: 
 * @version: 
 * @Author: liulina
 * @Date: 2022-05-30 10:59:46
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-21 18:49:33
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
      '@utils': path.resolve(__dirname, 'src/_utils/')
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

