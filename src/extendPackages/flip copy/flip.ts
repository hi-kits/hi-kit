/**
 * @const: HiFlip 翻转
 * @version 0.0.1
 * @author by fico on 2022/06/22
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
import { FlipStyles as styles } from "./flip.style";


const template = html<HiFlip>`
<div class="Flip" style="width:${x=> x.width + 'px'}; height:${x=> x.height + 'px'};">
    <slot class="Front" name="front"></slot>
    <slot class="Back" name="back"></slot>
</div>
`;
@customElement({
   name: 'h-flip',
   styles,
   template,
})
export class HiFlip extends HIElement {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------

    // ------------------ 属性 ------------------
    
    /**
     * 宽度
     * @date 6/23/2022 - 12:45:03 PM
     *
     * @type {number}
     */
    @attr width: number = 100;

    
    /**
     * 高度
     * @date 6/23/2022 - 12:45:15 PM
     *
     * @type {number}
     */
    @attr height: number = 100;

    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();

    }

}

