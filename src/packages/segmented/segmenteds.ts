/**
 * @const: HiSegmenteds 分段控制器
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
const styles = css`

:host {
    box-sizing: border-box;
    margin: 0;
    color: var(--fontColor, #333);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: "tnum","tnum";
    display: inline-block;
    padding: 2px;
    color: rgb(0 0 0 / 65%);
    background-color:  var(--background-1, rgb(0 0 0 / 4%));
    border-radius: var(--borderRadius, 4px);
    transition: all .3s cubic-bezier(.645,.045,.355,1);
}
:host .Segmenteds{
    position: relative;
    display: flex;
    align-items: stretch;
    justify-items: flex-start;
    width: 100%;
}
.thumb{
    background-color: var(--colorWhite, #fff);
    border-radius: var(--borderRadius, 4px);
    box-shadow: 0 2px 8px -2px #0000000d, 0 1px 4px -1px #00000012, 0 0 1px #00000014;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    padding: 4px 0;
}
`
// 模版文件
const template = html<HiSegmenteds>`
<div class="Segmenteds">
    <div class="thumb"></div>
    <slot></slot>
</div>

`;
// 定义元素
@customElement({
   name: 'h-segmenteds',
   styles,
   template,
})
export class HiSegmenteds extends HIElementBase {
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

