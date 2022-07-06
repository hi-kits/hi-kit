/**
 * @class: HiSelect
 * @version 0.0.1
 * @author by fico on 2022/06/17
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

// 核心库
import { HIElement, customElement, html, attr, ref, observable } from 'hi-element';
// 混入基础功能
import { HIElementForm } from '../_mixins/hiElementForm';
// 样式文件
import { RadioStyles as styles } from "./radio.style";

// 模版文件
const template = html<HiRadio>`
<input type="checkbox" id="radio" ${ref("radio")} />
<label id="label" for="radio">
    <span class="cheked"></span>
    <slot></slot>
</label>

`;
// 定义元素
@customElement({
   name: 'h-radio',
   template,
   styles
})
export class HiRadio extends HIElementForm {
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


