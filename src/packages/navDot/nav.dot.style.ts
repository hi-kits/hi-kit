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
export const NavDotStyles = css`

:host .DotStyle{
	position: relative;
	display: inline-block;
	margin: 0;
	padding: 0;
	list-style: none;
	cursor: default;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

:host .DotStyle li {
	position: relative;
	display: block;
	float: left;
	margin: 0 8px;
	width: 12px;
	height: 12px;
	cursor: pointer;
    border-radius: 50%;
	text-indent: -999em; /* make the text accessible to screen readers */
}

:host .DotStyle li::after {
    content: '';
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	outline: none;
	border-radius: 50%;
	background-color: #42b983;
	background-color: rgba(255, 255, 255, 0.3);
	cursor: pointer;
	position: absolute;
}

:host .DotStyle li:focus {
	outline: none;
}

:host .Fillup li{
	overflow: hidden;
	background-color: transparent;
	box-shadow: inset 0 0 0 2px #42b983;
	-webkit-transition: background 0.3s ease;
	transition: background 0.3s ease;
}

:host .Fillup li::after {
	content: '';
	position: absolute;
	bottom: 0;
	height: 0;
	left: 0;
	width: 100%;
	background-color: #42b983;
	box-shadow: 0 0 1px #42b983;
	-webkit-transition: height 0.3s ease;
	transition: height 0.3s ease;
}

:host .Fillup li:hover,
:host .Fillup li:focus{
	background-color: rgba(0, 0, 0, 0.1);
}

:host .Fillup li.current::after {
	height: 100%;
}


`;
 

