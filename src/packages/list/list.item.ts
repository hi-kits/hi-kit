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

:host([size="large"]) {
    padding: 16px 0;
}
:host([size="small"]) {
    padding: 8px 0;
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
     * 尺寸
     * @public number
     */
    @attr size: 'large' | 'small' | 'default' | number;
    private sizeChanged(oldValue, newValue): void {
        if (!['large', 'small', 'default'].includes(newValue)) {
            this.style.padding = `${newValue}px 0`;        
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

