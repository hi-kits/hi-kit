/**
 * @class: HiCheckboxGroup
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

// 核心库
import { HIElement, customElement, observable, ref, html, attr } from 'hi-element';
// 事件处理
import { EventUtil } from '../_utils/event';
// 混入基础功能
import { HIElementForm } from '../_mixins/hiElementForm';
// 样式文件
import { CheckboxGroupStyles as styles } from "./checkbox.group.style";
  
 // 模版文件
const template = html<HiCheckboxGroup>`
<h-tips id="tip" ${x => x.disabled ? "tabindex='-1'" : ""} type="error">
    <slot ${ref('slots')}></slot>
</h-tips>
`;
// 定义元素
@customElement({
    name: 'h-checkbox-group',
    template,
    styles
})
export class HiCheckboxGroup extends HIElementForm {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    @observable
    slots: HTMLSlotElement;
    elements;
    init;
    // ------------------ 属性 ------------------
    valueChanged(): any {
        this.elements.forEach(el=>{
            if(this.value.includes(el.value)){
                el.setAttribute('checked','');
            } else {
                el.removeAttribute('checked');
            }
        })
        
    }
    @attr defaultvalue!:any;
    // ------------------ 自定义函数 ------------------
    connectedCallback(): void {
        super.connectedCallback();
        EventUtil.addHandler(this.slots, 'slotchange', ()=>{
            this.elements  = this.querySelectorAll('h-checkbox');
            this.value = this.defaultvalue;
            this.elements.forEach(el=>{
                EventUtil.addHandler(el, 'change',()=>{
                    this.checkValidity();
                    this.$emit('change', {
                        value:this.value
                    })
                })
            })
            this.init = true;
        });        
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
