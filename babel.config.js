/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-20 10:23:15
 * @LastEditors: liulina
 * @LastEditTime: 2022-06-22 12:18:29
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    [
      'import',
      {
        libraryName: 'hi-kits',
        libraryDirectory: 'module',
        camel2DashComponentName: false, // default: true,
        customName: (name, file) => {
          console.log('---------namenamenamenamename-------------', name, file);
          return `hi-kits/module/${name}`;
        }
      }
    ]
  ]
};
