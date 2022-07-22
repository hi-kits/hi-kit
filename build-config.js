/*
 * @Descripttion: 
 * @version: 
 * @Author: liulina
 * @Date: 2022-07-20 18:28:23
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-22 15:49:56
 */
const { join } = require('path');

const packageJson = require(`${__dirname}/package.json`);
const buildVersion = packageJson.version;

module.exports = {
  projectVersion: buildVersion,
  projectDir: __dirname,
  componentsDir: join(__dirname, 'src/packages'),
  scriptsDir: join(__dirname, 'scripts'),
  outputDir: join(__dirname, 'esm'),
  publishResDir: join(__dirname, 'res'),
  publishDir: join(__dirname, 'publish'),
  libDir: join(__dirname, 'lib'),
  moduleList: ['currency', 'data', 'entry', 'feedback', 'layout', 'navigation', 'other'],
  moduleCommonList: [ 'config.ts', 'imges.d.ts', 'index.ts'],
  moduleCommonFList: [ '_iconfont', '_mixins']
};
