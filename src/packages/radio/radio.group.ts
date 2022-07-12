/**
 * @class: HiSelect
 * @version 0.0.1
 * @author by fico on 2022/06/17
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, html, attr, ref, observable } from 'hi-element';
// 事件处理
import { EventUtil } from '../../utils/event';
// 混入基础功能
import { HIElementForm } from '../_mixins/hiElementForm';
// 样式文件
import { RadioGroupStyles as styles } from "./radio.group.style";
// 依赖组件
import { HiTips } from "../tips";
// 模版文件
const template = html<HiRadioGroup>`
<h-tips id="tip" type="error" ${ref('tip')}>
    <slot  ${ref('slots')}></slot>
</h-tips>

`;
// 定义元素
@customElement({
   name: 'h-radio-group',
   template,
   styles
})
export class HiRadioGroup extends HIElementForm {
    // ------------------ 构造函数 ------------------
    constructor(
    ) {
        super();
    }
    // ------------------ 参数 ------------------
    @observable
    public slots: HTMLSlotElement;
    @observable
    tip: HTMLDivElement;
    
    /**
     * 子元素
     * @date 7/8/2022 - 10:51:52 AM
     *
     * @type {*}
     */
    elements;
    
    // ------------------ 属性 ------------------

    @attr name: string;

    @attr defaultvalue!:any;

    // ------------------ 自定义函数 ------------------
    valueChanged(oldValue, newValue): any {
        this.elements.forEach(el=>{
            if(newValue === el.value){
                el.setAttribute('checked','');
            } else {
                el.removeAttribute('checked');
            }
        })
        
    }
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();
        EventUtil.addHandler(this.slots, 'slotchange',()=>{
            this.elements  = this.querySelectorAll('h-radio');
            // this.value = this.defaultvalue;
            this.elements.forEach(el=>{
                EventUtil.addHandler(el, 'change',()=>{
                    if(el.checked){
                        this.$emit('change', {
                            value:this.value
                        })
                        // this.checkValidity();
                    }
                })
            })
        })
    }
    
}


