/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-23 09:21:07
 * @LastEditors: liulina
 * @LastEditTime: 2022-06-23 10:09:00
 */
import { getPackagesInfoList } from './build/getPackageName';
import { kitCommonPluginList } from './build/config/rollup.base.config';

const timeStart = new Date().getTime();
const kitsList = getPackagesInfoList('extendPackages/', '_', function (filePath) {
  console.log('done', new Date().getTime() - timeStart);
});

export default [
  {
    input: {
      index: 'extendPackages/index.ts',
      ...kitsList
    },
    output: [
      {
        dir: 'module/extends',
        format: 'esm'
      }
    ],
    plugins: [...kitCommonPluginList]
  }
];
