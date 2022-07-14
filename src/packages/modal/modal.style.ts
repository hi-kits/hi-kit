/**
 * @const: ModalStyles
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { css } from 'hi-element';
// display规则
import { display } from '../../utils/style/display';
// 配置文件
import { hiConfig, hiConfigStyle } from "../config";
// 样式
export const ModalStyles = css`
${hiConfigStyle()}
${display("flex")}
:host{
    position:fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    z-index:-1;
    background:  var(--colorNeutral3);
    visibility:hidden;
    opacity:0;
    /* backdrop-filter: blur(3px); 
    -webkit-backdrop-filter: blur(3px);*/
    transition:.3s;
}
:host([open]){
    opacity:1;
    z-index:50;
    visibility:visible;
}
.Modal {
    display:flex;
    position:relative;
    min-width: 320px;
    margin:auto;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
    max-width: 80vw;
    max-height: calc(100vh - 20px);
    border-radius: var(--borderRadius);
    background-color: var(--colorWhite);
    opacity:0;
    transform:scale(0.5);
    transition:.3s cubic-bezier(.645, .045, .355, 1);
}
.ModalContent{
    box-sizing: border-box;
    display:flex;
    width: 100%;
    padding:0 20px;
    flex:1;
    flex-direction:column;
}
:host([open]) .Modal{
    opacity:1;
    transform:scale(1);
}
.ModalTitle {
    line-height: 30px;
    padding: 15px 30px 0 0;
    font-weight: 700;
    font-size: 14px;
    color:  #4c5161;
    user-select: none;
    cursor: default;
}
.ModalBody {
    flex: 1;
    overflow: auto;
    min-height: 50px;
    padding: 10px 0;
}
.ModalFooter {
    padding: 3px 0 20px 0;
    margin-top: -3px;
    text-align: right;
}
.ModalClose{
    position:absolute;
    right:10px;
    top:10px;
    border:0;
}
.ModalFooter h-button {
    margin-left:10px;
}

.ModalCancel{
    visibility:hidden;
}

:host([type="confirm"]) .ModalCancel,
:host([type="prompt"]) .ModalCancel{
    visibility:visible;
}
h-input{
    width:100%;
}
:host(:not(:empty)) h-input{
    margin-top:10px;
}
:host(:empty) .dialog-body{
    min-height:0;
}

`;
 

