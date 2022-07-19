/**
 * @class: HiVajraItem 金刚区项
 * @version 0.0.1
 * @author by fico on 2022/07/19
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, attr, observable, ref, css,  html } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../../_mixins/hiElementBase';
// 样式助手
import { Style } from '../../../utils/style';
// 样式
const styles = css`
:host {
   text-align: center;
   height: 100%;
   width: 100%;
}
:host .Text {
   text-overflow: ellipsis;
   overflow: hidden;
   -webkit-line-clamp: 1;
   width: 100%;
}
`;
// 模版文件
const template = html<HiVajraItem>`
<slot name="icon" class="Icon"></slot>
<div class="Text">${x => x.text}</div>
`;
// 定义元素
@customElement({
   name: 'h-vajra-item',
   template,
   styles
})
export class HiVajraItem extends HIElementBase {
   // ------------------ 构造函数 ------------------
   constructor() {
      super();
   }
   // ------------------ 参数 ------------------
   // ------------------ 属性 ------------------
   @attr text: string;
   /**
     * 列数
     * @public number
     */
   @attr col;
   colChanged(oldValue, newValue): void {
      // Style(this)({width: 100/newValue + '%'})
   }

   // ------------------ 自定义函数 ------------------
   connectedCallback(): void {
      super.connectedCallback();
      
   }

}

