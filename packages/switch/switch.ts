/**
 * @class: HiSwitch
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, html, observable } from 'hi-element';
import { SwitchStyles as styles } from "./switch.style";

const template = html<HiSwitch>`
<input type="checkbox" id="switch" :value="${x => x.initialValue}" ?disabled="${x => x.disabled}" />
<label for="switch"></label>
`;
@customElement({
   name: 'h-switch',
   template,
   styles
})
export class HiSwitch extends HIElement {
    
    /**
     * 无效
     * @public  boolean
     */
    @attr disabled: boolean;
    private disabledChanged(oldValue, newValue): void {
        if(newValue!==null){
            this.setAttribute('disabled', 'disabled');
        }else{
            this.removeAttribute('disabled');
        }
    }
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: readonly
     */
    @attr({ attribute: "readonly", mode: "boolean" })
    public readOnly: boolean; // Map to proxy element
    private readOnlyChanged(): void {

        this.readOnly
            ? this.classList.add("readonly")
            : this.classList.remove("readonly");
    }

    @attr checked = true;
    /**
     * @internal
     */
    public checkedChanged(prev: boolean | undefined, next: boolean) {
        this.checked 
            ? this.classList.add("checked") 
            : this.classList.remove("checked");
    }
    /**
     * 选中时在表单提交中的元素值。
     * Default to "on" to reach parity with input[type="checkbox"]
     *
     * @internal
     */
    public initialValue: string = 'no';


    /**
     * @internal
     */
     public clickHandler = (e: MouseEvent) => {
        if (!this.disabled && !this.readOnly) {
            this.checked = !this.checked;

        }
    };
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
     connectedCallback() {
        super.connectedCallback()
        this.shadowRoot!.addEventListener("click", this.clickHandler);
    }

}

