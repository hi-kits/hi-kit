/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-23 09:21:30
 * @LastEditors: liulina
 * @LastEditTime: 2022-06-23 10:38:48
 */
import { getPackagesInfoList } from './build/getPackageName.js';

import { kitCommonPluginList } from './rollup.base.config';

const timeStart = new Date().getTime();
const kitsList = getPackagesInfoList('res/module/', '_', function (filePath) {
  console.log('done', new Date().getTime() - timeStart);
});
module.exports = {
  // 多入口打包内部会提取公共模块，内部会使用代码拆分，所以需使用amd
  input: {
    index: 'res/module/index.ts',
    ...kitsList
  },
  output: [
    {
      dir: 'lib/esm',
      format: 'esm'
    }
  ],
  plugins: [...kitCommonPluginList]
};
