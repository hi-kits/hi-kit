/**
 * Toast
 * @class: Toast
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, html } from 'hi-element';
import { ToastStyles as styles } from "./toast.style";

const template = html<Toast>`

<div class="ToastBox ToastIn" style="z-index: 2021; margin-left: -54.5px;">默认Toast样式</div>
`;
@customElement({
   name: 'h-toast',
   template,
   styles
})
export class Toast extends HIElement {

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
let toastContent: any = document.getElementById('ToastContent');
if(!toastContent){
    toastContent = document.createElement('div');
    toastContent.id = 'ToastContent';
    toastContent.style = 'position:fixed; pointer-events:none; left:0; right:0; top:10px; z-index:51;';
    document.body.appendChild(toastContent);
}

export default {
    info: () => {
        const message = new Toast();
        toastContent.appendChild(message);
    },
}
