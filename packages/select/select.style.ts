/**
 * @const: SelectStyles
 * @version 0.0.1
 * @author by fico on 2022/06/17
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { css } from 'hi-element';
import { hiConfig } from "../config";

export const SelectStyles = css`

:host{
    display:inline-block;
    font-size: 14px;
    border-radius: var(--borderRadius,.25em);
}
:host([block]){
    display:block;
}

:host(:not([disabled]):not([type="primary"]):focus-within) #select,
:host(:not([disabled]):not([type="primary"]):hover) #select{
    border-color:var(--themeColor,#42b983);
    color:var(--themeColor,#42b983);
}

:host([search]:focus-within:not([disabled])) #select, 
:host([search]:not([disabled]):hover) #select{
    color: var(--themeColor,#42b983);
}

:host([disabled]){
    pointer-events:none;
}

:host(:focus-within) xy-popover,:host(:active) xy-popover{ 
    z-index: 2;
}
xy-tips{
    display:block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
}

#select:not([type="primary"]){
    display:flex;
    width:100%;
    height:100%;
    font-size: inherit;
    color: currentColor;
    border-radius: inherit;
}
:host([search]) #select{
    color:currentColor;
}

xy-tips[show=show]{
    --themeColor:var(--errorColor,#f4615c);
    --borderColor:var(--errorColor,#f4615c);
}
:host([invalid]) #select:not([type="primary"]){
    color:var(--errorColor,#f4615c);
}

#select span{
    flex:1;
    text-align:left;
}

xy-input::after{
    content:'';
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    cursor:default;
    pointer-events:none;
}
#select[readonly]::after{
    pointer-events:all;
}
.arrow{
    position:relative;
    font-size:.9em;
    transform:scaleY(.8);
    margin-left:.5em;
    pointer-events:none;
    width:1em;
    height:1em;
    fill:currentColor;
    transition:.3s transform cubic-bezier(.645, .045, .355, 1);
}
:host([search]) .arrow{
    transition:color .3s  cubic-bezier(.645, .045, .355, 1),.3s transform cubic-bezier(.645, .045, .355, 1);
}
xy-popover[open] .arrow{
    transform:scaleY(-.8);
}
xy-popover{
    display:block;
    height:inherit;
    border-radius: inherit;
}
xy-popcon{
    min-width:100%;
    overflow:auto;
    max-height:50vh;
    scroll-behavior: smooth;
}
:host([search]) xy-popcon::before{
    display:none;
    box-sizing: border-box;
    width:100%;
    content:'没有匹配到任何选项';
    padding: .25em .625em;
    line-height: 1.8;
    color:var(--fontColor,#333);
    white-space:nowrap;
    opacity:.5;
}
:host([empty]) xy-popcon::before{
    display:block;
}

`;
 

