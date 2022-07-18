/**
 * @class: HiGrid 宫格
 * @version 0.0.1
 * @author by fico on 2022/07/15
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, attr, observable, ref, css,  html } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../../_mixins/hiElementBase';
// 样式
const styles = css`
:host {
   display: flex;
}
`;
// 模版文件
const template = html<HiGrid>`<slot></slot>`;
// 定义元素
@customElement({
   name: 'h-grid',
   template,
   styles
})
export class HiGrid extends HIElementBase {
   /**
     * 子项目跨度
     * @public number
     */
   @attr span: number = 24;

}

