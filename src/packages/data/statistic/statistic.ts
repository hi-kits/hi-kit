/**
 * @class: HiStatistic 统计
 * @version 0.0.1
 * @author by fico on 2022/07/20
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, attr, html } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../../_mixins/hiElementBase';
// 样式助手
import { Style } from '../../../utils/style';
// 样式文件
import { StatisticStyles as styles } from "./statistic.style";
// 模版文件
const template = html<HiStatistic>`
<template>
  <div class="Title">${x => x.title}</div>
  <slot class="Value"></slot>
</template>
`;
// 定义元素
@customElement({
   name: 'h-statistic',
   template,
   styles
})
export class HiStatistic extends HIElementBase {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    // ------------------ 属性 ------------------
    
    // ------------------ 自定义函数 ------------------
     /**
      * 当自定义元素第一次被连接到文档DOM时被调用
      * @internal
      */
    connectedCallback(): void {
      super.connectedCallback();
         
    }

}

