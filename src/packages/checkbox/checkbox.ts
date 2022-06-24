/**
 * @class: HiCheckbox
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, slotted,  html } from 'hi-element';
import { CheckboxStyles as styles } from "./checkbox.style";

const template = html<HiCheckbox>`
    <input type="checkbox" id="checkbox" ${ref('checkbox')}>
    <label for="checkbox">
        <span class="cheked">
            <svg style="fill: #fff;overflow: hidden;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path d="M700.7232 331.008l73.984 70.7584-329.5744 344.7808-192.6656-190.1056 71.936-72.9088L443.0336 600.576z"></path>
            </svg>
        </span>
        <slot></slot>
    </label>
`;
@customElement({
    name: 'h-checkbox',
    template,
    styles
})
export class HiCheckbox extends HIElement {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    @observable
    checkbox: HTMLInputElement;
    isfocus;
    // ------------------ 属性 ------------------
     
    /**
      * 不可点击
      * @date 6/23/2022 - 5:36:38 PM
      *
      * @type {!boolean}
      */
    @attr disabled!: boolean;
    
    /**
     * 必填项
     * @date 6/23/2022 - 5:37:57 PM
     *
     * @type {!boolean}
     */
    @attr required!: boolean;
    
    /**
     * 选中的
     * @date 6/23/2022 - 5:39:08 PM
     *
     * @type {!boolean}
     */
    @attr checked!: boolean;
    
    /**
     * 当前值
     * @date 6/23/2022 - 5:41:34 PM
     *
     * @type {string}
     */
    @attr value: string;
 
     
    // ------------------ 自定义函数 ------------------
    /**
      * 当自定义元素第一次被连接到文档DOM时被调用
      * @internal
      */
    public connectedCallback(): void {
        super.connectedCallback();
        this.checkbox.addEventListener('change',(ev)=>{
            this.checked = this.checkbox.checked;
            this.checkValidity();
            this.dispatchEvent(new CustomEvent('change', {
                detail: {
                    checked: this.checked
                }
            }));
        })
        this.checkbox.addEventListener('focus',(ev)=>{
            ev.stopPropagation();
            if(!this.isfocus){
                this.dispatchEvent(new CustomEvent('focus',{
                    detail:{
                        value:this.value
                    }
                }));
            }
        })
        this.checkbox.addEventListener('blur',(ev)=>{
            ev.stopPropagation();
            if( Number(getComputedStyle(this.checkbox).zIndex) ==2){
                this.isfocus = true;
            }else{
                this.isfocus = false;
                this.dispatchEvent(new CustomEvent('blur',{
                    detail:{
                        value:this.value
                    }
                }));
            }
        })
        
    }
    checkValidity(){
        // if(this.novalidate||this.disabled || this.form && this.form.novalidate){
        //     return true;
        // }
        // if(this.validity){
        //     this.invalid = false;
        //     this.tip.show = false;
        //     return true;
        // }else{
        //     this.focus();
        //     this.invalid = true;
        //     this.tip.show = 'show';
        //     this.tip.tips = this.errortips||this.checkbox.validationMessage;
        //     return false;
        // }
    }
    
}

