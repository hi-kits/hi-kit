/**
 * checkbox Group
 * @class: HCheckboxGroup
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */


class HCheckboxGroup extends HTMLElement {
    static get observedAttributes() { return ['disabled','required'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            display:inline-block;
        }
        :host(:focus-within) xy-tips,:host(:hover) xy-tips{
            z-index:2;
        }
        :host([disabled]){ 
            pointer-events: none; 
        }
        :host([disabled]) xy-tips{
            pointer-events: all;
            cursor: not-allowed;
            outline: 0;
        }
        :host([disabled]) ::slotted(xy-checkbox){
            pointer-events: none;
            opacity:.6;
        }
        ::slotted(xy-checkbox){
            transition: opacity .3s;
        }
        xy-tips[show=show]{
            --themeColor:var(--errorColor,#f4615c);
            --borderColor:var(--errorColor,#f4615c);
        }
        </style>
        <xy-tips id="tip" ${this.disabled?"tabindex='-1'":""} type="error"><slot></slot></xy-tips>
        `
    }

    get name() {
        return this.getAttribute('name');
    }

    get min() {
        const min = this.getAttribute('min')||0;
        return this.required?Math.max(1,min):min;
    }

    get max() {
        return this.getAttribute('max')||Infinity;
    }

    get required() {
        return this.getAttribute('required')!==null;
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get defaultvalue() {
        const defaultvalue = this.getAttribute('defaultvalue');
        return defaultvalue?defaultvalue.split(','):[];
    }

    get value() {
        return [...this.querySelectorAll('xy-checkbox[checked]')].map(el=>el.value);
    }

    get novalidate() {
        return this.getAttribute('novalidate')!==null;
    }

    get validity() {
        this.len = this.value.length;
        if(!this.required && this.len==0){
            return true;
        }
        return this.len>=this.min && this.len<=this.max;
    }

    get invalid() {
        return this.getAttribute('invalid')!==null;
    }

    set disabled(value) {
        if(value===null||value===false){
            this.removeAttribute('disabled');
        }else{
            this.setAttribute('disabled', '');
        }
    }

    set value(value) {
        //['html','js']
        this.elements.forEach(el=>{
            if(value.includes(el.value)){
                el.checked = true;
            }else{
                el.checked = false;
            }
        })
        /*
        if(this.init){
            this.checkValidity();
            this.dispatchEvent(new CustomEvent('change',{
                detail:{
                    value:value
                }
            }));
        }
        */
    }

    set required(value) {
        if(value===null||value===false){
            this.removeAttribute('required');
        }else{
            this.setAttribute('required', '');
        }
    }

    set novalidate(value) {
        if(value===null||value===false){
            this.removeAttribute('novalidate');
        }else{
            this.setAttribute('novalidate', '');
        }
    }

    set invalid(value) {
        if(value===null||value===false){
            this.removeAttribute('invalid');
        }else{
            this.setAttribute('invalid', '');
        }
    }

    focus(){
        if(getComputedStyle(this.tip).zIndex!=2){
            this.elements[0].focus();
        }
    }

    reset() {
        this.value = this.defaultvalue;
        this.invalid = false;
        this.tip.show = false;
    }

    checkall() {
        this.elements.forEach(el=>{
            el.checked = true;
        })
    }

    checkValidity(){
        if(this.novalidate||this.disabled||this.form&&this.form.novalidate){
            return true;
        }
        if(this.validity){
            this.tip.show = false;
            this.invalid = false;
            return true;
        }else{
            this.focus();
            this.tip.show = 'show';
            this.invalid = true;
            if(this.len<this.min){
                this.tip.tips = `请至少选择${this.min}项`;
            }
            if(this.len>this.max){
                this.tip.tips = `至多选择${this.max}项`;
            }
            return false;
        }
    }

    connectedCallback() {
        this.form = this.closest('xy-form');
        this.tip  = this.shadowRoot.getElementById('tip');
        this.slots = this.shadowRoot.querySelector('slot');
        this.slots.addEventListener('slotchange',()=>{
            this.elements  = this.querySelectorAll('xy-checkbox');
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

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'disabled' && this.tip){
            if(newValue!==null){
                this.tip.setAttribute('tabindex',-1);
            }else{
                this.tip.removeAttribute('tabindex');
            }
        }
    }
}

if(!customElements.get('h-checkbox-group')){
    customElements.define('h-checkbox-group', HCheckboxGroup);
}