const path = require('path');
const WebpackOnBuildPlugin = require('on-build-webpack');
var fs = require("fs");
// 设置为你的目标文件夹地址
var buildDir = './dist/';

module.exports = {
    // 入口文件配置项
    entry: ["./hi-element/index.ts"],
    // devtool: 'inline-source-map',
    // 模块：例如解读CSS,图片转换，压缩
    module: {
      // rules: [
      //   {
      //     test: /\.tsx?$/,
      //     use: 'ts-loader',
      //     exclude: /node_modules/
      //   }
      // ]
      loaders: [
        // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
        { test: /\.tsx?$/, loader: "ts-loader" }
    ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    // // 插件，用于生产模版和各项功能
    plugins:[
        // new uglify()
        new WebpackOnBuildPlugin(function(stats) {
          const newlyCreatedAssets = stats.compilation.assets;
          const unlinked = [];
          fs.readdir(path.resolve(buildDir), (err, files) => {
            files.forEach(file => {
              if (!newlyCreatedAssets[file]) {
                fs.unlink(path.resolve(buildDir + file));
                unlinked.push(file);
              }
            });
            if (unlinked.length > 0) {
              console.log('删除文件: ', unlinked);
            }
        });    
      })
    ],
    // 出口文件配置项
    output: {
      filename: 'bundle.js', // 指定出口文件路径及名称，[name]表示与入口文件名相同
      path: path.resolve(__dirname, 'dist'), // 配置出口文件目录
      // publicPath  : publicPath        // 给静态文件配置路径，便于静态资源找到正确路径
    }
};


