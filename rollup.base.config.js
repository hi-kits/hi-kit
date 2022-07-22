/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-17 10:11:57
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-22 17:07:29
 */
import commonJS from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import transformTaggedTemplate from 'rollup-plugin-transform-tagged-template';
import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import { transformCSSFragment, transformHTMLFragment } from './build/transform-fragments';
import image from 'rollup-plugin-img';


const extensions = ['.js', '.ts'];

const parserOptions = {
  sourceType: 'module'
};

export const kitCommonPluginList = [
  alias({
    entries: [
      { find: '@utils', replacement: '../_utils' },
      { find: '@mixins', replacement: '../_mixins' },
      { find: '@packages', replacement: '../' },
      { find: '@data', replacement: '../' },
      { find: '@feedback', replacement: '../' },
      { find: '@currency', replacement: '../' },
      { find: '@entry', replacement: '../' },
    ]
  }),
  resolve(),
  commonJS(),
  typescript({
    tsconfigOverride: {
      compilerOptions: {
        declaration: false,
        // "baseUrl": ".",
        // //模块名到基于baseUrl的路径映射的列表
        // "paths": {
        //   "@utils": [ "res/modlue/_utils" ],
        //   "@utils/*": [ "res/modlue/_utils/*" ],
        // }
      }
    }
  }),
  terser(),
  image({
    limit: 10000,
    output: `images`, // default the root
    extensions: /\.(png|jpg|jpeg|gif|svg)$/, // support png|jpg|jpeg|gif|svg, and it's alse the default value
    limit: 8192000, // default 8192(8k)
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
