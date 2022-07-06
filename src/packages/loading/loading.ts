/**
 * @const: HiLoading 加载
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
// 样式
const styles = css`
:host{
    font-size:inherit;
    display:inline-flex;
    align-items: center;
    justify-content:center;
    color:var(--themeColor,#42b983);
}
.loading{
    display: block;
    width: 1em;
    height: 1em;
    margin: auto;
    animation: rotate 1.4s linear infinite;
}
.circle {
    stroke: currentColor;
    animation:  progress 1.4s ease-in-out infinite;
    stroke-dasharray: 80px, 200px;
    stroke-dashoffset: 0px;
    transition:.3s;
}
:host(:not(:empty)) .loading{
    margin:.5em;
}
@keyframes rotate{
    to{
        transform: rotate(360deg); 
    }
}
@keyframes progress {
    0% {
      stroke-dasharray: 1px, 200px;
      stroke-dashoffset: 0px; 
    }
    50% {
      stroke-dasharray: 100px, 200px;
      stroke-dashoffset: -15px; 
    }
    100% {
      stroke-dasharray: 100px, 200px;
      stroke-dashoffset: -125px; 
    } 
}
`;
// 模版文件
const template = html<HiLoading>`
<template>
    <svg class="loading" ${ref("loading")}
    viewBox="22 22 44 44" xmlns="http://www.w3.org/2000/svg"><circle class="circle" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle></svg>
    <slot></slot>
</template>
`;
// 定义元素
@customElement({
   name: 'h-loading',
   styles,
   template,
})
export class HiLoading extends HIElement {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    /**
     * svg 对象
     */
    @observable
    loading: SVGElement;
    // ------------------ 属性 ------------------
    /**
     * loading 尺寸
     * @public number
     */
    @attr size;
    private sizeChanged(oldValue, newValue): void {
        this.style.fontSize = newValue + 'px';        
        this.style.height = newValue + 'px'; 
        if (this.loading) {
            this.loading!.style.height = newValue + 'px'
        }
    }

    /**
     * loading 颜色
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
        this.loading!.style.height   = this.size  + 'px';

    }

}

