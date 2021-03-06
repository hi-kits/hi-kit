/**
 * @class: HiSwitch 开关
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, html, observable } from 'hi-element';
// 事件处理
import { EventUtil } from '@utils/event';
// 样式助手
import { Style } from '@utils/style';
// 混入基础功能
import { HIElementBase } from '@mixins/hiElementBase';
// 样式文件
import { SwitchStyles as styles } from "./switch.style";
// 模版文件
const template = html<HiSwitch>`
<input type="checkbox" id="switch" :value="${x => x.initialValue}" ?disabled="${x => x.disabled}" />
<label for="switch"></label>
`;
// 定义元素
@customElement({
   name: 'h-switch',
   template,
   styles
})
export class HiSwitch extends HIElementBase {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------ 
    isfocus = true;
    value;
    switch;
    /**
     * 选中时在表单提交中的元素值。
     * Default to "on" to reach parity with input[type="checkbox"]
     *
     * @internal
     */
    public initialValue: string = 'no';
    
    // ------------------ 属性 ------------------
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

    @attr({ mode: "boolean" }) checked;
    /**
     * @internal
     */
    public checkedChanged(prev: boolean | undefined, next: boolean): void {
        if(next === null || next === false){
            this.removeAttribute('checked');
        }else{
            this.setAttribute('checked', '');
        }
    }

    sizeChanged(oldValue, newValue): void {
        if (!['large', 'small', 'default'].includes(newValue)) {
            Style(this)({
                fontSize: newValue + 'px'
            });
        }
    }

    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
     connectedCallback(): void {
        super.connectedCallback();
        this.switch = this.shadowRoot!.getElementById('switch');
        EventUtil.addHandler(this.switch, 'change', (ev)=>{
            this.checked = this.switch.checked;
            this.$emit('change', {
                checked: this.checked
            });
        });
        EventUtil.addHandler(this.switch, 'keydown', (ev)=>{
            switch (ev.keyCode) {
                case 13://Enter
                    this.checked = !this.checked;
                    break;
                default:
                    break;
            }
        });
        EventUtil.addHandler(this.switch, 'focus', (ev)=>{
            ev.stopPropagation();
            if(!this.isfocus){
                this.$emit('focus', {
                    checked: this.value
                });
            }
        });
        EventUtil.addHandler(this.switch, 'blur', (ev)=>{
            ev.stopPropagation();
            if(Number(getComputedStyle(this).zIndex) == 2 ){
                this.isfocus = true;
            }else{
                this.isfocus = false;
                this.$emit('blur', {
                    checked: this.value
                });
            }
        });

        if (this.checked) {
            this.switch.setAttribute('checked','');
        } else {
            this.switch.removeAttribute('checked');
        }
    }

}

