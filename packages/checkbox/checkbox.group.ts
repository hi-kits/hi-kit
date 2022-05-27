/**
 * CheckboxGroup
 * @class: CheckboxGroup
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */


import { HIElement, customElement,  html } from 'hi-element';
import { CheckboxGroupStyles as styles } from "./checkbox.group.style";
  
 
const template = html<CheckboxGroup>`<slot></slot>`;
@customElement({
    name: 'h-checkbox-group',
    template,
    styles
})
export class CheckboxGroup extends HIElement {
     // 不可点击
     disabled!: boolean;
 
}
