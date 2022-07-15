/**
 * ShortStyles
 * @const: ShortStyles
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { css } from 'hi-element';
// display规则
import { display } from '../../../utils/style/display';
// 配置文件
import { hiConfig, hiConfigStyle } from "../../config";
// 样式文件
export const ShortStyles = css`
${hiConfigStyle()}
${display("inline-block")}
:host{
    font-size:12px;
    font-weight:400;
    color: rgb(0 0 0 / 85%);
    border: 1px solid #d9d9d9;
    border-radius: var(--borderRadius);
    padding:2px 8px;
    vertical-align:middle;
    background-color: var(--colorGray1);
    border-color: var(--borderColor);
}
:host([noBorder]){
    border: 0;
}

`;
 

