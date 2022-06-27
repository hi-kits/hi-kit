/**
 * @class: HiCheckboxGroup
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */


import { HIElement, customElement, observable, ref, html, attr } from 'hi-element';
import { CheckboxGroupStyles as styles } from "./checkbox.group.style";
  
 
const template = html<HiCheckboxGroup>`
<xy-tips id="tip" ${x => x.disabled ? "tabindex='-1'" : ""} type="error">
    <slot ${ref('slots')}></slot>
</xy-tips>
`;
@customElement({
    name: 'h-checkbox-group',
    template,
    styles
})
export class HiCheckboxGroup extends HIElement {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    @observable
    slots: HTMLSlotElement;
    elements;
    value;
    init;
    // ------------------ 属性 ------------------
    /**
      * 不可点击
      * @date 6/23/2022 - 5:36:38 PM
      *
      * @type {!boolean}
      */
    @attr disabled!: boolean;
    @attr defaultvalue!: Array<any>;
    // ------------------ 自定义函数 ------------------
    public connectedCallback(): void {
        super.connectedCallback();
        this.slots.addEventListener('slotchange',()=>{
            this.elements  = this.querySelectorAll('x-checkbox');
            this.value = this.defaultvalue;
            this.elements.forEach(el=>{
                el.addEventListener('change',()=>{
                    this.checkValidity();
                    this.dispatchEvent(new CustomEvent('change',{
                        detail:{
                            value:this.value
                        }
                    }));
                })
            })
            this.init = true;
        })
        
    }

    checkValidity(){
        // if(this.novalidate||this.disabled||this.form&&this.form.novalidate){
        //     return true;
        // }
        // if(this.validity){
        //     this.tip.show = false;
        //     this.invalid = false;
        //     return true;
        // }else{
        //     this.focus();
        //     this.tip.show = 'show';
        //     this.invalid = true;
        //     if(this.len<this.min){
        //         this.tip.tips = `请至少选择${this.min}项`;
        //     }
        //     if(this.len>this.max){
        //         this.tip.tips = `至多选择${this.max}项`;
        //     }
        //     return false;
        // }
    }



}
