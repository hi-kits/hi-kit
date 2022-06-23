/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-17 10:11:57
 * @LastEditors: liulina
 * @LastEditTime: 2022-06-23 10:13:55
 */
import commonJS from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import resolve from 'rollup-plugin-node-resolve';
import transformTaggedTemplate from 'rollup-plugin-transform-tagged-template';
import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import { transformCSSFragment, transformHTMLFragment } from '../transform-fragments';
// import { getPackagesInfoList } from './build/getPackageName';
import image from 'rollup-plugin-img';

const extensions = ['.js', '.ts'];

// const kitsList = getPackagesInfoList('packages/', '_', function (filePath) {
//   console.log('done', new Date().getTime() - timeStart);
// });
const parserOptions = {
  sourceType: 'module'
};

export const kitCommonPluginList = [
  resolve(),
  commonJS(),
  typescript({
    tsconfigOverride: {
      compilerOptions: {
        declaration: false
      }
    }
  }),
  image({
    limit: 10000,
    output: `images`, // default the root
    extensions: /\.(png|jpg|jpeg|gif|svg)$/, // support png|jpg|jpeg|gif|svg, and it's alse the default value
    limit: 8192, // default 8192(8k)
    exclude: 'node_modules/**'
  }),
  babel({
    exclude: 'node_modules/**', // 只编译源代码
    extensions,
    babelHelpers: 'runtime',
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-transform-runtime'
      // [
      //   'import',
      //   {
      //     libraryName: 'hi-kits',
      //     libraryDirectory: 'module',
      //     camel2DashComponentName: false, // default: true,
      //     customName: (name, file) => {
      //       console.log('---------namenamenamenamename-------------', name, file);
      //       return `hi-kits/module/${name}`;
      //     }
      //   }
      // ]
    ]
  }),
  transformTaggedTemplate({
    tagsToProcess: ['css'],
    transformer: transformCSSFragment,
    parserOptions
  }),
  transformTaggedTemplate({
    tagsToProcess: ['html'],
    transformer: transformHTMLFragment,
    parserOptions
  }),
  filesize({
    showMinifiedSize: false,
    showBrotliSize: true
  })
];

// export default [
//   {
//     input: {
//       index: 'packages/index.ts',
//       ...kitsList
//     },
//     output: [
//       {
//         dir: 'module',
//         format: 'esm'
//       }
//     ],
//     plugins: [...kitCommonPluginList]
//   }
// ];
