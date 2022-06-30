/**
 * @const: HiStep 步骤条项
 * @version 0.0.1
 * @author by fico on 2022/06/29
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, attr, css,  html, when } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../_mixins/hiElementBase';
// 样式文件
import { StepStyles as styles } from "./step.style";
// 模版文件
const template = html<HiStep>`
<template>
    <div class="IconBox">
        <slot name="icon">
        <span class="Icon">
            ${when(
                x => x.status && x.status != 'process',
                html`<svg viewBox="64 64 896 896" fill="currentColor" width="1em" height="1em" aria-hidden="true">
                <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
            </svg>`
            )}
            ${when(
                x => !x.status || x.status == 'process',
                html` <span class="Number">
                ${x => Number(x.index) + 1}
                </span>`
            )}
        </span>
        </slot>
    </div>
    <div class="Tail"></div>
    <div class="Content">
        <div class="Title">
            ${x => x.title}
            <span class="Subtitle">
            ${x => x.subtitle}
            </span>
        </div>
        <div class="Desc">${x => x.desc}</div>
    </div>
</template>
`;
// 定义元素
@customElement({
   name: 'h-step',
   styles,
   template,
})
export class HiStep extends HIElementBase {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    // ------------------ 属性 ------------------
  
    /**
     * 标题
     * @date 6/30/2022 - 1:10:52 AM
     *
     * @type {string}
     */
    @attr title: string;
    
    /**
     * 子标题
     * @date 6/30/2022 - 1:12:51 AM
     *
     * @type {string}
     */
    @attr subtitle: string;
    
    /**
     * 描述
     * @date 6/30/2022 - 1:11:02 AM
     *
     * @type {string}
     */
    @attr desc: string;
    
    /**
     * 当前索引
     * @date 6/30/2022 - 3:23:33 PM
     *
     * @type {number}
     */
    @attr index: number;
    
    /**
     * 指定状态。当不配置该属性时，会使用 h-steps 的 current 来自动指定状态。可选： wait process finish error
     * @date 6/30/2022 - 1:11:11 AM
     *
     * @type {('wait' | 'process' | 'finish' | 'error')}
     */
    @attr status: 'wait' | 'process' | 'finish' | 'error';
    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();

    }

}

