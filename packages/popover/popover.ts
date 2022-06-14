
import { HIElement, customElement, attr, observable, ref, slotted,  html, css } from 'hi-element';

const template = html<Popover>`    
    <button
        class="btn"
    >
        <span class="content" >
           <slot></slot>
        </span>
    </button>
 `;
const styles =  css`
    :host {
        display:inline-flex;
    }`;
@customElement({
    name: 'h-popover',
    template,
    styles
 })
 export class Popover extends HIElement {}