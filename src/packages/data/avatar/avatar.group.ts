/**
 * @const: HiAvatarGroup 头像组
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

// 核心库
import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../../_mixins/hiElementBase';
// 样式助手
import { Style } from '../../../utils/style/style';

// 依赖组件
import { HiIcon } from "../../currency/icon";
// 样式文件
const styles = css`
::slotted(h-avatar:not(:first-child)) {
    margin-left: -12px;
    border: 1px solid #fff;
}
`;
// 模版文件
const template = html<HiAvatarGroup>`
<slot class="Slot"></slot>
`;
// 定义元素
@customElement({
   name: 'h-avatar-group',
   styles,
   template,
   shadowOptions: { mode: 'closed'}
})
export class HiAvatarGroup extends HIElementBase {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    @observable
    slots: Node;
    // ------------------ 属性 ------------------
    
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

