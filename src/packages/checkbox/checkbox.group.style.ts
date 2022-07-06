/**
 * CheckboxGroupStyles
 * @const: CheckboxGroupStyles
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { css } from 'hi-element';
import { display } from '../_utils/style';

export const CheckboxGroupStyles = css`
    ${display("inline-block")}
    :host(:focus-within) h-tips,:host(:hover) h-tips{
        z-index:2;
    }
    :host([disabled]){ 
        pointer-events: none; 
    }
    :host([disabled]) h-tips{
        pointer-events: all;
        cursor: not-allowed;
        outline: 0;
    }
    :host([disabled]) ::slotted(h-checkbox){
        pointer-events: none;
        opacity:.6;
    }
    ::slotted(h-checkbox){
        transition: opacity .3s;
    }
`;
 

