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
        // ---------------------- 主题色 ---------------------
        // 主题颜色
        '--themeColor: #42b983',
        // 主题背景色
        '--themeBackground: #42b983',



        // 文字颜色
        '--fontColor: #333',
        // 字体大小
        '--fontSize14: 14px',
        '--fontSize16: 16px',
        '--fontSize20: 20px',
        // 边框颜色，按钮、输入框
        '--borderColor: #d9d9d9',
        // 圆角
        '--borderRadius: 4px',

        // ---------------------- 中性色 ---------------------

        // 颜色 - 白
        '--colorWhite: #fff',
        // 灰色 - 浅
        '--colorGray1: #fafafa',
        '--colorGray2: #eee',
        // 灰色 - 深
        '--colorGray6: #757575',
        '--colorGray7: #585858',
        '--colorGray8: #333',

        // 中性透明 - 浅
        '--colorNeutral02: rgba(0,0,0,0.02)',
        '--colorNeutral05: rgba(0,0,0,0.05)',
        '--colorNeutral1: rgba(0,0,0,0.1)',
        '--colorNeutral2: rgba(0,0,0,0.2)',
        '--colorNeutral3: rgba(0,0,0,0.3)',
        // 中性透明 - 深
        '--colorNeutral4: rgba(0,0,0,0.4)',
        '--colorNeutral5: rgba(0,0,0,0.5)',
        '--colorNeutral6: rgba(0,0,0,0.65)',
        '--colorNeutral7: rgba(0,0,0,0.75)',
        '--colorNeutral8: rgba(0,0,0,0.85)',
        // 颜色 - 黑
        '--colorBlack: #000',


        // ---------------------- 功能色 ---------------------
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
        '--waringColor: #faad14',
        '--waringColor-hover: #ffc53d',
        '--waringColor-active: #d48806',
        '--waringColor-outline: rgba(250, 173, 20, .2)',
        // 信息色
        '--infoColor: #1890ff',
    ]

    return `:host, :root {${Theme.join(';')}}`;
}





