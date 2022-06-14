/*
 * @Author: zhengfeijun zhengfeijun.xian@haier.com
 * @Date: 2022-06-06 13:55:55
 * @LastEditors: zhengfeijun zhengfeijun.xian@haier.com
 * @LastEditTime: 2022-06-14 11:25:48
 * @FilePath: /business/Users/fico/Documents/work/GIT/hi-kit/packages/toast/toast.style.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * ToastStyles
 * @const: ToastStyles
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { css } from 'hi-element';
import { hiConfig } from "../config";

export const ToastStyles = css`

.ToastBox{
        position:fixed;
        left:50%;
        bottom:20px;
        min-width:100px;
        max-width:100%;
        margin-left:-50px;
        border-radius:${hiConfig.borderRadius};
        background-color:rgba(0,0,0,.8);
        box-shadow:rgba(0,0,0,0.4) 0 0 5px;
        opacity:0;color:#fff;
        padding:10px;
        white-space:nowrap;
        text-align:center;
        pointer-events:none;
        -webkit-transform:translate3d(0,0,0) scale(0.815);
                transform:translate3d(0,0,0) scale(0.815);
        -webkit-transition-duration:400ms;
                transition-duration:400ms
}

:host([show]) .ToastBox{
        opacity:1;
        -webkit-transform:translate3d(0,0,0) scale(1);
                transform:translate3d(0,0,0) scale(1)
}


`;
 

