/**
 * @class: HiTag 标签
 * @version 0.0.1
 * @author by fico on 2022/04/27
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
import { ShortStyles as styles } from "./tag.style";
// 模版文件
const template = html<HiTag>`

<div class="Tag">
	<span>${x => x.text}</span>
    <slot></slot>
</div>
`;
// 定义元素
@customElement({
   name: 'h-tag',
   template,
   styles
})
export class HiTag extends HIElementBase {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    // ------------------ 属性 ------------------
     
    /**
      * 中间文字	
      * @date 6/21/2022 - 1:54:16 PM
      *
      * @type {string}
      */
    @attr text: string;
    
     
    /**
      * 中间文字方向
      * @date 6/21/2022 - 1:55:36 PM
      *
      * @type {('center' | 'left' | 'right')}
      */
    @attr dir: 'center' | 'left' | 'right';
    /**
     * 没有边框
     * @date 6/27/2022 - 5:39:55 PM
     *
     * @type {boolean}
     */
    @attr({ mode: "boolean" }) noBorder: boolean;
    /**
      * 文字尺寸
      * @public number
      */
    sizeChanged(oldValue, newValue): void {
        Style(this)({
            fontSize: newValue + 'px'
        });
    }
     // ------------------ 自定义函数 ------------------
     /**
      * 当自定义元素第一次被连接到文档DOM时被调用
      * @internal
      */
    connectedCallback(): void {
         super.connectedCallback();
         if (['', null, undefined].includes(this.text)) {
            this.setAttribute('hide', '');
        }
    }

}

