/**
 * @class: HiCol 栅格 - 列
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
// 样式
const styles = css`
:host {
   grid-column: span 1;
}
${
Array.from({length:24},(el,i)=>':host([span="'+(i+1)+'"]) {grid-column: span '+(i+1)+'}\n').join('')
}
`;
// 模版文件
const template = html<HiCol>`<slot></slot>`;
// 定义元素
@customElement({
   name: 'h-col',
   template,
   styles
})
export class HiCol extends HIElement {
   /**
     * 子项目跨度
     * @public number
     */
   @attr span: number = 24;

}

