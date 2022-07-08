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
}

:host .DotStyle li {
	position: relative;
	display: block;
	float: left;
	margin: 0 8px;
	width: 14px;
	height: 14px;
	cursor: pointer;
    border-radius: 50%;
    background-color: #9acd32;
	text-indent: -999em; /* make the text accessible to screen readers */
}
:host([size="small"]) .DotStyle li{
    width: 10px;
	height: 10px;
}
:host([size="large"]) .DotStyle li{
    width: 18px;
	height: 18px;
}
:host .DotStyle li::after {
    content: '';
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	outline: none;
	border-radius: 50%;
	cursor: pointer;
	position: absolute;
}

:host .DotStyle li:focus {
	outline: none;
}

/* Fill up */
:host .fillup li{
	overflow: hidden;
	background-color: transparent;
	box-shadow: inset 0 0 0 2px #42b983;
	-webkit-transition: background 0.3s ease;
	transition: background 0.3s ease;
}

:host .fillup li::after {
	bottom: 0;
	height: 0;
	width: 100%;
	background-color: #42b983;
	box-shadow: 0 0 1px #42b983;
	-webkit-transition: height 0.3s ease;
	transition: height 0.3s ease;
}

:host .fillup li:hover,
:host .fillup li:focus{
	background-color: rgba(0, 0, 0, 0.1);
}

:host .fillup li.current::after {
	height: 100%;
}

/* Scale up */

:host .scaleup li {
	-webkit-transition: -webkit-transform 0.3s ease, background-color 0.3s ease;
	transition: transform 0.3s ease, background-color 0.3s ease;
}

:host .scaleup li:hover,
:host .scaleup li:focus {
	background-color: rgb(112 153 29);
}

:host .scaleup li.current  {
	background-color: rgb(112 153 29);
	-webkit-transform: scale(1.5);
	transform: scale(1.5);
}

.puff li a {
	border: 2px solid #fff;
	-webkit-transition: border-color 0.3s ease;
	transition: border-color 0.3s ease;
}

.puff li::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	visibility: hidden;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 50%;
	box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
	opacity: 0;
	-webkit-transform: scale(3);
	transform: scale(3);
	-webkit-transition: opacity 0.3s ease, -webkit-transform 0.3s ease, visibility 0s 0.3s;
	transition: opacity 0.3s ease, transform 0.3s ease, visibility 0s 0.3s;
}

.puff li:hover,
.puff li:focus,
.puff li.current {
	border-color: rgba(0, 0, 0, 0.3);
}

.puff li.current::after {
	visibility: visible;
	opacity: 1;
	-webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: opacity 0.3s ease, -webkit-transform 0.3s ease;
	transition: opacity 0.3s ease, transform 0.3s ease;
}


`;
 

