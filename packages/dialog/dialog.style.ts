/**
 * DialogStyles
 * @const: DialogStyles
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { css } from 'hi-element';
import { hiConfig } from "../config";

export const DialogStyles = css`

:host{
        position:fixed;
        display:flex;
        left:0;
        top:0;
        right:0;
        bottom:0;
        z-index:-1;
        background:rgba(0,0,0,.3);
        visibility:hidden;
        opacity:0;
        /*backdrop-filter: blur(3px);*/
        transition:.3s;
    }
    :host([open]){
        opacity:1;
        z-index:50;
        visibility:visible;
    }
    .dialog {
        display:flex;
        position:relative;
        min-width: 360px;
        margin:auto;
        box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
        box-sizing: border-box;
        max-width: calc(100vw - 20px);
        max-height: calc(100vh - 20px);
        border-radius: 3px;
        background-color: #fff;
        opacity:0;
        transform:scale(0.5);
        transition:.3s cubic-bezier(.645, .045, .355, 1);
    }
    .dialog-content{
        box-sizing: border-box;
        display:flex;
        width: 100%;
        padding:0 20px;
        flex:1;
        flex-direction:column;
    }
    :host([open]) .dialog{
        opacity:1;
        transform:scale(1);
    }
    .dialog-title {
        line-height: 30px;
        padding: 15px 30px 0 0;
        font-weight: 700;
        font-size: 14px;
        color: #4c5161;
        user-select: none;
        cursor: default;
    }
    .dialog-body {
        flex: 1;
        overflow: auto;
        min-height: 50px;
        padding: 10px 0;
    }
    .dialog-footer {
        padding: 3px 0 20px 0;
        margin-top: -3px;
        text-align: right;
    }
    .btn-close{
        position:absolute;
        right:10px;
        top:10px;
        border:0;
    }
    .dialog-footer xy-button {
        margin-left:10px;
    }
    .dialog-type{
        display:none;
        margin: 15px -10px 0 20px;
        width:30px;
        height:30px;
        font-size:24px;
    }
    .dialog-type[name]{
        display:flex;
    }
    #btn-cancel{
        visibility:hidden;
    }
    :host(:not([type])) .dialog-type,
    :host([type="prompt"]) .dialog-type{
        display:none;
    }
    :host([type="confirm"]) #btn-cancel,
    :host([type="prompt"]) #btn-cancel{
        visibility:visible;
    }
    xy-input{
        width:100%;
    }
    :host(:not(:empty)) xy-input{
        margin-top:10px;
    }
    :host(:empty) .dialog-body{
        min-height:0;
    }

`;
 

