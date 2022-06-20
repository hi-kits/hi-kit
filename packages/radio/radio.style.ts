/**
 * @const: PaginationStyles
 * @version 0.0.1
 * @author by fico on 2022/06/17
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { css } from 'hi-element';
import { hiConfig } from "../config";

export const RadioStyles = css`

:host{ 
    display:inline-block;
    font-size:14px;
    color:var(--fontColor,#333);
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
#radio{
    position:absolute;
    clip:rect(0,0,0,0);
}
:host(:focus-within) .cheked,:host(:not([disabled])) label:hover .cheked{ 
    border-color:var(--themeColor,#42b983);
    /*box-shadow: 0 0 10px rgba(0,0,0,0.1);*/
    z-index:1;
}
:host([disabled]) .cheked{ 
    background:rgba(0,0,0,.1);
}
label{
    box-sizing:border-box;
    cursor:pointer;
    display:flex;
    align-items:center;
    outline:0;
}
.cheked{
    position:relative;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    display: flex;
    border-radius:50%;
    border: 1px solid var(--borderColor,rgba(0,0,0,.2));
    transition:.3s;
    margin-right:.5em;
}
:host(:empty) .cheked{
    margin-right:0;
}
.cheked::before{
    content:'';
    width:8px;
    height:8px;
    margin:auto;
    border-radius:50%;
    background:var(--themeColor,#42b983);
    transform: scale(0);
    transition: .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
}
.cheked::after{
    position:absolute;
    content:'';
    width:100%;
    height:100%;
    background:var(--themeColor,#42b983);
    border-radius:50%;
    opacity:.2;
    transform:scale(0);
    z-index:-1;
    transition: .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
}
/*
:host(:focus-within) .cheked::after,:host(:not([disabled]):active) .cheked::after{ 
    transform:scale(2.5);
}
*/
#radio:focus-visible+label .cheked::after{
    transform:scale(2.5);
}
#radio:checked+label .cheked::before{
    transform: scale(1);
}
#radio:checked+label .cheked{
    border-color:var(--themeColor,#42b983);
}

`;
 
