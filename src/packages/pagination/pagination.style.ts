/**
 * @const: PaginationStyles
 * @version 0.0.1
 * @author by fico on 2022/06/17
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { css } from 'hi-element';
// 配置文件
import { hiConfig, hiConfigStyle } from "../config";
// 样式
export const PaginationStyles = css`
${hiConfigStyle()}
:host {
    display:flex;
    font-size:14px;
}
h-button {
    margin: 0 .3em;
    width: 2.3em;
    min-width: 2.3em;
    height: 2.3em;
    padding: 1px;
    font-size: inherit;
    box-sizing: content-box;
}
.simple-page{
    width:auto;
    padding:0 .625em;
}
h-button[tabindex]{
    justify-content: center;
    align-items: center;
    pointer-events: none;
}
.page-ellipsis h-icon{
    margin:auto;
}
h-button[current] {
    background: var(--themeColor, #42b983);
    border-color: var(--borderColor,#42b983);
    color:#fff;
}
.page{
    display:inline-flex;
    align-items: center;
}
.icon{
    width:1em;
    height:1em;
    fill: currentColor;
}
:host([size="small"]) {
    font-size: 12px;
}
:host([size="large"]) {
    font-size: 18px;
}
`;
 

