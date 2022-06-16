/**
 * EditWord
 * @class: EditWord
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, html, when, observable,slotted, Observable, ref } from 'hi-element';
import { EditWordStyles as styles } from "./editWord.style";


const template = html<EditWord>`

<form ${ref("form")}>
    <input ${ref("input")} required="required">
</form>
<span ${ref("span")}>
    <slot></slot>
</span>

`;
@customElement({
   name: 'h-edit-word',
   template,
   styles
})
export class EditWord extends HIElement {
    // ------------------ 构造函数 ------------------
    constructor(
    ) {
        super();
    }
    // ------------------ 参数 ------------------
    @observable
    public input: HTMLInputElement;
    @observable
    public span: HTMLSpanElement;
    @observable
    public form: HTMLFormElement;
    // ------------------ 属性 ------------------
    // @attr
    // ochange: Function;
    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback()
        this.form.style.display = 'none';
        this.span.style.display = 'inline-block'
        this.input.style.width = this.span.clientWidth + 'px';
        this.input.value =  String(this.textContent);
        this.setAttribute('tabindex', '0');
        this.input.setAttribute('required', 'required');
        this.shadowRoot!.addEventListener('click', (ev) => {
            this.span.style.display = 'none';
            this.form.style.display = 'inline-block';
            this.input.focus();
            this.input.setSelectionRange(0, this.input.value.length)
        });
        this.form.addEventListener('submit', e => {
            this.updateDisplay();
            e.preventDefault();
        });
        this.input.addEventListener('blur', () => {
            this.updateDisplay();
        });
        this.addEventListener("ochange", (e: Event): void => {
            if (
                e.defaultPrevented ||
                e.target === null
            ) {
                return;
            }
    
            e.preventDefault();
            alert(2)
           
        });
    }
    /**
     * 更新显示
    */
    updateDisplay(): void {
        this.span.style.display = 'inline-block';
        this.form.style.display = 'none';
        this.span.textContent = this.input.value;
        this.input.style.width = this.span.clientWidth + 'px';
        // console.log(this.ochange);
        // this.ochange(3)
        
        // this.ochange(this.input.value)
        this.$emit("ochange",  this.input.value);
    }


}

