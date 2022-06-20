/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import commonjs from "@rollup/plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import transformTaggedTemplate from "rollup-plugin-transform-tagged-template";
import typescript from "@rollup/plugin-typescript";
import babel from '@rollup/plugin-babel';
const extensions = ['.js', '.ts']
import {
    transformCSSFragment,
    transformHTMLFragment,
} from "./build/transform-fragments";

import { readDirPackages } from "./build/getPackageName"

const timeStart = new Date().getTime();
const kitsList = readDirPackages(function(filePath) {
  console.log('done', new Date().getTime() - timeStart);
})

console.log(kitsList);


const parserOptions = {
    sourceType: "module",
};
// const kitsList = [
//     'button',
//     'checkbox',
//     'color',
//     'grid',
//     'loading',
//     'message',
//     'switch'
// ];

const kitCommonPluginList = [
    nodeResolve(),
    commonjs(),
    babel({
        exclude: 'node_modules/**', // 只编译源代码
        extensions,
        babelHelpers: 'runtime',
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
        ],
        plugins: [
          ['@babel/plugin-proposal-class-properties'],
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ["@babel/plugin-transform-runtime"]
        ]
      }),
    transformTaggedTemplate({
        tagsToProcess: ["css"],
        transformer: transformCSSFragment,
        parserOptions,
    }),
    transformTaggedTemplate({
        tagsToProcess: ["html"],
        transformer: transformHTMLFragment,
        parserOptions,
    }),
    filesize({
        showMinifiedSize: false,
        showBrotliSize: true,
    }),
    terser()
];

const kitUmdConfig = (
    name) => ({
    input: `packages/${name}/index.ts`,
    output: [
    {
      file: `dist/umd/${name}/${name}.umd.js`,
      format:'umd',
      name,
    }, {
        file: `dist/umd/${name}/${name}.umd.min.js`,
        format:'umd',
        name,
        plugins: [terser()],
    }, 
],
    plugins: [
        typescript(
            {
                // 分开打包的时候不需要.d.t文件
                declaration: false,
                declarationDir: null,
                tsconfig: './tsconfig.json'
            }
        ),
        ...kitCommonPluginList],
});

export default [
    {
        input: './packages/index.ts',
        output: [
            {
                file: "dist/hi-kit.js",
                format: "esm",
            },
            {
                file: "dist/hi-kit.min.js",
                format: "esm",
                plugins: [terser()],
            },
            {
                file: "dist/umd/hi-kit.js",
                format: "umd",
                name: 'hi-kit',
            },
            {
                file: "dist/umd/hi-kit.min.js",
                format: "umd",
                name: 'hi-kit',
                plugins: [terser()],
            }
        ],
        plugins: [
            typescript({tsconfig: './tsconfig.json'}),
            ...kitCommonPluginList],
    },
    ...kitsList.map((name) =>
    kitUmdConfig(name)
  ),
];

