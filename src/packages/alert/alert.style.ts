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
import { hiConfig } from "../config";
// 样式文件
export const TipsStyles = css`

:host {
    box-sizing: border-box;
    margin: 0;
    color: rgb(0 0 0 / 85%);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: "tnum","tnum";
    position: relative;
    display: flex;
    align-items: center;
    padding: 8px 15px;
    word-wrap: break-word;
    border-radius: 2px;
}
:host .Slot {
    flex: 1;
    min-width: 0;
}
:host .Slot .Title {
    display: block;
    margin-bottom: 4px;
    color: rgb(0 0 0 / 85%);
    font-size: 16px;
}
:host([type="success"]) {
    background-color: #f6ffed;
    border: 1px solid #b7eb8f;
}
:host([type="info"]) {
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
}
:host([type="warning"]) {
    background-color: #fffbe6;
    border: 1px solid #ffe58f;
}
:host([type="error"]) {
    background-color: #fff2f0;
    border: 1px solid #ffccc7;
}


`;
 

