/**
 * @const: HiComment 评论
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
    padding: 16px 0;
    font-size: 14px;
}
:host [name="avatar"]{
    position: relative;
    cursor: pointer;
}
:host [name="avatar"] + div{
    margin-left: 12px;
}
.Author{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 4px;
    font-size: 14px;
}
:host [name="author"],
:host [name="time"] {
    padding-right: 8px;
    font-size: 12px;
    line-height: 18px;
}
:host [name="time"]{
    color: #ccc;
    white-space: nowrap;
    cursor: auto;
}
`;
// 模版文件
const template = html<HiComment>`
<slot name="avatar"></slot>
<div>
    <div class="Author">
        <slot name="author"></slot>
        <slot name="time"></slot>
    </div>
    <slot></slot>
</div>
`;
// 定义元素
@customElement({
   name: 'h-comment',
   styles,
   template,
})
export class HiComment extends HIElementBase {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    // ------------------ 属性 ------------------
    /**
     * 尺寸
     * @public number
     */
    sizeChanged(oldValue, newValue): void {
        Style(this)({
            fontSize: newValue + 'px',
            height: newValue + 'px'
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

