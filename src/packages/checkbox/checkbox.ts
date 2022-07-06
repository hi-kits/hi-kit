/**
 * @class: HiCheckbox
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, attr, observable, ref, html } from 'hi-element';
// 混入基础功能
import { HIElementForm } from '../_mixins/hiElementForm';
// 样式文件
import { CheckboxStyles as styles } from "./checkbox.style";

// 模版文件
const template = html<HiCheckbox>`
<h-tips ${ref('tips')} type="error" dir="topleft">
    <input type="checkbox" id="checkbox" ${ref('checkbox')}>
    <label for="checkbox">
        <span class="cheked">
            <svg style="fill: #fff;overflow: hidden;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path d="M700.7232 331.008l73.984 70.7584-329.5744 344.7808-192.6656-190.1056 71.936-72.9088L443.0336 600.576z"></path>
            </svg>
        </span>
        <slot></slot>
    </label>
</h-tips>
`;
@customElement({
    name: 'h-checkbox',
    template,
    styles
})
export class HiCheckbox extends HIElementForm {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    @observable
    checkbox: HTMLInputElement;
    @observable
    tips: HTMLTemplateElement;
    isfocus;
    // ------------------ 属性 ------------------
    /**
     * disabled 状态变更时触发
     * @param oldValue 原始值
     * @param newValue 新值
     */
    disabledChanged(oldValue, newValue): void {
        if(!!newValue){
            this.checkbox.setAttribute('disabled', '');
        }else{
            this.checkbox.removeAttribute('disabled');
        }
    }
     
    // ------------------ 自定义函数 ------------------
    /**
      * 当自定义元素第一次被连接到文档DOM时被调用
      * @internal
      */
    public connectedCallback(): void {
        super.connectedCallback();
        this.checkbox.addEventListener('change',(ev)=>{
            // this.checked = this.checkbox.checked;
            this.$emit('change', { checked: this.checked });
        })
        this.checkbox.addEventListener('focus',(ev)=>{
            ev.stopPropagation();
            if(!this.isfocus){
                this.$emit('focus', { value: this.value });
            }
        })
        this.checkbox.addEventListener('blur',(ev)=>{
            ev.stopPropagation();
            if( Number(getComputedStyle(this.checkbox).zIndex) ==2){
                this.isfocus = true;
            }else{
                this.isfocus = false;
                this.$emit('blur', { value: this.value });
            }
        })
        
    }
    checkValidity(){
        if( this.disabled ){
            return true;
        }
        if(this.validity){
            this.invalid = false;
            this.tips['show'] = false;
            return true;
        }else{
            this.focus();
            this.invalid = true;
            this.tips['show'] = 'show';
            this.tips['tips'] = this.checkbox.validationMessage;
            return false;
        }
    }
    
}

