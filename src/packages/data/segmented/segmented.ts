/**
 * @const: HiSegmented 分段控制器项
 * @version 0.0.1
 * @author by fico on 2022/06/29
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, attr, css,  html, when } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../../_mixins/hiElementBase';
// 样式文件
import { SegmentedStyles as styles } from "./segmented.style";
// 模版文件
const template = html<HiSegmented>`
<label>
    <input type="radio" class="SegmentedInput">
    <div class="SegmentedItem">
        <slot></slot>
    </div>
</label>
`;
// 定义元素
@customElement({
   name: 'h-segmented',
   styles,
   template,
})
export class HiSegmented extends HIElementBase {
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

