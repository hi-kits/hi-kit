/**
 * @class: HiCardHeader 卡片页眉
 * @version 0.0.1
 * @author by fico on 2022/06/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, html, css } from 'hi-element';

// 样式文件
export const styles = css`

:host {
    background-size: cover;
    background-position: center;
    font-size: 14px;
    min-height:44px;
    position:relative;
    padding:0 12px;
    box-sizing:border-box;
    display:-webkit-box;
    display:-ms-flexbox;
    display:-webkit-flex;
    display:flex;
    -webkit-box-pack:justify;
    -ms-flex-pack:justify;
    -webkit-justify-content:space-between;
            justify-content:space-between;
    -webkit-box-align:center;
    -ms-flex-align:center;
    -webkit-align-items:center;
            align-items:center
}

`;
// 模版文件
const template = html<HiCardHeader>`
    <slot></slot>
    <slot name="extra"></slot>
`;
// 定义元素
@customElement({
   name: 'h-card-header',
   template,
   styles
})
export class HiCardHeader extends HIElement {
    // ------------------ 构造函数 ------------------
    constructor(
    ) {
        super();
    }
    // ------------------ 参数 ------------------

    // ------------------ 属性 ------------------

    // ------------------ 自定义函数 ------------------

    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback()
        
    }



}

