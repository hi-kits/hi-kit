/*
 * @Descripttion: 
 * @version: 
 * @Author: liulina
 * @Date: 2022-07-20 18:22:08
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-22 17:02:50
 */

import { task } from 'gulp';

const buildConfig =  require('../../../build-config');
import { cleanTask } from '../util/task-helpers';

/** Deletes the dist/ publish/ directory. */
task('clean', cleanTask([buildConfig.outputDir, buildConfig.publishDir]));
