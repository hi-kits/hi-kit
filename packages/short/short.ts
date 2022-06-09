/**
 * Short
 * @class: Short
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, html } from 'hi-element';
import { ShortStyles as styles } from "./short.style";

const template = html<Short>`

<div class="Short">
		<div class="ShortMedia">
			王
		</div>
		<div class="ShortLabel">姓名</div>
		<a href="javascript:;" class="ShortDel"></a>
</div>
`;
@customElement({
   name: 'h-short',
   template,
   styles
})
export class Short extends HIElement {

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
        
        if( name == 'checked'){
            if(newValue!==null && this.shadowRoot){
                this.checked = true;
            }else{
                this.checked = false;
            }
        }
    }
}

