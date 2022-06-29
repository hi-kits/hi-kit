/**
 * @const: HiListItem 列表项
 * @version 0.0.1
 * @author by fico on 2022/06/29
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 * 垂直展示的时间流信息。
 */

import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
import { hiConfig } from "../config";


const styles = css`
:host{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid rgba(0,0,0,.06);
}

`
const template = html<HiListItem>`
<template>
    <slot name="inner"></slot>
    <slot></slot>
</template>
`;
@customElement({
   name: 'h-list-item',
   styles,
   template,
})
export class HiListItem extends HIElement {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------

    // ------------------ 属性 ------------------
    /**
     * 展示模式
     * @date 6/27/2022 - 6:52:44 PM
     *
     * @type {('left' | 'alternate' | 'right' | 'custom')}
     */
    @attr mode: 'left' | 'alternate' | 'right' | 'custom';
    private modeChanged(oldValue, newValue): void {
       
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

