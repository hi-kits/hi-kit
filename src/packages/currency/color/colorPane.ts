/**
 * @class: HiColorPane
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, slotted,  html } from 'hi-element';
import { ColorPaneStyles as styles } from "./colorPane.style";

const Material_colors = ['#f44336','#E91E63','#9C27B0','#673AB7','#3F51B5','#2196F3','#03A9F4','#00BCD4','#009688','#4CAF50','#8BC34A','#CDDC39','#FFEB3B','#FFC107','#FF9800','#FF5722','#795548','#9E9E9E','#607D8B','rgba(0,0,0,.65)','transparent']


const template = html<HiColorPane>`
    
<div class="color-pane" id="color-pane">
            <div class="color-palette" id="color-palette"></div>
            <div class="color-chooser">
                <a class="color-show" id="copy-btn"><svg class="icon-file" viewBox="0 0 1024 1024"><path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32z"></path><path d="M704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path></svg><input></a>
                <div class="color-range">
                    <input class="color-hue" value="0" min="0" max="360" type="range" id="range-hue">
                    <input class="color-opacity" value="1" min="0" max="1" step="0.01" type="range" id="range-opacity">
                </div>
            </div>
            <div class="color-footer" data-type="HEXA">
                <div class="color-input">
                    <div class="color-label" id="color-hexa">
                        <input spellcheck="false" />
                    </div>
                    <div class="color-label" id="color-rgba">
                        <input type="number" min="0" max="255" spellcheck="false" />
                        <input type="number" min="0" max="255" spellcheck="false" />
                        <input type="number" min="0" max="255" spellcheck="false" />
                        <input type="number" min="0" max="1" step="0.01" spellcheck="false" />
                    </div>
                    <div class="color-label" id="color-hlsa">
                        <input type="number" min="0" max="360" spellcheck="false" />
                        <input type="number" min="0" max="100" spellcheck="false" />
                        <input type="number" min="0" max="100" spellcheck="false" />
                        <input type="number" min="0" max="1" step="0.01" spellcheck="false" />
                    </div>
                </div>
                <button class="btn-switch" id="btn-switch" type="flat">HEXA</button>
            </div>
            <div class="color-sign" id="colors">
                ${
                    Material_colors.map(el=>'<button style="background-color:'+el+'" data-color='+el+'></button>').join('')
                }
            </div>
        </div>

 `;
@customElement({
   name: 'h-colorPane',
   template,
   styles
})
export class HiColorPane extends HIElement {


    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback() {
        
        
    }

    mousemove = (ev) => {

    }

    mouseup = () => {

    }







}
