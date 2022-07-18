/**
 * @class: HiRow 栅格 - 行
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
// 样式
const styles = css`:host {
    --gutter:0px;
    display:grid;
    grid-template-columns:repeat(24,1fr);
    grid-gap: var(--gutter,0);
}`;
// 模版文件
const template = html<HiRow>`<slot></slot>`;
// 定义元素
@customElement({
   name: 'h-row',
   styles,
   template,
})
export class HiRow extends HIElement {
    /**
     * 子项目间距
     * @public number
     */
    @attr gutter: number;
    private gutterChanged(oldValue, newValue): void {
        this.style.setProperty('--gutter', newValue + 'px');
        
    }

}

