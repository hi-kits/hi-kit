/**
 * @const: HiAvatar 头像
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, attr, observable, css,  html } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../_mixins/hiElementBase';
// 样式助手
import { Style } from '../_utils/style/style';
// 依赖组件
// 样式文件
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
::slotted(img){
    min-height:100%;
    min-width:100%;
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

`;
// 模版文件
const template = html<HiAvatar>`
<slot class="Slot"></slot>
`;
// 定义元素
@customElement({
   name: 'h-avatar',
   styles,
   template,
   shadowOptions: { mode: 'closed'}
})
export class HiAvatar extends HIElementBase {
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
    @attr({ mode: "boolean" }) circle: boolean;

    /**
     * 尺寸改变时调用
     * @param oldValue 
     * @param newValue 
     */
    sizeChanged(oldValue, newValue): void {
        if (!['large', 'small', 'default'].includes(newValue)) {
            Style(this)({
                width: newValue + 'px',
                height: newValue + 'px',
                fontSize: newValue * 0.65 + 'px'
            });
        }
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

