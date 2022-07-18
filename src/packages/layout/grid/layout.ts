/**
 * @class: HiLayout 布局
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
   display:flex;
   flex-direction:column;
}
:host([row]){
   flex-direction:row;
}
:host([col]){
   flex-direction:column;
}
:host([expand]){
   flex:1;
}
:host([center]:not([center$=Axis])){
   justify-content: center;
   align-items: center;
}
:host([center="mainAxis"]){
   align-items: center;
}
:host([center="crosAxis"]){
   justify-content: center;
   
}
`;
// 模版文件
const template = html<HiLayout>`<slot></slot>`;
// 定义元素
@customElement({
   name: 'h-layout',
   template,
   styles
})
export class HiLayout extends HIElement {
   // ------------------ 构造函数 ------------------
   constructor() {
      super();
   }
   // ------------------ 参数 ------------------
   // ------------------ 属性 ------------------
   
   /**
    * 居中center
    * 默认水平垂直居中，可以指定某一方向居中，主轴 mainAxis 和交叉轴 crosAxis 
    * @date 7/4/2022 - 3:33:39 PM
    *
    * @type {("crosAxis" | "mainAxis" | boolean)}
    */
   @attr center: "crosAxis" | "mainAxis" | boolean;
   
   /**
    * 水平排列 row
    * 默认为垂直排列，row 表示水平排列
    * @date 7/4/2022 - 4:24:11 PM
    *
    * @type {boolean}
    */
   @attr({ mode: "boolean" }) row: boolean;
   
   /**
    * 填充 expand
    * 根据剩余空间填充（主轴方向）
    * @date 7/4/2022 - 4:25:07 PM
    *
    * @type {boolean}
    */
   @attr({ mode: "boolean" }) expand: boolean;
   // ------------------ 自定义函数 ------------------
   connectedCallback(): void {
      super.connectedCallback();
   }
}

