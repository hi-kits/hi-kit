/**
 * button
 * @class: HButton
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { css } from 'hi-element';

export const buttonGroupStyles = css`
    :host {
        display:inline-block;
    }
    :host(:focus-within) xy-tips,:host(:hover) xy-tips{
        z-index:2;
    }
    :host([disabled]){ 
        pointer-events: none; 
    }
    :host([disabled]) xy-tips{
        pointer-events: all;
        cursor: not-allowed;
        outline: 0;
    }
    :host([disabled]) ::slotted(xy-checkbox){
        pointer-events: none;
        opacity:.6;
    }
    ::slotted(xy-checkbox){
        transition: opacity .3s;
    }
`;
 

