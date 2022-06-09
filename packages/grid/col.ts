/**
 * Col
 * @class: Col
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
const styles = css`
:host {
   grid-column: span 1;
}
${
Array.from({length:24},(el,i)=>':host([span="'+(i+1)+'"]) {grid-column: span '+(i+1)+'}\n').join('')
}
`;
const template = html<Col>`<slot></slot>`;
@customElement({
   name: 'h-col',
   template,
   styles
})
export class Col extends HIElement {
   /**
     * 子项目跨度
     * @public number
     */
   @attr span;

}

