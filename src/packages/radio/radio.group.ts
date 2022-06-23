/**
 * @class: HiSelect
 * @version 0.0.1
 * @author by fico on 2022/06/17
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, html, attr, ref, observable } from 'hi-element';
import { RadioStyles as styles } from "./radio.style";
import { HiTips } from "../tips";

const template = html<HiRadio>`
<h-tips id="tip" type="error">
    <slot></slot>
</h-tips>

`;
@customElement({
   name: 'h-radio',
   template,
   styles
})
export class HiRadio extends HIElement {
    // ------------------ 构造函数 ------------------
    constructor(
    ) {
        super();
    }
    // ------------------ 参数 ------------------
    @observable
    public radio: HTMLInputElement;
    group;
    parent;
    
    // ------------------ 属性 ------------------
    @attr disabled: boolean;
    private disabledChanged(oldValue, newValue): void {
        if (newValue === null || newValue === false) {
            this.removeAttribute('disabled');
        } else {
            this.setAttribute('disabled', '');
        }
    }
    @attr checked: boolean;
    private checkedChanged(oldValue, newValue): void {
        if (newValue === null || newValue === false) {
            this.radio.checked = true;
        } else {
            this.radio.checked = false;
        }
    }
    @attr name: string;
    @attr value: string;
    private valueChanged(oldValue, newValue): void {
        this.setAttribute('value', newValue);
    }
    

    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();
        this.group = this.closest('h-radio-group');
        this.parent = this.group || this.getRootNode();
        this.radio.addEventListener('change',(ev)=>{
            this.tocheck();
            this.$emit('change', { checked: this.checked });
        })
    }
    tocheck(): void {
        const selector = this.group ? `h-radio[checked]` : `h-radio[name="${this.name}"][checked]`;
        const prev = this.parent.querySelector(selector);
        if( prev ){
            prev.checked = false;
        }
        this.checked = true;
    }
    
}


