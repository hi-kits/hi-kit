/**
 * @const: StepStyles
 * @version 0.0.1
 * @author by fico on 2022/06/30
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { css } from 'hi-element';
// 配置文件
import { hiConfig, hiConfigStyle } from "../config";
// 样式文件
export const StepStyles = css`
${hiConfigStyle()}
:host {
    position: relative;
    display: inline-block;
    flex: 1;
    overflow: hidden;
    vertical-align: top;
    white-space: nowrap;
    padding-left: 16px;
}

:host slot[name="icon"],
:host .Icon,
:host .IconBox,
:host .Content{
    display: inline-block;
    vertical-align: top;
}
:host .Content .Title{
    color: #999;
    position: relative;
    display: inline-block;
    padding-right: 16px;
    font-size: 16px;
    line-height: 32px;
}
:host .Content .Subtitle {
    color: #999;
    font-size: 14px;
}
:host .Content .Title:after {
    position: absolute;
    top: 16px;
    left: 100%;
    display: block;
    width: 9999px;
    height: 1px;
    background: rgba(0,0,0,.06);
    content: "";
}
:host .Content .Desc{
    color: #999999;
    max-width: 140px;
    white-space: normal;
}
:host .IconBox,
:host .Icon {
    width: 32px;
    height: 32px;
    margin: 0 8px 0 0;
    font-size: 16px;
    line-height: 32px;
    text-align: center;
}
:host .Icon {
    color: #b3b3b3;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 32px;
    transition: background-color .3s,border-color .3s;
}
:host .Icon svg {
    display: inline-block;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -0.125em;
}

:host([dot]) .IconBox *{
    display: none;
}
:host([dot]) .IconBox{
    position: relative;
    width: 8px;
    height: 8px;
    margin-top: 12px;
    padding-right: 0;
    line-height: 8px;
    background: transparent;
    border: 0;
}
:host([dot]) .IconBox:after{
    display: block;
    position: absolute;
    content: "";
    float: left;
    width: 100%;
    height: 100%;
    border-radius: 100px;
    transition: all .3s;
    background: var(--themeColor, #42b983);
} 
:host([dot][dir="vertical"]) .Tail {
    left: 4px;
    padding: 30px 0px 0px;
}



:host([status]) .Title,
:host([status="process"]) .Desc {
    color: #333;
}


:host([status="finish"]) .Icon{
    color: var(--themeColor, #42b983);
    background-color: var(--colorWhite, #fff);
    border-color: var(--borderColor, #1890ff);
}
:host([status="finish"]) .Title:after,
:host([status="finish"][dir="vertical"]) .Tail:after{
    background: var(--themeColor, #42b983);
}
:host([status="process"]) .Icon{
    color: #fff;
    background-color: var(--themeColor, #42b983);
}
:host([status="error"]) .Icon{
    color: var(--themeColor, #42b983);
    background-color: #ff4d4f;
    border-color: var(--borderColor, #ff4d4f);
}
:host([status="error"]) .Content,
:host([status="error"]) .Icon{
    color: var(--themeColor, #42b983);
}
:host([size="small"]) {
    padding-left: 12px;
}

:host([size="small"]) .Title {
    padding-right: 12px;
    font-size: 14px;
    line-height: 24px;
}
:host([size="small"]) .IconBox,
:host([size="small"]) .Icon{
    width: 22px;
    height: 22px;
    margin: 0 8px 0 0;
    font-size: 12px;
    line-height: 22px;
    text-align: center;
    border-radius: 24px;
}
:host([first]) {
    padding-left: 0;
}
:host([last]) {
    flex: none;
}



:host([dir="vertical"]) .Title:after {
    display: none;
}
:host([dir="vertical"]) {
    display: block;
    flex: 1 0 auto;
    padding-left: 0;
    min-height: 48px;
    margin-bottom: 6px;
}
:host([dir="vertical"]) .Tail {
    display: block;
    position: absolute;
    top: 0;
    left: 16px;
    width: 1px;
    height: 100%;
    padding: 38px 0 6px;
}
:host([dir="vertical"]) .Tail:after{
    display: inline-block;
    background: rgba(0,0,0,.06);
    border-radius: 1px;
    transition: background .3s;
    content: "";
    width: 1px;
    height: 100%;
}
:host([dir="vertical"][size="small"]) .Tail{
    position: absolute;
    top: 0;
    left: 12px;
    padding: 30px 0 6px;
}



:host([size="small"]) .Desc,
:host([size="small"]) .Subtitle,
:host([status="finish"]) .Number,
:host .Tail,
:host([last]) .Tail,
:host([last]) .Content .Title:after{
    display: none;
}
`;
 

