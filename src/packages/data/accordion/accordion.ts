/**
 * @class: HiAccordion 折叠面板
 * @version 0.0.1
 * @author by fico on 2022/07/20
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, attr, html } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '@mixins/hiElementBase';
// 样式助手
import { Style } from '@utils/style';
// 样式文件
import { AccordionStyles as styles } from "./accordion.style";
// 模版文件
const template = html<HiAccordion>`

<template id="element-details-template">
      <details>
        <summary>
          <span>
            <code class="name">&lt;<slot name="element-name">NEED NAME</slot>&gt;</code>
            <i class="desc"><slot name="description">NEED DESCRIPTION</slot></i>
          </span>
        </summary>
        <div class="attributes">
          <h4><span>Attributes</span></h4>
          <slot name="attributes"><p>None</p></slot>
        </div>
      </details>
      <hr>
    </template>
`;
// 定义元素
@customElement({
   name: 'h-accordion',
   template,
   styles
})
export class HiAccordion extends HIElementBase {
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

