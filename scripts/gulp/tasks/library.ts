/*
 * @Descripttion: 
 * @version: 
 * @Author: liulina
 * @Date: 2022-07-20 18:22:08
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-22 17:04:55
 */

import { dest, series, src, parallel, task } from 'gulp';

import { join } from 'path';

const buildConfig =  require('../../../build-config');
import { execNodeTask, cleanTask } from '../util/task-helpers';

const packagesDir = join(buildConfig.projectDir, 'src/packages');
const tsconfigFile = join(buildConfig.publishResDir, 'tsconfig.lib.json');
const rollupFile = join(buildConfig.projectDir, 'rollup.package.config.ts');

// ---------1.首先将资源复制到dev文件夹  util 组件文件包 tsconfig------------
task('lib:copy-utils', () => {
  return src([join(buildConfig.projectDir + '/src/_utils', '**/*')]).pipe(
    dest(join(buildConfig.publishResDir + '/module/_utils'))
  );
});
// 组件包中的公共文件
task('lib:copy-packages-com', () => {
  // 有公共的部分 moduleCommonList: ['config.ts', 'imges.d.ts', 'index.ts']
  const moduleCommonPath = buildConfig.moduleCommonList.map((item: string) => {
    return join(buildConfig.componentsDir, '/' + item);
  })
  return src(moduleCommonPath).pipe(
    dest(join(buildConfig.publishResDir + '/module'))
  );
});
// 组件包中的公共文件夹
task('lib:copy-packages-comf', () => {
  // 有公共的部分 moduleCommonListf: ['_iconfont', '_mixins']
  const srcList = buildConfig.moduleCommonFList.map((item: string) => {
    return src([join(buildConfig.componentsDir, '/' + item + '**/*')]).pipe(
      dest(join(buildConfig.publishResDir + '/module'))
    );
  })
  return srcList[0] && srcList[1];
});

task('lib:copy-packages', () => {
  // 组件模块部分 moduleList: ['currency', 'data', 'entry', 'feedback', 'layout', 'navigation', 'other'],
  const modulePath = buildConfig.moduleList.map((item: string) => join(buildConfig.componentsDir + '/' + item, '**/*'));
  return src(modulePath).pipe(
    dest(join(buildConfig.publishResDir + '/module'))
  );
});
task('lib:copy-tsconfig', () => {
  return src([join(packagesDir, 'tsconfig.lib.json')]).pipe(
    dest(join(buildConfig.publishResDir))
  );
});

// ---------------------2.tsc -p 生成.d.ts文件------------------------------
/** tsc -p ./tsconfig.json. */
task('tsc:packages', execNodeTask('typescript', 'tsc', ['-p', tsconfigFile]));

// tsc-alias -p tsconfig.json tsc不认识path别名
task('tsc-alias:packages', execNodeTask('tsc-alias', 'tsc-alias', ['-p', tsconfigFile]));



// ------------------------3.rollup 打包------------------------------------
task('rollup:packages', execNodeTask('rollup', 'rollup', ['-c', rollupFile]));


// ------------4.将生成的资源复制到需要发布的文件夹 dts module esm------------
task('lib:copy-uploadjs', () => {
  return src([join(buildConfig.publishResDir, '/module/upload/_uploader.js')]).pipe(dest(join(buildConfig.libDir + '/esm')));
});

// ------------5. Copies files without ngcc to lib folder.  包括 esm 和package.json README.md, util------------
task('lib:copy-libs', () => {
  return src([join(buildConfig.projectDir, 'README.md'), join(buildConfig.projectDir, 'package.json'),join(buildConfig.publishResDir + '/esm', '**/*')]).pipe(dest(join(buildConfig.libDir)));
});

// ------------------------6. 清理------------------------
task('clean:lib', cleanTask([join(buildConfig.publishResDir), join(buildConfig.libDir)]));



task(
  'build:library',
  series(
    'clean:lib',
    parallel('lib:copy-utils', 'lib:copy-packages', 'lib:copy-packages-com', 'lib:copy-packages-comf', 'lib:copy-tsconfig' ),
    parallel('tsc:packages'),
    'tsc-alias:packages',
    'rollup:packages',
    'lib:copy-uploadjs',
    'lib:copy-libs'
    // 'clean:library'
  )
);
