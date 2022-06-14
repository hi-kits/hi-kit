/**
 * EditWord
 * @class: EditWord
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, html } from 'hi-element';
import { EditWordStyles as styles } from "./editWord.style";

const template = html<EditWord>`

<form style="display: none;">
    <input required="required" style="width: 41px;">
</form>
<span style="display: inline-block;">33ee</span>

`;
@customElement({
   name: 'h-edit-word',
   template,
   styles
})
export class EditWord extends HIElement {

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
        this.shadowRoot!.addEventListener('click',(ev)=>{
            this.checked = this.checked;
            // span.style.display = 'none';
            // form.style.display = 'inline-block';
            // input.focus();
            // input.setSelectionRange(0, input.value.length)
        })

    }


}

