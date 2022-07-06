/**
 * @const: TabsStyles
 * @version 0.0.1
 * @author by fico on 2022/07/01
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { css } from 'hi-element';
// display规则
import { display } from '../_utils/style';
// 配置文件
import { hiConfig } from "../config";
// 样式文件
export const TabsStyles = css`
${display("block")}
:host{
    text-align: unset;
}
.Tab {
    display:flex;
    flex-direction:column;
    height: 100%;
    overflow: hidden;
}
.TabNavWrap{
    position:relative;
    overflow:hidden;
    scroll-behavior: smooth;
}
.TabNav{
    display:flex;
}
.NavItem{
    font-size:inherit;
    border-radius:0;
    box-shadow:none;
    flex-shrink: 0;
    border-color:transparent;
}
:host(:not([type="line"])) .NavItem.active{
    color:var(--themeColor,#42b983);
}
.TabLine{
    position:absolute;
    width:0;
    margin-top:-2px;
    height:2px;
    border-radius:2px;
    background:var(--themeColor,#42b983);
    transition:.2s;
}
.TabContent{
    overflow:hidden;
    flex:1;
    transition:.2s;
}
.TabContentWrap{
    display:flex;
    width:100%;
    height:100%;
    transition:.2s;
}
:host([type="card"]) .TabLine,
:host([type="line"]) .TabLine{
    visibility:hidden;
}
:host([type="card"]) .NavItem{
    border-radius:.5em .5em 0 0;
}
:host([type="line"]) .NavItem{
    border-radius:var(--borderRadius,.25em) var(--borderRadius,.25em) 0 0;
}
:host([type="card"]) .NavItem.active,:host([type="card"]) .TabContent{
    background-color:#fff;
}
:host([type="line"]) .NavItem.active{
    border-color:var(--borderColor,rgba(0,0,0,.2)) var(--borderColor,rgba(0,0,0,.2)) transparent;
}
:host([type="line"]) .TabNavWrap{
    oveflow:hidden;
}
:host([type="line"]) .TabLine{
    transition:none;
}
:host([type="line"]) .TabLine::before,
:host([type="line"]) .TabLine::after{
    content:'';
    position:absolute;
    visibility:visible;
    width:9999px;
    height:1px;
    bottom:0;
    background:var(--borderColor,rgba(0,0,0,.2));
}
:host([type="line"]) .TabLine::before{
    right:100%;
}
:host([type="line"]) .TabLine::after{
    left:100%;
}
:host([type="card"]) .TabContentWrap,
:host([type="line"]) .TabContentWrap{
    transition:none;
}
:host([align="center"]) .TabNav{
    justify-content:center;
}
:host([align="end"]) .TabNav{
    justify-content:flex-end;
}
::slotted(h-tab){

    box-sizing:border-box;
    width:100%;
    height:100%;
    padding:10px;
    flex-shrink:0;
    overflow:auto;
}

`;
 

