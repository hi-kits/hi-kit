/*
 * @Descripttion: 
 * @version: 
 * @Author: liulina
 * @Date: 2022-07-22 09:33:31
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-22 15:12:29
 */
/**
 * @class: HiButtonGroup
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, html } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '@mixins/hiElementBase';
// 样式文件
import { ButtonGroupStyles as styles } from "./button.group.style";
// 模版文件
const template = html<HiButtonGroup>`<slot></slot>`;
// 定义元素
@customElement({
   name: 'h-button-group',
   template,
   styles
})
export class HiButtonGroup extends HIElementBase {}