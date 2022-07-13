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
import { hiConfig, hiConfigStyle } from "../config";
// 样式文件
export const NotifyStyles = css`
${hiConfigStyle()}
:host {
    position: fixed;
    bottom: 1em;
    right: 1em;
    z-index: 490;
    cursor: pointer;
    width: 45px;
    height: 45px;
}



`;
 

