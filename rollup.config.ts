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

const parserOptions = {
    sourceType: "module",
};
const kitsList = [
    'button',
    'checkbox',
    'color',
    'grid',
    'loading',
    'message',
    'switch'
];

const kitCommonPluginList = [
    typescript({ tsconfig: './tsconfig.json'}),
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
    output: [{
      file: `dist/umd/${name}/${name}.umd.js`,
      format:'umd',
      name,
    }, 
    {
        file: `dist/esm/${name}/${name}.js`,
        format: "esm",
    },
    {
        file: `dist/esm/${name}/${name}.min.js`,
        format: "esm",
        plugins: [terser()],
    },
],
    plugins: [...kitCommonPluginList],
});

export default [
    {
        input: './packages/index.ts',
        output: [
            {
                file: "dist/esm/hi-kit.js",
                format: "esm",
            },
            {
                file: "dist/esm/hi-kit.min.js",
                format: "esm",
                plugins: [terser()],
            },
            {
                file: "dist/umd/index.js",
                format: "umd",
                name: 'hi-ui',
            }
        ],
        plugins: [...kitCommonPluginList],
    },
    ...kitsList.map((name) =>
    kitUmdConfig(name)
  ),
];

