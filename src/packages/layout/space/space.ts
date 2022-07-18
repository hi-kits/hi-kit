/**
 * @const: HiSpace 间距
 * @version 0.0.1
 * @author by fico on 2022/07/15
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../../_mixins/hiElementBase';
// 样式助手
import { Style, display } from '../../../utils/style';

// 样式
const styles = css`
${display("inline-flex")}
:host([dir="vertical"]){
    flex-direction: column
}

`;
// 模版文件
const template = html<HiSpace>`<slot></slot>`;
// 定义元素
@customElement({
   name: 'h-space',
   styles,
   template,
})
export class HiSpace extends HIElementBase {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------

    // ------------------ 属性 ------------------
    
    /**
     * 指定间距方向。目前支持水平（ horizontal ）和竖直（ vertical ）两种方向
     * @date 7/15/2022 - 9:20:55 AM
     *
     * @type {("horizontal" | "vertical")}
     */
    @attr dir: "horizontal" | "vertical";
    /**
     * 子项目间距
     * @public number
     */
    @attr gutter: number = 12;
    private gutterChanged(oldValue, newValue): void {
        Style(this)({'gap': newValue + 'px'})
    }
    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();
    }

}

