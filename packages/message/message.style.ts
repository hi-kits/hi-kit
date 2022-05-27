/**
 * MessageStyles
 * @const: MessageStyles
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { css } from 'hi-element';

export const MessageStyles = css`
:host{
    display:flex;
    visibility:hidden;
    opacity:0;
    transition:.3s;
    z-index:10;
}
:host([show]){
    opacity:1;
    visibility:visible;
}
.message{
    margin:auto;
    display:flex;
    padding:10px 15px;
    margin-top:10px;
    align-items:center;
    font-size: 14px;
    color: #666;
    background: #fff;
    border-radius: 3px;
    transform: translateY(-100%);
    transition:.3s transform cubic-bezier(.645, .045, .355, 1);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    pointer-events:all;
}
:host([show]) .message{
    transform: translateY(0);
}

.message>*{
    margin-right:5px;
}

h-loading{
    display:none;
}

:host([show][type="loading"]) h-loading{
    display:block;
}
:host([show][type="loading"]) h-icon{
    display:none;
}
:host h-icon{
    color:var(--themeColor,#42b983);
}
`;
 

