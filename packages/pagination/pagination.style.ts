/**
 * @const: PaginationStyles
 * @version 0.0.1
 * @author by fico on 2022/06/17
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { css } from 'hi-element';
import { hiConfig } from "../config";

export const PaginationStyles = css`

:host {
    display:flex;
    font-size:14px;
}
h-button {
    margin: 0 .3em;
    width: 2.3em;
    height: 2.3em;
    padding: 1px;
    font-size: inherit;
    box-sizing: content-box;
}
.simple-page{
    width:auto;
    padding:0 .625em;
}
h-button[tabindex]{
    justify-content: center;
    align-items: center;
    pointer-events: none;
}
.page-ellipsis h-icon{
    margin:auto;
}
h-button[current] {
    background: #42b983;
    border-color: #42b983;
    color:#fff;
}
.page{
    display:inline-flex;
}
.icon{
    width:1em;
    height:1em;
    fill: currentColor;
}

`;
 

