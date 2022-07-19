/**
 * @class: HiInput 输入框
 * @version 0.0.1
 * @author by fico on 2022/07/11
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, html, attr, when, ref, observable } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../../_mixins/hiElementBase';
// 样式助手
import { Style } from '../../../utils/style';
// 事件处理
import { EventUtil } from '../../../utils/event';
// 获取滚动条位置
import { GetPageScroll } from '../../../utils/browser/getPageScroll';
// 样式文件
import { NotifyStyles as styles } from "./input.style";
// 依赖组件
import { HiButton } from "../../currency/button";
import { HiIcon } from "../../currency/icon";
import { HiTips } from "../../data/tips";

// 模版文件
const template = html<HiInput>`
<h-tips id="input-con" dir="${x => x.errordir}" type="error">
    ${when(
        x => x.icon ,
        html<HiInput>`<h-icon class="icon-pre" name='+this.icon+'></h-icon>`
    )}
    <input ${ref('input')} class="input"
        value="${x => x.defaultvalue}" 
        type="${x => x.typeMap(x.type)}" 
        placeholder="${x => x.placeholder}" 
        minlength="${x => x.minlength}" 
        rows="${x => x.rows}" 
        maxlength="${x => x.maxlength}"/>
    <slot></slot>
    ${when(
        x => x.label && !x.icon ,
        html<HiInput>`<label class="input-label">${x => x.label}</label>`
    )}
    ${when(
        x => x.type === 'password' && !x.multi,
        html<HiInput>`<h-button ${ref('btnPass')} class="btn-right" icon="eye-close" type="flat" shape="circle"></h-button>`
    )}
    ${when(
        x => x.type === 'search' && !x.multi,
        html<HiInput>`<h-button  ${ref('btnSearch')} class="btn-right" icon="search" type="flat" shape="circle"></h-button>`
    )}
    ${when(
        x => x.type === 'number' && !x.multi,
        html<HiInput>`<div class="btn-right btn-number">
            <h-button ${ref('btnAdd')} icon="up" type="flat"></h-button>
            <h-button ${ref('btnSub')} icon="down" type="flat"></h-button>
        </div>`
    )}
</h-tips>
`;
// 定义元素
@customElement({
   name: 'h-input',
   template,
   styles,
   shadowOptions: { mode: 'closed'},
})
export class HiInput extends HIElementBase {
    // ------------------ 构造函数 ------------------
    constructor() {
        super();
    }
    // ------------------ 参数 ------------------
    label;
    type;
    multi;
    icon;
    novalidate;
    form;
    validity;
    inputCon;
    invalid;
    @observable
    input: HTMLInputElement;
    customValidity;
    errortips;
    debounce;
    timer;
    value;
    list ;
    @observable
    btnPass: HTMLButtonElement;
    @observable
    btnAdd: HTMLButtonElement;
    @observable
    btnSub: HTMLButtonElement;
    password;
    pattern;
    @observable
    btnSearch: HTMLButtonElement;
    rows;
    maxlength;
    
    minlength;
    errordir;
    // ------------------ 属性 ------------------
    
    /**
     * 默认值
     * @date 7/11/2022 - 3:37:54 PM
     *
     * @type {string}
     */
    @attr defaultvalue: string;
    @attr placeholder: string;
    placeholderChanged(oldValue, newValue): void {
        this.placeholder = newValue || this.label;
    }

    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();
        EventUtil.addHandler(this.input, 'input', (ev)=>{
            ev.stopPropagation();
            this.checkValidity();
            if(this.debounce){
                this.timer && clearTimeout(this.timer);
                this.timer = setTimeout(()=>{
                    this.dispatchEvent(new CustomEvent('input',{
                        detail:{
                            value:this.value
                        }
                    }));
                    if(this.list) {
                        this.list.filter(this.value);
                        this.list.show = true;
                    }
                },this.debounce)
            }else{
                this.dispatchEvent(new CustomEvent('input',{
                    detail:{
                        value:this.value
                    }
                }));
                if(this.list) {
                    this.list.filter(this.value);
                    this.list.show = true;
                }
            }
        });
        EventUtil.addHandler(this.input, 'change', ()=>{
            this.dispatchEvent(new CustomEvent('change',{
                detail:{
                    value:this.value
                }
            }));
        });
        EventUtil.addHandler(this.input, 'focus', ()=>{
            this.checkValidity();
            if(this.list) {
                const { left, top, height, width } = this.getBoundingClientRect();
                this.list.style = `left:${left+ window.scrollX}px;top:${top + height + window.scrollY}px;min-width:${width}px`;
                this.list.show = true;
            }
        });
        EventUtil.addHandler(this.input, 'keydown', (ev)=>{
            switch (ev.key) {
                case 'ArrowUp':
                case 'ArrowDown':
                    if(this.list){
                        ev.preventDefault();
                        this.list.show = true;
                    }
                    break;
                case 'Escape':
                case 'Tab':
                    if(this.list){
                        this.list.show = false;
                    }
                    break;
                case 'Enter':
                    if(this.list){
                        ev.preventDefault();
                        this.list.show = true;
                    }else{
                        this.dispatchEvent(new CustomEvent('submit',{
                            detail:{
                                value:this.value
                            }
                        }));
                    }
                    break;
                default:
                    break;
            }
        });
        if(!this.multi){
            if(this.btnSearch){
                EventUtil.addHandler(this.btnSearch, 'click', ()=>{
                    this.$emit('submit', { value:this.value });
                });
            }
            if(this.btnPass){
                EventUtil.addHandler(this.btnPass, 'click', ()=>{
                    this.password = !this.password;
                    if(this.password){
                        this.input.setAttribute('type','text');
                        this.btnPass['icon'] = 'eye';
                    }else{
                        this.input.setAttribute('type','password');
                        this.btnPass['icon'] = 'eye-close';
                    }
                    this.input.focus();
                });
            }
            if(this.btnAdd){
                EventUtil.addHandler(this.btnAdd, 'click', ()=>{
                    this.input.stepUp();
                    this.$emit('change', { value:this.value });
                });
            }
            if(this.btnSub){
                EventUtil.addHandler(this.btnSub, 'click', ()=>{
                    this.input.stepDown();
                    this.$emit('change', { value:this.value });
                });
            }
            this.pattern = this.pattern;
        }

        EventUtil.addHandler(document, 'mousedown', this.setlist);

        // EventUtil.addHandler(this.list, 'submit', (ev)=>{
        //     this.focus();
        //     if(ev.target.value){
        //         this.value = ev.target.value;
        //         this.list.show = false;
        //         this.$emit('change', { value:this.value });
        //     }
        // });
       
    }

    typeMap(type) {
        switch (type) {
            case 'password':
            case 'number':
            case 'email':
            case 'tel':
            case 'url':
                break;
            default:
                type = 'text'
                break;
        }
        return type;
    }

    setlist = (ev) => {
        if(this.list) {
            if (this.contains(ev.target) || this.list.contains(ev.target)) {
                this.list.show = true;
            } else {
                this.list.show = false;
            }
        }
    }

    checkValidity(){
        if(this.novalidate||this.disabled||this.form&&this.form.novalidate){
            return true;
        }
        if(this.validity){
            this.inputCon.show = false;
            this.invalid = false;
            return true;
        }else{
            this.input.focus();
            this.inputCon.show = 'show';
            this.invalid = true;
            if(this.input.validity.valueMissing){
                this.inputCon.tips = this.input.validationMessage;
            }else{
                if(!this.customValidity.method(this)){
                    this.inputCon.tips = this.customValidity.tips;
                }else{
                    this.inputCon.tips = this.errortips||this.input.validationMessage;
                }
            }
            return false;
        }
    }

}


