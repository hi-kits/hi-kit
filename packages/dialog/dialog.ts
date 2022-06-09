/**
 * Dialog
 * @class: Dialog
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, html } from 'hi-element';
import { DialogStyles as styles } from "./dialog.style";

const template = html<Dialog>`
<div class="dialog">
    <div class="dialog-content">
        <div class="dialog-title" id="title">${x => x.title}</div>
        <h-button class="btn-close" id="btn-close" icon="close"></h-button>
        <div class="dialog-body">
            <slot></slot>
        </div>
        <div class="dialog-footer">
            <h-button id="btn-cancel">${x => x.canceltext}</h-button>
            <h-button id="btn-submit" type="primary">${x => x.oktext}</h -button>
        </div>
    </div>
</div>

`;
@customElement({
   name: 'h-dialog',
   template,
   styles
})
export class Dialog extends HIElement {

    @attr public canceltext!: string;
    private canceltextChanged(oldValue, newValue): void {
        this.canceltext = newValue;
        console.log(oldValue, newValue);
    }
    @attr public oktext!:string;
    private oktextChanged(oldValue, newValue): void {
        this.oktext = newValue;
        console.log(oldValue, newValue);
        
    }
    @attr open = false;

    
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
     connectedCallback() {
        super.connectedCallback()
        
       
    }

}


export default {
    alert: function()  {
        const dialog = new Dialog();
        document.body.appendChild(dialog);
        if( typeof arguments[0] === 'object' ){
            const { title, oktext, content, ok} = arguments[0];
            dialog.title = title||'Alert';
            dialog.canceltext = 'ert';
            dialog.oktext = oktext||'确 定';
            dialog.onsubmit = ok||null;
            dialog.innerHTML = content||'';
        }else{
            dialog.title = 'Alert';
            dialog.canceltext = 'ert';
            dialog.oktext = '确 定';
            dialog.innerHTML = arguments[0]||'';
            dialog.onsubmit = arguments[1]||null;
        }
        dialog.open = true;
    },
}
