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
    /*文字颜色*/
    color: '#333',
    /*边框颜色，按钮、输入框*/
    borderColor: '#d9d9d9',
    /*圆角*/
    borderRadius: '4px',
    /*成功色*/
    successColor: '#52c41a',
    /*警告色*/
    waringColor:  '#faad14',
    /*错误色*/
    errorColor: '#f4615c',
    /*提示色*/
    /*危险色*/
    dangerColor: '#ff7875',
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
    return `:host {
    --themeColor: #42b983;
    --themeBackground: #42b983;

    --percent: 10%;

    --background: #fafafa;

    --fontColor: #42b983;

    --borderColor: #d9d9d9;
    --borderRadius: 4px;

    --primaryColor: #1890ff;
    --primaryColor-hover: #40a9ff;
    --primaryColor-active: #096dd9;
    --primaryColor-outline: rgba(24, 144, 255, .2);

    --successColor: #52c41a;
    --successColor-hover: #73d13d;
    --successColor-active: #389e0d;
    --successColor-outline: rgba(82, 196, 26, .2);


    --errorColor: #ff4d4f;
    --errorColor-hover: #ff7875;
    --errorColor-active: #d9363e;
    --errorColor-outline: rgba(255, 77, 79, .2);

    
    --warningColor: #faad14;
    --warningColor-hover: #ffc53d;
    --warningColor-active: #d48806;
    --warningColor-outline: rgba(250, 173, 20, .2);

    --infoColor: #1890ff;

    
}`;
}





