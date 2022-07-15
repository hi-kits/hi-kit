/**
 * @const: HiListItemAction 列表项 - 操作
 * @version 0.0.1
 * @author by fico on 2022/06/29
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 * 垂直展示的时间流信息。
 */
// 核心库
import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
// 配置文件
import { hiConfig } from "../../config";

// 样式
const styles = css`
:host {
    flex: 0 0 auto;
    padding: 0;
    list-style: none;
}

`;
// 模版文件
const template = html<HiListItemAction>`
<template>
    <slot></slot>
</template>
`;
// 定义元素
@customElement({
   name: 'h-list-item-action',
   styles,
   template,
})
export class HiListItemAction extends HIElement {
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

