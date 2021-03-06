/**
 * @const: HiBadge 徽标数
 * @version 0.0.1
 * @author by fico on 2022/06/24
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '@mixins/hiElementBase';
// 样式助手
import { display } from '@utils/style';
// 样式
const styles = css`
${display('flex')}
:host {
     position: relative;
     width: 100%;
}
:host .Badge{
     position: absolute;
     top: 0;
     right: 0;
     transform: translate(50%,-50%);
     transform-origin: 100% 0%;
     direction: ltr;
     z-index: auto;
     min-width: 20px;
     height: 20px;
     padding: 0;
     color: #fff;
     font-weight: 400;
     font-size: 12px;
     line-height: 20px;
     white-space: nowrap;
     text-align: center;
     background: #ff4d4f;
     border-radius: 100px;
     box-shadow: 0 0 0 1px #fff;
}
 
:host([invalid]) {
     display: none;
}
:host([dot]) {
     display: flex;
}
:host([suit]) .Badge{
     padding: 0 6px;
}
:host([dot]) .Badge{
     display: inline;
     z-index: auto;
     width: 6px;
     min-width: 6px;
     height: 6px;
     padding: 0;
     background: #ff4d4f;
     border-radius: 100%;
     box-shadow: 0 0 0 1px #fff;
}
 
 
 `;
 // 模版文件
const template = html<HiBadge>`
 <template>
     <span class="Badge" style="${ x => x.badgeStyle}">${ x => x.count}</span>
 </template>
`;
// 定义元素
@customElement({
    name: 'h-badge',
    styles,
    template,
    shadowOptions: { mode: 'closed'}
})
export class HiBadge extends HIElementBase {
     // ------------------ 构造函数 ------------------
     // ------------------ 参数 ------------------
     // ------------------ 属性 ------------------
     
     /**
      * 展示的数字
      * @date 6/24/2022 - 5:08:25 PM
      *
      * @type {number}
      */
     @attr count: number;
     private countChanged(oldValue, newValue): void {
         if (String(newValue).length > 1) {
             this.setAttribute('suit','');
         } else {
             this.removeAttribute('suit');
         }
     }
     
     /**
      * 不展示数字，只有一个小红点
      * @date 6/24/2022 - 7:02:44 PM
      *
      * @type {boolean}
      */
     @attr dot: boolean;
     
     /**
      * 设置 badge 的样式
      * @date 6/24/2022 - 7:03:03 PM
      *
      * @type {string}
      */
     @attr badgeStyle: string;
 
     // ------------------ 自定义函数 ------------------
     /**
      * 当自定义元素第一次被连接到文档DOM时被调用
      * @internal
      */
     connectedCallback(): void {
         super.connectedCallback();
         if (this.count == null || this.count == undefined) {
             this.setAttribute('invalid', '');
         } else {
             this.removeAttribute('invalid');
         }
     }
 
 }
 
 