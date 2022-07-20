/**
 * @const: AccordionStyles
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { css } from 'hi-element';
// 样式助手
import { display } from '../../../utils/style';
// 配置文件
import { hiConfigStyle } from "../../config";
// 样式文件
export const AccordionStyles = css`
${hiConfigStyle()}
${display("inline-block")}
details {font-family: "Open Sans Light",Helvetica,Arial}
.name {font-weight: bold; color: #217ac0; font-size: 120%}
h4 { margin: 10px 0 -8px 0; }
h4 span { background: #217ac0; padding: 2px 6px 2px 6px }
h4 span { border: 1px solid #cee9f9; border-radius: 4px }
h4 span { color: white }
.attributes { margin-left: 22px; font-size: 90% }
.attributes p { margin-left: 16px; font-style: italic }

`;
 

