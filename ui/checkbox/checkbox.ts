/**
 * checkbox
 * @class: HCheckbox
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

export default class HCheckbox extends HTMLElement {

    static get observedAttributes() { return ['disabled','checked','required'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{ 
            display:inline-block;
            font-size:14px;
            color:var(--fontColor,#333);
            -webkit-tap-highlight-color: transparent;
        }
        :host([disabled]){ 
            pointer-events: none; 
            opacity:.6; 
        }
        :host([disabled]) label{ 
            pointer-events: all;  
            cursor: not-allowed; 
        }
        #checkbox{
            position:absolute;
            clip:rect(0,0,0,0);
        }
        :host(:focus-within) .cheked,:host(:not([disabled])) label:hover .cheked{ 
            border-color:var(--themeColor,#42b983);
            /*box-shadow: 0 0 10px rgba(0,0,0,0.1);*/
            z-index:1;
        }
        :host(:focus-within) #checkbox,:host(:active) #checkbox{
            z-index:2
        }
        :host([disabled]) .cheked{ 
            background:rgba(0,0,0,.1);
        }
        label{
            box-sizing:border-box;
            cursor:pointer;
            display:flex;
            align-items:center;
        }
        xy-tips{
            display:block;
            padding-left: 0.575em;
            margin-left: -0.575em;
        }
        xy-tips[show=show]{
            --themeColor:var(--errorColor,#f4615c);
            --borderColor:var(--errorColor,#f4615c);
        }
        .cheked{
            display:flex;
            justify-content: center;
            align-items: center;
            margin-right:.5em;
            position:relative;
            width: 1em;
            height: 1em;
            border: 0.0875em solid var(--borderColor,rgba(0,0,0,.2));
            border-radius: 0.15em;
            text-align: initial;
            transition:.3s;
        }
        :host(:empty) .cheked{
            margin-right:0;
        }
        .cheked::before{
            position:absolute;
            content:'';
            width:74%;
            height:0.15em;
            background:#fff;
            transform:scale(0);
            border-radius: 0.15em;
            transition: .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
        }
        .cheked::after{
            position:absolute;
            content:'';
            width:100%;
            height:100%;
            background:var(--themeColor,#42b983);
            border-radius:50%;
            opacity:.2;
            transform:scale(0);
            z-index:-1;
            transition: .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
        }
        /*
        :host(:focus-within) .cheked::after,:host(:active:not([disabled])) .cheked::after{ 
            transform:scale(2.5);
        }
        */
        .icon{
            width: 100%;
            height: 100%;
            transform: scale(0);
            transition: .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
        }
        #checkbox:focus-visible+label .cheked::after{
            transform:scale(2.5);
        }
        #checkbox:checked:not(:indeterminate)+label .cheked .icon{
            transform: scale(1.5);
        }
        #checkbox:checked+label .cheked,
        #checkbox:indeterminate+label .cheked{
            border-color:transparent;
            background-color:var(--themeColor,#42b983);
        }
        #checkbox:indeterminate+label .cheked::before{
            transform:scale(1);
        }
        </style>
        <xy-tips id="tip" type="error" dir="topleft">
            <input type="checkbox" id="checkbox">
            <label for="checkbox">
                <span class="cheked"><svg class="icon" style="fill: #fff;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1408"><path d="M700.7232 331.008l73.984 70.7584-329.5744 344.7808-192.6656-190.1056 71.936-72.9088L443.0336 600.576z"></path></svg></span>
                <slot></slot>
            </label>
        </xy-tips>
        `
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get novalidate() {
        return this.getAttribute('novalidate')!==null;
    }

    get required() {
        return this.getAttribute('required')!==null;
    }

    get name() {
        return this.getAttribute('name');
    }

    get checked() {
        return this.getAttribute('checked')!==null;
    }

    get indeterminate() {
        return this.checkbox.indeterminate;
    }

    get value() {
        return this.getAttribute('value')||this.textContent;
    }

    get invalid() {
        return this.getAttribute('invalid')!==null;
    }

    get validity() {
        return this.checkbox.checkValidity();
    }

    get errortips() {
        return this.getAttribute('errortips');
    }

    set disabled(value) {
        if(value===null||value===false){
            this.removeAttribute('disabled');
        }else{
            this.setAttribute('disabled', '');
        }
    }

    set checked(value) {
        if(value===null||value===false){
            this.removeAttribute('checked');
        }else{
            this.setAttribute('checked', '');
        }
    }

    set indeterminate(value) {
        if(value===null||value===false){
            this.checkbox.indeterminate = false;
        }else{
            this.checkbox.indeterminate = true;
        }
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

    focus() {
        this.checkbox.focus();
    }

    reset() {
        this.checkbox.checked = false;
        this.invalid = false;
        this.tip.show = false;
    }

    checkValidity(){
        if(this.novalidate||this.disabled||this.form&&this.form.novalidate){
            return true;
        }
        if(this.validity){
            this.invalid = false;
            this.tip.show = false;
            return true;
        }else{
            this.focus();
            this.invalid = true;
            this.tip.show = 'show';
            this.tip.tips = this.errortips||this.checkbox.validationMessage;
            return false;
        }
    }
    
    connectedCallback() {
        this.form = this.closest('xy-form');
        this.checkbox = this.shadowRoot.getElementById('checkbox');
        this.tip = this.shadowRoot.getElementById('tip');
        this.disabled = this.disabled;
        this.checked = this.checked;
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
            if(getComputedStyle(this.checkbox).zIndex==2){
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
        this.required = this.required;
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'disabled' && this.checkbox){
            if(newValue!==null){
                this.checkbox.setAttribute('disabled', 'disabled');
            }else{
                this.checkbox.removeAttribute('disabled');
            }
        }
        if( name == 'checked' && this.checkbox){
            if(newValue!==null){
                this.checkbox.checked = true;
            }else{
                this.checkbox.checked = false;
            }
        }
        if(name == 'required' && this.checkbox){
            if(newValue!==null){
                this.checkbox.setAttribute('required', 'required');
            }else{
                this.checkbox.removeAttribute('required');
            }
        }
    }
}

if(!customElements.get('h-checkbox')){
    customElements.define('h-checkbox', HCheckbox);
}

