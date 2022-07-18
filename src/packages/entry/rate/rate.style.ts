/**
 * @const: SwitchStyles
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { css } from 'hi-element';
// display规则
import { display } from '../../../utils/style';
// 配置文件
import { hiConfigStyle } from '../../config';
// 样式文件
export const RateStyles = css`
${display("inline-block")}
${hiConfigStyle()}
:host{
    font-size: 20px;
    direction:rtl;
    color:#eee;
}
label{
    cursor: pointer;
    display: block;
    line-height: 0;
    -webkit-tap-highlight-color: transparent;
}
input[type="radio"]{
    position: absolute;
    clip: rect(0,0,0,0)
}
input[type="radio"]:checked ~ .star-item{
    color:var(--themeColor);
}
.star-item:hover h-icon{
    transform:scale(1.2)
}
:host(:not([disabled]):hover) h-tips.star-item{
    color:inherit;
}
:host(:not([disabled])) h-tips.star-item:hover,
:host(:not([disabled])) h-tips.star-item:hover~.star-item{
   color:var(--themeColor);
}
:host([disabled]) input[type="radio"]{
    visibility:hidden;
}
:host([disabled]) label{
    pointer-events: none; 
}

`;
 

