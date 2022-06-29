/**
 * @const: HiCommentAction 评论操作
 * @version 0.0.1
 * @author by fico on 2022/06/29
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';

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



`
const template = html<HiCommentAction>`
<slot></slot>
`;
@customElement({
   name: 'h-comment-action',
   styles,
   template,
})
export class HiCommentAction extends HIElement {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    // ------------------ 属性 ------------------
    /**
     * 尺寸
     * @public number
     */
    @attr size;
    private sizeChanged(oldValue, newValue): void {
        this.style.fontSize = newValue + 'px';        
        this.style.height = newValue + 'px'; 
    }

    /**
     * 颜色
     * @public string
     */
    @attr color: string;
    private colorChanged(oldValue, newValue): void {
        this.style.color = newValue;
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

