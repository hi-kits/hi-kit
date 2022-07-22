/**
 * CheckboxStyles
 * @const: CheckboxStyles
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { css } from 'hi-element';
// 样式助手
import { display } from '@utils/style';
// 样式
export const CheckboxStyles = css`
${display("inline-block")}
:host{ 
    font-size:14px;
    color:var(--fontColor);
    -webkit-tap-highlight-color: transparent;
}
:host([disabled]){ 
    pointer-events: none; 
    opacity:.6; 
}
:host([disabled]) label{ 
    pointer-events: all;  
    cursor: not-allowed; 
}
#checkbox{
    position:absolute;
    clip:rect(0,0,0,0);
}
:host(:focus-within) .cheked,
:host(:not([disabled])) label:hover .cheked{ 
    border-color:var(--themeColor);
    /*box-shadow: 0 0 10px rgba(0,0,0,0.1);*/
    z-index:1;
}
:host(:focus-within) #checkbox,
:host(:active) #checkbox{
    z-index:2
}
:host([disabled]) .cheked{ 
    background:rgba(0,0,0,.1);
}
label{
    box-sizing:border-box;
    cursor:pointer;
    display:flex;
    align-items:center;
}
h-tips{
    display:block;
    padding-left: 0.575em;
    margin-left: -0.575em;
}
h-tips[show=show]{
    --themeColor:var(--errorColor);
    --borderColor:var(--errorColor);
}
.cheked{
    display:flex;
    justify-content: center;
    align-items: center;
    margin-right:.5em;
    position:relative;
    width: 1em;
    height: 1em;
    border: 0.0875em solid var(--borderColor);
    border-radius: 0.15em;
    text-align: initial;
    transition:.3s;
}
:host(:empty) .cheked{
    margin-right:0;
}
.cheked::before{
    position:absolute;
    content:'';
    width:74%;
    height:0.15em;
    background: var(--colorWhite);
    transform:scale(0);
    border-radius: 0.15em;
    transition: .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
}
.cheked::after{
    position:absolute;
    content:'';
    width:100%;
    height:100%;
    background:var(--themeColor);
    border-radius:50%;
    opacity:.2;
    transform:scale(0);
    z-index:-1;
    transition: .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
}
/*
:host(:focus-within) .cheked::after,
:host(:active:not([disabled])) .cheked::after{ 
    transform:scale(2.5);
}
*/
.icon{
    width: 100%;
    height: 100%;
    transform: scale(0);
    transition: .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
}
#checkbox:focus-visible+label .cheked::after{
    transform:scale(2.5);
}
#checkbox:checked:not(:indeterminate)+label .cheked .icon{
    transform: scale(1.5);
}
#checkbox:checked+label .cheked,
#checkbox:indeterminate+label .cheked{
    border-color:transparent;
    background-color:var(--themeColor);
}
#checkbox:indeterminate+label .cheked::before{
    transform:scale(1);
}
 `;
  
 
 