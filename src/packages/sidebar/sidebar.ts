/**
 * @const: HiSidebar 侧边栏
 * @version 0.0.1
 * @author by fico on 2022/06/22
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';

const styles = css`
:host {
    position: fixed;
	left: 0;
    top: 0;
	z-index: 99;
	height: 100%;
	-webkit-transition: -webkit-transform 0.5s;
	transition: transform 0.5s;
}
:host nav{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    visibility: hidden;
    width: 300px;
    height: 100%;
    background: #48a770;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
}
:host([show]) nav {
    visibility: visible;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}


`
const template = html<HiSidebar>`
<template>
    <nav class="menu st-effect-9" id="menu-9">
        <h2 class="icon icon-lab">Sidebar</h2>
        <ul>
            <li><a class="icon icon-data" href="#">Data Management</a></li>
            <li><a class="icon icon-location" href="#">Location</a></li>
            <li><a class="icon icon-study" href="#">Study</a></li>
            <li><a class="icon icon-photo" href="#">Collections</a></li>
            <li><a class="icon icon-wallet" href="#">Credits</a></li>
        </ul>
    </nav>
</template>
`;
@customElement({
   name: 'h-sidebar',
   styles,
   template,
})
export class HiSidebar extends HIElement {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    // ------------------ 属性 ------------------
    /**
     * 尺寸
     * @public number
     */
    @attr size;
    private sizeChanged(oldValue, newValue): void {
        this.style.fontSize = newValue + 'px';        
        this.style.height = newValue + 'px'; 
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

