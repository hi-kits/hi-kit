const config = require('./config');
const path = require('path');

module.exports = {
  entry: './core/hi-element/index.ts',
  output: {
    path: path.resolve(process.cwd(), './dist'),
    filename: 'hi-element.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: config.alias,
    modules: ['node_modules']
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
  }
}
