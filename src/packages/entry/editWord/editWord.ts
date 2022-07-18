/**
 * @class: HiEditWord 文字编辑
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, html, when, observable,slotted, Observable, ref } from 'hi-element';
// 事件处理
import { EventUtil } from '../../../utils/event';
import { Style } from '../../../utils/style/style';
// 样式文件
import { EditWordStyles as styles } from "./editWord.style";

// 明白文件
const template = html<HiEditWord>`

<form ${ref("form")}>
    <input ${ref("input")} required="required">
</form>
<span ${ref("span")}>
    <slot></slot>
</span>

`;
// 定义元素
@customElement({
   name: 'h-edit-word',
   template,
   styles,
})
export class HiEditWord extends HIElement {
    // ------------------ 构造函数 ------------------
    constructor(
    ) {
        super();
    }
    // ------------------ 参数 ------------------
    @observable
    public input: HTMLInputElement;
    @observable
    public span: HTMLSpanElement;
    @observable
    public form: HTMLFormElement;
    // ------------------ 属性 ------------------
    // @attr
    // ochange: Function;
    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();
        Style(this.form)({ display: 'none'});
        Style(this.span)({ display: 'inline-block'});
        Style(this.input)({ width: this.span.clientWidth + 'px'});
        this.input.value =  String(this.textContent);
        this.setAttribute('tabindex', '0');
        this.input.setAttribute('required', 'required');

        EventUtil.addHandler(this.shadowRoot, 'click', (ev) => {
            Style(this.span)({ display: 'none'})
            Style(this.form)({ display: 'inline-block'});
            this.input.focus();
            this.input.setSelectionRange(0, this.input.value.length);
        });
        EventUtil.addHandler(this.form, 'submit', (ev) => {
            this.updateDisplay();
            ev.preventDefault();
        });
        EventUtil.addHandler(this.input, 'blur', (ev) => {
            this.updateDisplay();
        });
        EventUtil.addHandler(this, 'ochange', (e: Event): void => {
            if (
                e.defaultPrevented ||
                e.target === null
            ) {
                return;
            }
    
            e.preventDefault();
           
        });
    }
    /**
     * 更新显示
    */
    updateDisplay(): void {

        Style(this.form)({ display: 'none'});
        Style(this.span)({ display: 'inline-block'});
        Style(this.input)({ width: this.span.clientWidth + 'px'});
        this.span.textContent = this.input.value;
        // console.log(this.ochange);
        // this.ochange(3)
        
        // this.ochange(this.input.value)
        this.$emit("ochange",  this.input.value);
    }


}

