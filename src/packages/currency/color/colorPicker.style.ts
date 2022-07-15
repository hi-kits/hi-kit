/**
 * @const: ColorPickerStyles
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { css } from 'hi-element';

export const ColorPickerStyles = css`
    
:host{
    display:inline-block;
    width:30px;
    height:30px;
    font-size:14px;
}
:host([block]){
    display:block;
}

:host([disabled]){
    pointer-events:none;
}

:host(:focus-within) xy-popover,:host(:hover) xy-popover{ 
    z-index: 2;
}
xy-popover{
    width:100%;
    height:100%;
}
.color-btn{
    width:100%;
    height:100%;
    padding:5px;
    background-clip: content-box;
    background-color:var(--themeColor);
}
.color-btn:hover{
    z-index: auto;
}
xy-popover{
    display:block;
}
xy-popcon{
    min-width:100%;
}
.pop-footer{
    display:flex;
    justify-content:flex-end;
    padding:0 .8em .8em;
}
.pop-footer xy-button{
    font-size: .8em;
    margin-left: .8em;
}
.color-btn::before{
    content:'';
    position:absolute;
    left:5px;
    top:5px;
    right:5px;
    bottom:5px;
    z-index:-1;
    background:linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 ),linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 );
    background-position:0 0,5px 5px;
    background-size:10px 10px;
}

`;
 

