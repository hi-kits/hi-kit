/**
 * @const: HiListItemMedia 列表项 - 媒体
 * @version 0.0.1
 * @author by fico on 2022/06/29
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 * 垂直展示的时间流信息。
 */
// 核心库
import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
// 配置文件
import { hiConfig } from "../config";

// 样式
const styles = css`
:host {
    margin-right: 12px;
}
`;
// 模版文件
const template = html<HiListItemMedia>`
<slot></slot>
`;
// 定义元素
@customElement({
   name: 'h-list-item-media',
   styles,
   template,
})
export class HiListItemMedia extends HIElement {
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

