/**
 * @const: HiListItem 列表项
 * @version 0.0.1
 * @author by fico on 2022/06/29
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 * 垂直展示的时间流信息。
 */
// 核心库
import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../_mixins/hiElementBase';
// 样式助手
import { Style } from '../_utils/style/style';
// 配置文件
import { hiConfig } from "../config";

// 样式
const styles = css`
:host{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border-bottom: 1px solid rgba(0,0,0,.06);
}
:host(:hover) { 
    background: rgba(0, 0, 0, 0.05);
}
:host([size="large"]) {
    padding: 16px;
}
:host([size="small"]) {
    padding: 8px;
}

`;
// 模版文件
const template = html<HiListItem>`
<template>
    <slot name="inner"></slot>
    <slot></slot>
</template>
`;
// 定义元素
@customElement({
   name: 'h-list-item',
   styles,
   template,
})
export class HiListItem extends HIElementBase {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------

    // ------------------ 属性 ------------------
    /**
     * 尺寸
     * @public number
     */
    sizeChanged(oldValue, newValue): void {
        if (!['large', 'small', 'default'].includes(newValue)) {
            Style(this)({
                padding: `${newValue}px`,
            });
        }
    }
    // @attr pending: string;
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

