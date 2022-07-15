/**
 * @const: HiTimeline 时间轴
 * @version 0.0.1
 * @author by fico on 2022/06/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 * 垂直展示的时间流信息。
 */
// 核心库
import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';

// 样式文件
const styles = css``;
// 模版文件
const template = html<HiTimeline>`
<template>
    <slot></slot>
</template>
`;
// 定义元素
@customElement({
   name: 'h-timeline',
   styles,
   template,
   shadowOptions: { mode: 'closed'}
})
export class HiTimeline extends HIElement {
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
        if (this.mode === 'alternate') {
            for (let index = 0; index < this.children.length; index++) {
                const element = this.children[index];
                element.removeAttribute('left');
                element.removeAttribute('alternate');
                element.removeAttribute('right');
                if (index % 2) {
                    element.setAttribute('mode','right');
                } else {
                    element.setAttribute('mode','left');
                }
            }
        } else if (this.mode === 'custom') {
            
        } else {
            for (let index = 0; index < this.children.length; index++) {
                const element = this.children[index];
                element.removeAttribute('left');
                element.removeAttribute('alternate');
                element.removeAttribute('right');
                element.setAttribute('mode', this.mode);
            }
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
        if (this.children.length > 0) {
            this.children[this.children.length - 1].setAttribute('last','');
        }
        
        
    }


}

