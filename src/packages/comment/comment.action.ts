/**
 * @const: HiCommentAction 评论操作
 * @version 0.0.1
 * @author by fico on 2022/06/29
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../_mixins/hiElementBase';
// 样式助手
import { Style } from '../_utils/style/style';
// 样式
const styles = css`
:host {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 4px 0;
    font-size: 14px;
    color: #ccc;
    align-items: center;
}



`;
// 模版文件
const template = html<HiCommentAction>`
<slot></slot>
`;
// 定义元素
@customElement({
   name: 'h-comment-action',
   styles,
   template,
})
export class HiCommentAction extends HIElementBase {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    // ------------------ 属性 ------------------
    /**
     * 尺寸
     * @public number
     */
    sizeChanged(oldValue, newValue): void {
        Style(this)({
            height: newValue + 'px',
            fontSize: newValue + 'px'
        });
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

