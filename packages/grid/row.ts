/**
 * Row
 * @class: Row
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';

const styles = css`:host {
    --gutter:0px;
    display:grid;
    grid-template-columns:repeat(24,1fr);
    grid-gap: var(--gutter,0);
}`
const template = html<Row>`<slot></slot>`;
@customElement({
   name: 'h-row',
   styles,
   template,
})
export class Row extends HIElement {
    /**
     * 子项目间距
     * @public number
     */
    @attr gutter: number;
    private gutterChanged(oldValue, newValue): void {
        this.style.setProperty('--gutter', newValue + 'px');
        
    }

}

