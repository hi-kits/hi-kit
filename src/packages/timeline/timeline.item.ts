/**
 * @const: HiTimelineItem 时间轴项
 * @version 0.0.1
 * @author by fico on 2022/06/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, css,  html, when } from 'hi-element';


const styles = css`
:host {
    position: relative;
    margin: 0;
    padding-bottom: 20px;
    display: block;
}

.ItemTail {
    position: absolute;
    top: 10px;
    left: 4px;
    height: calc(100% - 10px);
    border-left: 2px solid rgba(0,0,0,.06);
}
.ItemHeadCustom{
    position: absolute;
    text-align: center;
    line-height: 1;
}
.ItemHead {
    font-size: 14px;
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: #fff;
    border: 2px solid transparent;
    border-radius: 100px;
    color: #1890ff;
    border-color: #1890ff;
}
.ItemContent {
    position: relative;
    top: -7.001px;
    margin: 0 0 0 26px;
    word-break: break-word;
}
.ItemLabel {
    position: absolute;
    top: -7.001px;
    width: calc(50% - 12px);
    text-align: right;
}
:host([last]) .ItemTail{
    display: none;
}
:host([mode="right"]) .ItemTail,
:host([mode="right"]) .ItemHead,
:host([mode="right"]) .ItemHeadCustom,
:host([mode="left"]) .ItemTail,
:host([mode="left"]) .ItemHead,
:host([mode="left"]) .ItemHeadCustom {
    left: 50%;
}
:host([mode="right"]) .ItemHead,
:host([mode="left"]) .ItemHead  {
    margin-left: -4px;
}
:host([mode="right"]) .ItemHeadCustom,
:host([mode="left"]) .ItemHeadCustom  {
    transform: translate(-50%,-50%);
}
:host([mode="left"]) .ItemLabel{
    left: calc(50% + 14px);
    width: calc(50% - 14px);
    text-align: left;
}

:host([mode="right"]) .ItemContent{
    left: calc(50% - 4px);
    width: calc(50% - 14px);
    text-align: left;
}
:host([mode="left"]) .ItemContent{
    width: calc(50% - 12px);
    margin: 0;
    text-align: right;
}


`
const template = html<HiTimelineItem>`
<template>
    <div  class="ItemHeadCustom">
        <slot name="dot">
            <div class="ItemHead" ${ref('temp')}></div>
        </slot>
    </div>
    <div class="ItemLabel">${x => x.label}</div>
    <div class="ItemTail"></div>
    <div class="ItemContent">
        <slot></slot>
    </idv>
</template>
`;
@customElement({
   name: 'h-timeline-item',
   styles,
   template,
})
export class HiTimelineItem extends HIElement {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    @observable
    temp: HTMLDivElement;
    // ------------------ 属性 ------------------
    /**
     * 最后一个元素
     * @date 6/27/2022 - 7:46:40 PM
     *
     * @type {boolean}
     */
    @attr({ mode: "boolean" }) last: boolean;
    
    /**
     * 展示模式
     * @date 6/27/2022 - 7:48:10 PM
     *
     * @type {('left' | 'alternate' | 'right')}
     */
    @attr mode: 'left' | 'alternate' | 'right';
    private modeChanged(oldValue, newValue): void {
        
    }
    /**
     * loading 颜色
     * @public string
     */
    @attr color: string;
    private colorChanged(oldValue, newValue): void {
        this.temp.style.borderColor = newValue;
    }
    @attr label: string;
    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();
    }


}

