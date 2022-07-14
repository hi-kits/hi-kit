/**
 * @const: SelectStyles
 * @version 0.0.1
 * @author by fico on 2022/06/17
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { css } from 'hi-element';
// 配置文件
import { hiConfig, hiConfigStyle } from "../config";
// 样式文件
export const SelectStyles = css`
${hiConfigStyle()}
:host{
    display:inline-block;
    font-size: 14px;
    border-radius: var(--borderRadius);
}
:host([block]){
    display:block;
}

:host(:not([disabled]):not([type="primary"]):focus-within) #select,
:host(:not([disabled]):not([type="primary"]):hover) #select{
    border-color: var(--borderColor);
    color:var(--themeColor);
}

:host([search]:focus-within:not([disabled])) #select, 
:host([search]:not([disabled]):hover) #select{
    color: var(--themeColor);
}

:host([disabled]){
    pointer-events:none;
}

:host(:focus-within) h-popover,:host(:active) h-popover{ 
    z-index: 2;
}
h-tips{
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

h-tips[show=show]{
    --themeColor:var(--errorColor);
    --borderColor:var(--errorColor);
}
:host([invalid]) #select:not([type="primary"]){
    color:var(--errorColor);
}

#select span{
    flex:1;
    text-align:left;
}

h-input::after{
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
h-popover[open] .arrow{
    transform:scaleY(-.8);
}
h-popover{
    display:block;
    height:inherit;
    border-radius: inherit;
}
h-popcon{
    min-width:100%;
    overflow:auto;
    max-height:50vh;
    scroll-behavior: smooth;
}
:host([search]) h-popcon::before{
    display:none;
    box-sizing: border-box;
    width:100%;
    content:'没有匹配到任何选项';
    padding: .25em .625em;
    line-height: 1.8;
    color:var(--fontColor);
    white-space:nowrap;
    opacity:.5;
}
:host([empty]) h-popcon::before{
    display:block;
}

`;
 

