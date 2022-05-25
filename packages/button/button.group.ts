/**
 * button Group
 * @class: HButtonGroup
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, slotted,  html } from 'hi-element';
import { buttonGroupStyles as styles } from "./button.group.style";
 

const template = html<ButtonGroup>`<slot></slot>`;
@customElement({
   name: 'h-button-group',
   template,
   styles
})
export class ButtonGroup extends HIElement {
    // 不可点击
    disabled!: boolean;

}