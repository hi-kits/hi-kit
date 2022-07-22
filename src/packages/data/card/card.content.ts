/**
 * @class: HiCardContent 卡片内容
 * @version 0.0.1
 * @author by fico on 2022/06/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, html, css } from 'hi-element';
// 配置文件
import { hiConfigStyle } from "@packages/config";

// 样式
export const styles = css`
${hiConfigStyle()}
:host .CardContent{
    position: relative;
    padding: 12px;
    margin: -1px 0;
}
:host .CardContent::after,
:host .CardContent::before{
    content:'';
    position:absolute;
    left:0;
    right:auto;
    height:1px;
    width:100%;
    background-color: var(--colorNeutral05);
    display:block;
    z-index:15
}
:host .CardContent:after{
    bottom:0;
    top:auto;
-webkit-transform-origin:50% 100%;
        transform-origin:50% 100%
}
:host .CardContent:before {
    top:0;
    bottom:auto;
-webkit-transform-origin:50% 0;
        transform-origin:50% 0
}

`;

const template = html<HiCardContent>`
<div class="CardContent">
<slot></slot>
</div>
`;
// 定义元素
@customElement({
   name: 'h-card-content',
   template,
   styles
})
export class HiCardContent extends HIElement {
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

