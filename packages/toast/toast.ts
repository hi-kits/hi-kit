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
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
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

    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     */
    attributeChangedCallback (name, oldValue, newValue) {
        
        if( name == 'checked'){
            if(newValue!==null && this.shadowRoot){
                this.checked = true;
            }else{
                this.checked = false;
            }
        }
    }
}

export default {
    info: () => {
        const message = new Toast();
        document.body.appendChild(message);
    },
}
