/**
 * @const: HiList 列表
 * @version 0.0.1
 * @author by fico on 2022/06/29
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 * 垂直展示的时间流信息。
 */

import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';


const styles = css`


`
const template = html<HiList>`
<template>
    <slot></slot>
</template>
`;
@customElement({
   name: 'h-list',
   styles,
   template,
})
export class HiList extends HIElement {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------

    // ------------------ 属性 ------------------
    /**
     * 尺寸
     * @public number
     */
    @attr size: 'large' | 'small' | 'default' | string;
    private sizeChanged(oldValue, newValue): void {

        for (let index = 0; index < this.children.length; index++) {
            const element = this.children[index];
            element.setAttribute('size', this.size);
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
        this.children[this.children.length - 1].setAttribute('last','');
        
        
        
    }


}

