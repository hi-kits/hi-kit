/**
 * @const: HiTab 标签页项
 * @version 0.0.1
 * @author by fico on 2022/07/01
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, attr, css,  html, when } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../../_mixins/hiElementBase';
// 样式文件
import { TabsStyles as styles } from "./tabs.style";
// 模版文件
const template = html<HiTab>`<slot></slot>`;
// 定义元素
@customElement({
   name: 'h-tab',
   styles,
   template,
})
export class HiTab extends HIElementBase {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    // ------------------ 属性 ------------------
    
    /**
     * 每个h-tab需要指定一个标识 key 没有会默认以序列号为 key
     * @date 7/1/2022 - 3:33:41 PM
     *
     * @type {string}
     */
    @attr key: string;
    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();

    }

}

