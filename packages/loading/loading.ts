/**
 * Loading
 * @const: Loading
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';

const styles = css`
:host{
    font-size:inherit;
    display:inline-flex;
    align-items: center;
    justify-content:center;
    color:var(--themeColor,#42b983);
}
.loading{
    display: block;
    width: 100px;
    height: 10px;
    margin: auto;
    animation: rotate 1.4s linear infinite;
}
.circle {
    stroke: currentColor;
    animation:  progress 1.4s ease-in-out infinite;
    stroke-dasharray: 80px, 200px;
    stroke-dashoffset: 0px;
    transition:.3s;
}
:host(:not(:empty)) .loading{
    margin:.5em;
}
@keyframes rotate{
    to{
        transform: rotate(360deg); 
    }
}
@keyframes progress {
    0% {
      stroke-dasharray: 1px, 200px;
      stroke-dashoffset: 0px; 
    }
    50% {
      stroke-dasharray: 100px, 200px;
      stroke-dashoffset: -15px; 
    }
    100% {
      stroke-dasharray: 100px, 200px;
      stroke-dashoffset: -125px; 
    } 
}
`
const template = html<Loading>`
<svg class="loading" id="loading" viewBox="22 22 44 44" xmlns="http://www.w3.org/2000/svg"><circle class="circle" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle></svg>
<slot></slot>

`;
@customElement({
   name: 'h-loading',
   styles,
   template,
})
export class Loading extends HIElement {
    
    @attr size;
    @attr color;



    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'color' ){
            // this.style.color = newValue;
        }
        if( name == 'size' ){
            this.style.fontSize = newValue + 'px';
        }
    }
}
