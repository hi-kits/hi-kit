/**
 * Switch
 * @class: Switch
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, html } from 'hi-element';
import { SwitchStyles as styles } from "./switch.style";

const template = html<Switch>`
<input type="checkbox" id="switch"/>
<label for="switch"></label>
`;
@customElement({
   name: 'h-switch',
   template,
   styles
})
export class Switch extends HIElement {

    @attr disabled = false;
    @attr checked = true;
    isfocus;
    value;
    
    focus() {
        // this.focus();
    }
    connectedCallback() {
        super.connectedCallback()
        this.disabled = this.disabled;
        this.checked = this.checked;
        this.shadowRoot!.addEventListener('change',(ev)=>{
            this.checked = this.checked;
            this.dispatchEvent(new CustomEvent('change', {
                detail: {
                    checked: this.checked
                }
            }));
        })
        this.shadowRoot!.addEventListener('keydown', (ev) => {
            switch (ev['keyCode']) {
                case 13://Enter
                    this.checked = !this.checked;
                    break;
                default:
                    break;
            }
        })
        this.shadowRoot!.addEventListener('focus',(ev)=>{
            ev.stopPropagation();
            if(!this.isfocus){
                this.dispatchEvent(new CustomEvent('focus',{
                    detail:{
                        value:this.value
                    }
                }));
            }
        })
        this.shadowRoot!.addEventListener('blur',(ev)=>{
            ev.stopPropagation();
            if(Number(getComputedStyle(this).zIndex)==2){
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


    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'disabled'){
            if(newValue!==null && this.shadowRoot){
                this.setAttribute('disabled', 'disabled');
            }else{
                this.removeAttribute('disabled');
            }
        }
        if( name == 'checked'){
            if(newValue!==null && this.shadowRoot){
                this.checked = true;
            }else{
                this.checked = false;
            }
        }
    }
}

