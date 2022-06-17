/**
 * ButtonStyles
 * @const: ButtonStyles
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { css } from 'hi-element';
import { hiConfig } from "../config";

export const ButtonStyles = css`

    :host{ 
        position:relative; 
        display:inline-flex; 
        padding: .25em .625em;
        box-sizing:border-box; 
        vertical-align: middle;
        line-height: 1.8;
        min-width: 60px;
        min-height: 24px;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        text-decoration: none;

        overflow:hidden; 
        align-items:center;
        justify-content: center;
        border:1px solid ${hiConfig.borderColor}; 
        font-size: 14px; 
        color: ${hiConfig.color};  
        border-radius: ${hiConfig.borderRadius}; 
        transition:background .3s,box-shadow .3s,border-color .3s,color .3s;
    }
    :host([shape="circle"]){ 
        border-radius:50%; 
    }
    /*
    :host(:not([disabled]):active){
        z-index:1;
        transform:translateY(.1em);
    }
    */
    :host([disabled]),:host([loading]){
        pointer-events: none; 
        opacity:.6; 
    }
    :host([block]){ 
        display:flex; 
    }
    :host([disabled]:not([type])){ 
        background:rgba(0,0,0,.1); 
    }
    :host([disabled]) .btn,:host([loading]) .btn{ 
        cursor: not-allowed; 
        pointer-events: all; 
    }
    :host(:not([type="primary"]):not([type="danger"]):not([disabled]):hover),
    :host(:not([type="primary"]):not([type="danger"]):focus-within),
    :host([type="flat"][focus]){ 
        color:var(--themeColor,#42b983); 
        border-color: var(--themeColor,#42b983); 
    }
    :host(:not([type="primary"]):not([type="danger"])) .btn::after{ 
        background-image: radial-gradient(circle, var(--themeColor,#42b983) 10%, transparent 10.01%); 
    }
    :host([type="primary"]){ 
        color: #fff; 
        background:var(--themeBackground,var(--themeColor,#42b983));
    }
    :host([type="danger"]){ 
        color: #fff; 
        background:var(--themeBackground,var(--dangerColor,#ff7875));
    }
    :host([type="dashed"]){ 
        border-style:dashed 
    }
    :host([type="flat"]),:host([type="primary"]),:host([type="danger"]){ 
        border:0;
        padding: calc( .25em + 1px ) calc( .625em + 1px );
    }
    :host([type="flat"]) .btn::before{ 
        content:''; 
        position:absolute; 
        background:var(--themeColor,#42b983);
        pointer-events:none; 
        left:0; 
        right:0; 
        top:0; 
        bottom:0; 
        opacity:0; 
        transition:.3s;
    }
    :host([type="flat"]:not([disabled]):hover) .btn::before{ 
        opacity:.1 
    }
    :host(:not([disabled]):hover){ 
        z-index:1 
    }
    :host([type="flat"]:focus-within) .btn:before,
    :host([type="flat"][focus]) .btn:before{ 
        opacity:.2; 
    }
    :host(:focus-within){ 
        /*box-shadow: 0 0 10px rgba(0,0,0,0.1);*/ 
    }
    .btn{ 
        background:none; 
        outline:0; 
        border:0; 
        position: 
        absolute; 
        left:0; 
        top:0;
        width:100%;
        height:100%;
        padding:0;
        user-select: none;
        cursor: unset;
    }
    xy-loading{ 
        margin-right: 0.35em;  
    }
    ::-moz-focus-inner{
        border:0;
    }
    .btn::before{
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        left:0;
        top:0;
        transition:.2s;
        background:#fff;
        opacity:0;
    }
    :host(:not([disabled]):active) .btn::before{ 
        opacity:.2;
    }
    .btn::after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        left: var(--x,0); 
        top: var(--y,0);
        pointer-events: none;
        background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
        background-repeat: no-repeat;
        background-position: 50%;
        transform: translate(-50%,-50%) scale(10);
        opacity: 0;
        transition: transform .3s, opacity .8s;
    }
    .btn:not([disabled]):active::after {
        transform: translate(-50%,-50%) scale(0);
        opacity: .3;
        transition: 0s;
    }
    xy-icon{
        margin-right: 0.35em;
        transition: none;
    }
    :host(:empty) xy-icon{
        margin: auto;
    }
    :host(:empty){
        padding: .65em;
    }
    :host([type="flat"]:empty),:host([type="primary"]:empty){ 
        padding: calc( .65em + 1px );
    }
    ::slotted(xy-icon){
        transition: none;
    }
    :host([href]){
        cursor:pointer;
    }
`;
 

