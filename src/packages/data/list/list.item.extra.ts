/**
 * @const: HiListItemExtra 列表项 - 额外项
 * @version 0.0.1
 * @author by fico on 2022/06/29
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 * 垂直展示的时间流信息。
 */
// 核心库
import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';

// 样式
const styles = css`:host{margin-left: 12px;}`;
// 模版文件
const template = html<HiListItemExtra>`<slot></slot>`;
// 定义元素
@customElement({
   name: 'h-list-item-extra',
   styles,
   template,
})
export class HiListItemExtra extends HIElement {
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
        // 设置最后一个子元素的显示状态
        
        
        
    }


}

