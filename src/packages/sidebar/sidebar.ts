/**
 * @const: HiSidebar 侧边栏
 * @version 0.0.1
 * @author by fico on 2022/06/22
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

// 核心库
import { customElement, attr, css,  html } from 'hi-element';
// 事件处理
import { EventUtil } from '../../utils/event';
// 样式助手
import { Style } from '../../utils/style/style';
// 混入基础功能
import { HIElementBase } from '../_mixins/hiElementBase';

// 样式文件
const styles = css`
:host {
    position: fixed;
	left: 0;
    top: 0;
	z-index: -99;
    width: 100%;
	height: 100%;
    opacity: 0;
    inset: 0px;
    background: var(--background-1, rgba(0, 0, 0, 0.3)) ;
    transition: all 0.3s ease 0s;
}
:host .Sidebar{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    visibility: hidden;
    padding:12px;
    width: 300px;
    height: 100%;
    background: var(--colorWhite, #fff);
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
}
:host([show]) { 
    opacity: 1;
    z-index: 50;
    visibility: visible;
}
:host([show]) .Sidebar {
    visibility: visible;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}


`;
// 模版文件
const template = html<HiSidebar>`
<div class="Sidebar">
    <slot></slot>
</div>
`;
// 定义元素
@customElement({
   name: 'h-sidebar',
   styles,
   template,
})
export class HiSidebar extends HIElementBase {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    sidebar;
    // ------------------ 属性 ------------------
    /**
     * 尺寸
     * @public number
     */
    sizeChanged(oldValue, newValue): void {
        Style(this)({
            fontSize: newValue + 'px',
            height: newValue + 'px'
        });
    }
    @attr({ mode: "boolean" }) show: boolean;
    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();
        // this.sidebar = this;
        EventUtil.addHandler(document, 'mousedown', this.setpop);
    }
    setpop = ev => {
        const path = ev.path || (ev.composedPath && ev.composedPath());
        if (
            (this.show && !path.includes(this) && !path.includes(this.children[0]))
        ) {
          this.show = false;
        }
    };

}

