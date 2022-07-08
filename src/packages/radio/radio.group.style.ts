/**
 * @const: PaginationStyles
 * @version 0.0.1
 * @author by fico on 2022/06/17
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { css } from 'hi-element';
// 配置文件
import { hiConfig } from "../config";
// 样式
export const RadioGroupStyles = css`

:host {
    display:inline-block;
}
:host(:focus-within) h-tips,
:host(:hover) h-tips{
    z-index:2;
}
:host([disabled]){ 
    pointer-events: none; 
}
:host([disabled]) h-tips{
    pointer-events: all;
    cursor: not-allowed;
    outline: 0;
}
::slotted(h-radio){
    transition: opacity .3s;
}
:host([disabled]) ::slotted(h-radio){
    pointer-events: none;
    opacity:.6;
}
h-tips[show=show]{
    --themeColor:var(--errorColor,#f4615c);
    --borderColor:var(--errorColor,#f4615c);
}

`;
 

