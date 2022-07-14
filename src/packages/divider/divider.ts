/**
 * @const: HiDivider 分割线
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../_mixins/hiElementBase';
// 样式助手
import { Style } from '../../utils/style/style';
// 样式
const styles = css`
:host{
    display: flex;
    clear: both;
    width: 100%;
    min-width: 100%;
    margin: 24px 0;
    text-align: center;
    white-space: nowrap;
    border-top-color: var(--colorNeutral05, rgba(0, 0, 0, 0.05));
}
span {
    display: inline-block;
    padding: 0 1em;
}
:host::before,
:host::after {
    position: relative;
    top: 50%;
    width: 50%;
    border-top: 1px solid transparent;
    border-top-color: inherit;
    border-bottom: 0;
    transform: translateY(50%);
    content: "";
}
:host([type="vertical"]) {
    position: relative;
    top: -0.06em;
    display: inline-block;
    height: 0.9em;
    margin: 0 8px;
    width:1px;
    min-width:1px;
    vertical-align: middle;
    border-top: 0;
    border-left: 1px solid rgba(0,0,0,.06);
}
:host([dashed])::before,
:host([dashed])::after {
    border-top-style: dashed;
}
:host([dir="left"])::before,
:host([dir="right"])::after {
    width: 5%;
}
:host([dir="right"])::before,
:host([dir="left"])::after {
    width: 95%;
}
`;
// 模版文件
const template = html<HiDivider>`
<template>
    <span>
        <slot></slot>
        ${x => x.text}
    </span>
</template>
`;
// 定义元素
@customElement({
   name: 'h-divider',
   styles,
   template,
   shadowOptions: { mode: 'closed'}
})
export class HiDivider extends HIElementBase {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    // ------------------ 属性 ------------------
    /**
     * 是否虚线
     * @public boolean
     */
    @attr({ mode: "boolean" }) dashed: boolean;
    
    /**
     * 水平还是垂直类型
     * @date 6/21/2022 - 1:53:38 PM
     *
     * @type {('horizontal' | 'vertical')}
     */
    @attr type: 'horizontal' | 'vertical';
    
    /**
     * 中间文字	
     * @date 6/21/2022 - 1:54:16 PM
     *
     * @type {string}
     */
    @attr text: string;
    
    /**
     * 中间文字方向
     * @date 6/21/2022 - 1:55:36 PM
     *
     * @type {('center' | 'left' | 'right')}
     */
    @attr dir: 'center' | 'left' | 'right';

    /**
     * 文字尺寸
     * @public number
     */
    @attr size;
    sizeChanged(oldValue, newValue): void {
        Style(this)({ 
            fontSize: newValue + 'px'
        });
    }
    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();
    }

}

