/**
 * button
 * @class: HButton
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, slotted,  html } from '@ele/index';
import { buttonStyles as styles } from "./colorPicker.style";



const template = html<ColorPicker>`
    
<h-popover id="popover" >
<h-button class="color-btn" id="color-btn"></h-button>
<h-popcon id="popcon">
    <div class="pop-footer">
        <h-button autoclose>取 消</h-button>
        <h-button type="primary" id="btn-submit" autoclose>确 认</h-button>
    </div>
</h-popcon>
</h-popover>

 `;
@customElement({
   name: 'h-message',
   template,
   styles
})
export class ColorPicker extends HIElement {



    /**
     * 显示状态
     * @public
     * @remarks
     */
    private _show!: boolean;
    get show(): boolean {
        return this._show;
    }
    set show(value: boolean) {
        this._show = value;
        if(value===null||value===false){
            this.removeAttribute('show');
        }else{
            this.setAttribute('show', '');
        }
    }
    


    connectedCallback() {
        super.connectedCallback();
    }



}

