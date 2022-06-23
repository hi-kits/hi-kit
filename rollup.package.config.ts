/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-23 09:21:30
 * @LastEditors: liulina
 * @LastEditTime: 2022-06-23 10:08:15
 */
import { getPackagesInfoList } from './build/getPackageName.js';

import { kitCommonPluginList } from './build/config/rollup.base.config';

const timeStart = new Date().getTime();
const kitsList = getPackagesInfoList('packages/', '_', function (filePath) {
  console.log('done', new Date().getTime() - timeStart);
});
module.exports = {
  input: {
    index: 'packages/index.ts',
    ...kitsList
  },
  output: [
    {
      dir: 'module',
      format: 'esm'
    }
  ],
  plugins: [...kitCommonPluginList]
};
