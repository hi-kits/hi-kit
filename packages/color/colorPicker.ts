/**
 * ColorPicker
 * @class: ColorPicker
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, slotted,  html } from 'hi-element';
import { ColorPickerStyles as styles } from "./colorPicker.style";



const template = html<ColorPicker>`
    <div class="pop-footer">
        
        
    </div>
`;
@customElement({
   name: 'h-colorPicker',
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
HIElement.define(ColorPicker)
