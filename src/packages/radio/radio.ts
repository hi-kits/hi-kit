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
// 事件处理
import { EventUtil } from '../_utils/event';
import { Style } from '../_utils/style/style';
// 样式文件
import { RadioStyles as styles } from "./radio.style";

// 模版文件
const template = html<HiRadio>`
<input type="radio" name="${x=>x.name}" id="radio" ${ref("radio")} />
<label class="LabelRadio" id="label" for="radio">
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
    @attr value: any = this.textContent;
    valueChanged(oldValue, newValue): void {
        this.setAttribute('value', newValue || this.textContent);
    }
    disabledChanged(oldValue, newValue): void {
        this.disabledFn(!!newValue);
    }
    checkedChanged(oldValue, newValue): void {
        this.checkedFn(!!newValue);
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
        EventUtil.addHandler(this.radio, 'change', () => {
            this.tocheck();
            this.$emit('change', { checked: this.checked });
        });
        EventUtil.addHandler(this.radio, 'click', () => {
            this.tocheck();
        });
        // this.disabled = this.disabled;
        // this.checked = this.checked;
        this.checkedFn(this.checked);
        this.disabledFn(this.disabled);
    }
    checkedFn(checked): void {
        if (this.radio) {
            if(checked){
                this.radio.setAttribute('checked', '');
            } else {
                this.radio.removeAttribute('checked');
            }
        }
    }
    /**
     * disabled 处理
     * @param disabled 
     */
    disabledFn(disabled): void {
        if (this.radio) {
            if(disabled){
                this.radio.setAttribute('disabled', '');
            } else {
                this.radio.removeAttribute('disabled');
            }
        }
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


