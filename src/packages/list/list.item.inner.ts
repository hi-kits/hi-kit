/**
 * @const: HiListItemInner 列表项 - 内部
 * @version 0.0.1
 * @author by fico on 2022/06/29
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 * 垂直展示的时间流信息。
 */

import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
import { hiConfig } from "../config";


const styles = css`
:host {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
`
const template = html<HiListItemInner>`
<slot></slot>
`;
@customElement({
   name: 'h-list-item-inner',
   styles,
   template,
})
export class HiListItemInner extends HIElement {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------

    // ------------------ 属性 ------------------

    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();
        // 设置最后一个子元素的显示状态
        
        
        
    }


}

