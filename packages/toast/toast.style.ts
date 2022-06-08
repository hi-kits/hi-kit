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

.ToastBox{position:fixed;left:50%;bottom:20px;min-width:100px;max-width:100%;margin-left:-50px;z-index:500;border-radius:4px;background-color:rgba(0,0,0,.8);box-shadow:rgba(0,0,0,0.4) 0 0 5px;opacity:0;color:#fff;padding:10px;white-space:nowrap;text-align:center;
        pointer-events:none;
        -webkit-transform:translate3d(0,0,0) scale(1.19574);
                transform:translate3d(0,0,0) scale(1.19574)}
        .ToastIn,
        .ToastOut{white-space:normal;
        -webkit-transition-duration:400ms;
                transition-duration:400ms
        }
        .ToastBox.ToastIn{opacity:1;
        -webkit-transform:translate3d(0,0,0) scale(1);
                transform:translate3d(0,0,0) scale(1)
        }
        .ToastBox.ToastOut{opacity:0;
        -webkit-transform:translate3d(0,0,0) scale(0.815);
                transform:translate3d(0,0,0) scale(0.815)
        }

`;
 

