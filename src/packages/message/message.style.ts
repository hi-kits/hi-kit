/**
 * @const: MessageStyles
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { css } from 'hi-element';
// 配置文件
import { hiConfig, hiConfigStyle } from "../config";
// 样式
export const MessageStyles = css`
${hiConfigStyle()}
:host{
    display:flex;
    visibility:hidden;
    opacity:0;
    transition:.3s;
    z-index:10;
}
:host([show]){
    opacity:1;
    visibility:visible;
}
.message{
    margin:auto;
    display:flex;
    padding:10px 15px;
    margin-top:10px;
    align-items:center;
    font-size: 14px;
    color: #666;
    background: var(--colorWhite);
    border-radius: var(--borderRadius);
    transform: translateY(-100%);
    transition:.3s transform cubic-bezier(.645, .045, .355, 1);
    box-shadow: 0 4px 12px var(--colorNeutral1);
    pointer-events:all;
}
:host([show]) .message{
    transform: translateY(0);
}

.message>*{
    margin-right:5px;
}



:host h-icon{
    font-size: 16px;
    color:var(--themeColor);
}
`;
 

