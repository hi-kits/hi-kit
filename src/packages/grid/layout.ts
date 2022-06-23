/**
 * @class: HiLayout 布局
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
const styles = css`
:host {
   display:flex;
   flex-direction:column;
}
:host([row]){
   flex-direction:row;
}
:host([column]){
   flex-direction:column;
}
:host([expand]){
   flex:1;
}
:host([center]:not([center$=Axis])){
   justify-content: center;
   align-items: center;
}
:host([center="mainAxis"]){
   justify-content: center;
}
:host([center="crosAxis"]){
   align-items: center;
}
`;
const template = html<HiLayout>`<slot></slot>`;
@customElement({
   name: 'h-layout',
   template,
   styles
})
export class HiLayout extends HIElement {
   

}

