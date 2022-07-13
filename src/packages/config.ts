/**
 * config
 * @class: HButton
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hikits. All rights reserved.
 * @description
 */

import { css } from "hi-element";

export const hiConfig = {
    /*被禁用*/
    disabled: {
        opacity: 0.3,
    },
    /**
     * 按钮配置
    */
    button: {
        size: 'large'
    }
}

export function hiConfigStyle(): string {
    const Theme = [
        // 主题颜色
        '--themeColor: #42b983',
        // 主题背景色
        '--themeBackground: #42b983',

        // 弹框背景色
        '--background: rgba(0,0,0,0.75)',
        // 弹框背景色 - 浅色
        '--background-1: rgba(0,0,0,0.3)',


        // 颜色-白
        '--colorWhite: #fff',

        // 文字颜色
        '--fontColor: #333',
        // 边框颜色，按钮、输入框
        '--borderColor: #d9d9d9',
        // 圆角
        '--borderRadius: 4px',
        // 首选颜色
        '--primaryColor: #1890ff',
        '--primaryColor-hover: #40a9ff',
        '--primaryColor-active: #096dd9',
        '--primaryColor-outline: rgba(24, 144, 255, .2)',
        // 成功色
        '--successColor: #00a870',
        '--successColor-hover: #73d13d',
        '--successColor-active: #389e0d',
        '--successColor-outline: rgba(82, 196, 26, .2)',

        // 错误色
        '--errorColor: #ff4d4f',
        '--errorColor-hover: #ff7875',
        '--errorColor-active: #d9363e',
        '--errorColor-outline: rgba(255, 77, 79, .2)',

        // 警告色
        '--warningColor: #faad14',
        '--warningColor-hover: #ffc53d',
        '--warningColor-active: #d48806',
        '--warningColor-outline: rgba(250, 173, 20, .2)',
        // 信息色
        '--infoColor: #1890ff',
    ]

    return `:host {${Theme.join(';')}}`;
}





