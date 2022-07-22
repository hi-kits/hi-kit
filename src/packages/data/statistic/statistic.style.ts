/**
 * @const: StatisticStyles
 * @version 0.0.1
 * @author by fico on 2022/07/20
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { css } from 'hi-element';
// 样式助手
import { display } from '@utils/style';
// 配置文件
import { hiConfigStyle } from "@packages/config";
// 样式文件
export const StatisticStyles = css`
${hiConfigStyle()}
${display("inline-block")}
:host{
    font-size: var(--fontSize16);
}
:host .Title {
    margin-bottom: 4px;
    color: var(--colorNeutral4);
    font-size: 14px;
}
:host .Value {
    color: var(--colorGray8);
    font-size: 24px;
}

`;
 

