/**
 * @class: HiCardFooter 卡片页脚
 * @version 0.0.1
 * @author by fico on 2022/06/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, html, css } from 'hi-element';
import { hiConfig } from "../config";


export const styles = css`

:host{
    color: #6d6d72;
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
    -webkit-justify-content:space-around;
            justify-content:space-around;
    -webkit-box-align:center;
    -ms-flex-align:center;
    -webkit-align-items:center;
            align-items:center
}

`;

const template = html<HiCardFooter>`
<slot></slot>
`;
@customElement({
   name: 'h-card-footer',
   template,
   styles
})
export class HiCardFooter extends HIElement {
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

