/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-17 10:11:57
 * @LastEditors: liulina
 * @LastEditTime: 2022-06-20 10:43:42
 */
import commonJS from "rollup-plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import transformTaggedTemplate from "rollup-plugin-transform-tagged-template";
import typescript from "rollup-plugin-typescript2";
import {
  transformCSSFragment,
  transformHTMLFragment,
} from "./build/transform-fragments";
import { getPackagesInfoList } from "./build/getPackageName";

const timeStart = new Date().getTime();
const kitsList = getPackagesInfoList("packages/", "_", function (filePath) {
  console.log("done", new Date().getTime() - timeStart);
});
const parserOptions = {
  sourceType: "module",
};

const kitCommonPluginList = [
  resolve(),
  commonJS(),
  typescript({
    tsconfigOverride: {
      compilerOptions: {
        declaration: false,
      },
    },
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
];

const kitUmdConfig = (name) => ({
  // input: `packages/${name}/index.ts`,
  input: `packages/${name}/index.ts`,
  output: [
    {
      file: `lib/${name}/index.js`,
      format: "umd",
      name,
    },
  ],
  plugins: [...kitCommonPluginList],
});

export default [
  {
    input: {
      index: "packages/index.ts",
      ...kitsList,
    },
    output: [
      {
        dir: "module",
        format: "esm",
      },
    ],
    plugins: [...kitCommonPluginList],
  },
];
