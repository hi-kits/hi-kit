/**
 * @const: TipsStyles
 * @version 0.0.1
 * @author by fico on 2022/06/17
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { css } from 'hi-element';
// 配置文件
import { hiConfig, hiConfigStyle } from "@packages/config";
// 样式文件
export const NotifyStyles = css`
${hiConfigStyle()}
:host{
    box-sizing:border-box;
    display:inline-block;
    border:1px solid var(--borderColor);
    border-radius:var(--borderRadius);
    line-height: 1.8;
    transition:border-color .3s,box-shadow .3s;
    padding: .25em .625em;
    color: var(--fontColor);
    font-size: 14px;
}
:host(:focus-within){
    /*box-shadow: 0 0 10px rgba(0,0,0,0.1);*/
}
:host([block]){
    display:block
}
h-tips[show=show]{
    color:var(--errorColor);
}
:host([invalid]){
    --themeColor:var(--errorColor);
    border-color:var(--errorColor);
}
:host([invalid]) h-icon{
    color:var(--errorColor);
}
:host(:focus-within:not([disabled])),:host(:not([disabled]):hover){
    border-color:var(--themeColor);
}
:host([disabled]){ 
    opacity:.8;
    cursor:not-allowed; 
}
:host([disabled]) h-tips{
    pointer-events:none;
    background:rgba(0,0,0,.1);
}
:host([label]) .input::placeholder{
    color:transparent;
}
:host .input::placeholder{
    color:#999;
}
:host(h-textarea){
    line-height:1.5;
    padding-right:.25em;
}
h-tips{  
    display:flex;
    width: 100%;
    height: 100%;
    align-items:center;
    margin:-.25em -.625em;
    padding:.25em .625em;
    font-family:inherit;
    transition:.3s background-color;
}
:host(h-textarea) h-tips{
    margin-right:-.25em;
    padding-right:.25em;
    align-items:flex-start;
}
.input{
    padding: 0;
    text-align: inherit;
    color: currentColor;
    border: 0;
    outline: 0;
    line-height: inherit;
    font-size: inherit;
    font-family: inherit;
    flex: 1;
    min-width: 0;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    background: none;
    overflow-x: hidden;
    transition: color .3s;
    animation: removeBg 0s forwards;
}
:host(h-textarea) .input{
    margin:0;
}
input[type="number"]::-webkit-inner-spin-button{
    display:none;
}
::-moz-focus-inner,::-moz-focus-outer{
    border:0;
    outline : 0;
}
:host([showtips]){
    pointer-events:all;
}
.input-label{
    pointer-events:none;
    margin-left:-0.14em;
    position:absolute;
    transition: transform .3s, color .3s, background-color .3s;
    transform-origin: left;
    padding:0 0.14em;
    color:#999;
}
.input:not(:placeholder-shown) ~ .input-label,
.input:focus ~ .input-label{
    text-overflow: ellipsis;
    transform: translateY( calc( -50% - 0.43em ) ) scale(0.8);
    background: var(--colorWhite);
}
.input:focus{
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, .2);
    border-right-width: 1px;
    outline: 0
}
.input:-moz-ui-invalid{
    box-shadow:none;
}
.input::-ms-reveal{
    display:none;
}
.icon-pre{
    display:flex;
    margin-right:0.25em;
    color:#999;
}
:host(h-textarea) .icon-pre{
    height:1.5em;
}
.btn-right{
    width:2em;
    height:2em;
    margin:-.25em -.5em -.25em .25em;
    padding:0;
    color:#999;
    font-size:inherit;
}
.btn-number{
    display:flex;
    flex-direction:column;
    width:1.5em;
    visibility:hidden;
    transition:0s;
}
.btn-number h-button{
    display: flex;
    color: #999;
    border-radius:0;
    width:100%;
    flex:1;
    padding:0;
    font-size:.8em;
    transition:.2s;
}

.btn-number h-button:hover{
    flex:1.5;
}

h-button:not([disabled]):hover,h-button:not([disabled]):focus-within{
    color:var(--themeColor);
}

:host(:focus-within:not([disabled])) .icon-pre,
:host(:not([disabled]):hover) .icon-pre,
:host(:not([disabled]):hover) .input-label,
:host(:focus-within:not([disabled])) .input-label{
    color:var(--themeColor);
}

:host(:focus-within:not([disabled])) .btn-number,
:host(:not([disabled]):hover) .btn-number{
    visibility:visible;
}
@keyframes removeBg{
    to{
        background:transparent;
    }
}



`;
 

