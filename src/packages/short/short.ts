/**
 * @class: HiShort 短标
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, html } from 'hi-element';
// 样式文件
import { ShortStyles as styles } from "./short.style";
// 模版文件
const template = html<HiShort>`

<div class="Short">
	<span>${x => x.text}</span>
    <slot></slot>
</div>
`;
// 定义元素
@customElement({
   name: 'h-short',
   template,
   styles
})
export class HiShort extends HIElement {
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
     private textChanged(oldValue, newValue): void {
        
    }
     
     /**
      * 中间文字方向
      * @date 6/21/2022 - 1:55:36 PM
      *
      * @type {('center' | 'left' | 'right')}
      */
     @attr dir: 'center' | 'left' | 'right';
 
     /**
      * 文字颜色
      * @public string
      */
     @attr color: string;
     private colorChanged(oldValue, newValue): void {
         this.style.color = newValue;
     }
     /**
      * 文字尺寸
      * @public number
      */
     @attr size;
     private sizeChanged(oldValue, newValue): void {
         this.style.fontSize = newValue + 'px';        
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

