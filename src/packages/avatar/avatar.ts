/**
 * @const: HiAvatar 头像
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
import { HiIcon } from "../icon";

const styles = css`
:host{
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    color: #fff;
    background: #c0c4cc;
    width: 32px;
    height: 32px;
    font-size: 20px;
}

:host .Slot{
    display: flex;
    height:100%;
    width:100%;
    align-items: center;
    justify-content: center;
}
::slotted(*){
    max-height:100%;
    max-width:100%;
}
:host([circle]) {
    border-radius: 50%;
}
:host([size="large"]) {
    width: 40px;
    height: 40px;
    font-size: 24px;
}
:host([size="small"]) {
    width: 24px;
    height: 24px;
    font-size: 16px;
}

`
const template = html<HiAvatar>`
<slot class="Slot"></slot>
`;
@customElement({
   name: 'h-avatar',
   styles,
   template,
})
export class HiAvatar extends HIElement {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    @observable
    slots: Node;
    // ------------------ 属性 ------------------
    
    /**
     * 圆形
     * @date 6/24/2022 - 3:11:12 PM
     *
     * @type {boolean}
     */
    @attr circle: boolean;
    /**
     * 尺寸
     * @public number
     */
    @attr size: 'large' | 'small' | 'default' | number;
    private sizeChanged(oldValue, newValue): void {
        if (!['large', 'small', 'default'].includes(newValue)) {
            this.style.width = newValue + 'px';
            this.style.height = newValue + 'px';        
            this.style.fontSize = newValue * 0.65 + 'px';        
        }
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
        console.log(this.slots['clientHeight']);
        
    }

}

