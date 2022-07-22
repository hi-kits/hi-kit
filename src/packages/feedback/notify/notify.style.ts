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

:host .Notify{
    position: relative;
    pointer-events:all;
    width: 270px;
    overflow: hidden;  
    font-size: 0.875rem;
    background: var(--colorWhite);
    background-clip: padding-box;
    border: 1px solid var(--colorNeutral05);
    border-radius: var(--borderRadius);
    box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
    overflow: hidden;
    transition: 0.3s opacity;
    margin-bottom: 12px;
    opacity: 1;
}
:host .Notify .Header {
    position: relative;
    padding: 0.5rem 2.25rem 0.5rem 1rem;
    background-color: var(--colorNeutral02);
    border-bottom: 1px solid var(--colorNeutral05);
}
:host(:not([show])) {
    opacity: 0;
    display: none;
}

:host .Notify .Body {
    padding: 1rem;
}
:host .Notify .Close {
    content: "";
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    width: 0.875em;
    height: 0.875em;
    background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e") center/0.875em auto no-repeat;
    border: 0;
    opacity: 0.5;
    cursor: pointer;
    transition: opacity 0.1s ease-in-out;
}
:host .Notify .Close:hover {
    opacity: 1;
}

`;
 

