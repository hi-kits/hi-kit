/**
 * @const: HiEmpty 空状态
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';

const styles = css`
:host{
    margin: 0 8px;
    font-size: 14px;
    line-height: 1.5715;
    text-align: center;
    height: 100px;
    margin-bottom: 8px;
}
:host .SVG{
    display: block;
    margin: 0 auto;
}
:host .Slot{
    display: block;
    margin: 0 auto;
}

`
const template = html<HiEmpty>`
<template>
    <slot class="Slot">
        <svg class="SVG" width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg" >
            <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                <ellipse cx="32" cy="33" rx="32" ry="7" fill="#f5f5f5"></ellipse>
                <g stroke="#d9d9d9">
                    <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                    <path fill="#fafafa" d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"></path>
                </g>
            </g>
        </svg>
        <p>暂无数据</p>
    </slot>
</template>
`;
@customElement({
   name: 'h-empty',
   styles,
   template,
})
export class HiEmpty extends HIElement {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    @observable
    slots: Node;
    // ------------------ 属性 ------------------
    /**
     * 尺寸
     * @public number
     */
    @attr size;
    private sizeChanged(oldValue, newValue): void {
        this.style.fontSize = newValue + 'px';        
    }

    /**
     * 颜色
     * @public string
     */
    @attr color: string;
    private colorChanged(oldValue, newValue): void {
        this.style.color = newValue;
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

