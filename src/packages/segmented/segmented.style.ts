/**
 * @const: StepStyles
 * @version 0.0.1
 * @author by fico on 2022/06/30
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { css } from 'hi-element';
import { hiConfig } from "../config";

export const SegmentedStyles = css`

:host {
    position: relative;
    text-align: center;
    cursor: pointer;
    transition: color .3s cubic-bezier(.645,.045,.355,1);
}
.SegmentedInput {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
    box-sizing: border-box;
    padding: 0;
    touch-action: manipulation;
}
.SegmentedItem {
    border-radius: 2px;
    box-shadow: 0 2px 8px -2px #0000000d, 0 1px 4px -1px #00000012, 0 0 1px #00000014;
    color: #262626;
    background-color: #fff;
    min-height: 28px;
    padding: 0 11px;
    line-height: 28px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: keep-all;
}

`;
 

