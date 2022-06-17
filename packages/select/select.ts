/**
 * @class: HiSelect
 * @version 0.0.1
 * @author by fico on 2022/06/17
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, html, attr } from 'hi-element';
import { SelectStyles as styles } from "./select.style";

const template = html<HiSelect>`


`;
@customElement({
   name: 'h-select',
   template,
   styles
})
export class HiSelect extends HIElement {
    // ------------------ 构造函数 ------------------
    constructor(
    ) {
        super();
    }
    // ------------------ 参数 ------------------
    
    // ------------------ 属性 ------------------
    

    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
       
        
    }
    
    

}


