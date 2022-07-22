/**
 * @class: HiVajra 金刚区
 * @version 0.0.1
 * @author by fico on 2022/07/19
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, attr, observable, ref, css,  html } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '@mixins/hiElementBase';
// 事件处理
import { EventUtil } from '@utils/event';
// 样式
const styles = css`
:host {
   display: grid;
   flex-wrap: wrap;
   grid-template-columns: repeat(24, 1fr);
   grid-gap: var(--gutter,0);
}
`;
// 模版文件
const template = html<HiVajra>`<slot ${ref('slots')}></slot>`;
// 定义元素
@customElement({
   name: 'h-vajra',
   template,
   styles
})
export class HiVajra extends HIElementBase {
   // ------------------ 构造函数 ------------------
   constructor() {
      super();
   }
   // ------------------ 参数 ------------------
   @observable
   public slots: HTMLSlotElement;
   /**
     * 子元素
     * @date 7/8/2022 - 10:51:52 AM
     *
     * @type {*}
     */
   elements;
   // ------------------ 属性 ------------------
   /**
     * 行数
     * @public number
     */
   @attr row: number = 1;
   /**
     * 子项目间距
     * @public number
     */
   @attr gutter: number;
   private gutterChanged(oldValue, newValue): void {
      this.style.setProperty('--gutter', `${newValue * 2.5}px ${newValue}px`);
      
   }
   /**
     * 列数
     * @public number
     */
   @attr col: number = 1;
   colChanged(oldValue, newValue): void {
      
      this.style.setProperty('grid-template-columns', 'repeat(' + newValue +', 1fr)');
      if (this.elements) {
         this.elements.forEach( el =>{
            el.col = this.col;
         });
      }
   }
   // ------------------ 自定义函数 ------------------
   connectedCallback(): void {
      super.connectedCallback();
      this.style.setProperty('grid-template-columns', 'repeat(' + this.col +', 1fr)');
      EventUtil.addHandler(this.slots, 'slotchange',()=>{
         this.elements  = this.querySelectorAll('h-vajra-item');
         // this.value = this.defaultvalue;
         this.elements.forEach( el =>{
            el.col = this.col;
         });
     })
   }
}

