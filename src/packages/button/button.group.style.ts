/**
 * ButtonGroupStyles
 * @const: ButtonGroupStyles
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { css } from 'hi-element';

export const ButtonGroupStyles = css`
    :host {
        display:inline-flex;
    }
    ::slotted(h-button:not(:first-of-type):not(:last-of-type)){
        border-radius:0;
    }
    ::slotted(h-button){
        margin:0!important;
    }
    ::slotted(h-button:not(:first-of-type)){
        margin-left:-1px!important;
    }
    ::slotted(h-button[type]:not([type="dashed"]):not(:first-of-type)){
        margin-left:1px!important;
    }
    ::slotted(h-button:first-of-type){
        border-top-right-radius: 0;
        border-bottom-right-radius: 0px;
    }
    ::slotted(h-button:last-of-type){
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
`;
 

