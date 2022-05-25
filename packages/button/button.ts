/**
 * button
 * @class: HButton
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, slotted,  html } from 'hi-element';

import { buttonStyles as styles } from "./button.style";

const template = html<Button>`    
    <button
        class="btn"
    >
        <span class="content" >
           呃呃呃呃呃<slot></slot>
        </span>
    </button>
 `;
@customElement({
   name: 'h-button',
   template,
   styles
})
export class Button extends HIElement {
    // 代理
    proxy = document.createElement("input");
    readonly form!: HTMLFormElement;
    ishref!: false;
    disabled!: boolean;

    /**
     * 确定元素是否应在页面加载时接收文档焦点
     * @public
     * @remarks
     * HTML Attribute: 自动聚焦
     */
    @attr({ mode: "boolean" })
    public autofocus!: boolean;

    /**
     * 确定元素是否应在页面加载时接收文档焦点
     */
    @attr htmltype!: boolean;
    /**
     * 下载链接
     */
    @attr download!: string;
    /**
     * 下载链接
     */
    @attr target!: string;
    /**
     * 下载链接
     */
    @attr rel!: string;

    /**
     * 要将元素关联到的窗体的id
     * @public
     * @remarks
     * HTML Attribute: form
     */

    @attr({ attribute: "form" })
    public formId!: string;


    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     * 表示程序处理 button 提交信息的 URI。如果指定了，将重写 button 表单拥有者的action属性
     * @public
     * @remarks
     * HTML Attribute: formaction
     */

    @attr
    public formaction!: string;
    private formactionChanged(): void {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formAction = this.formaction;
        }
    }


    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     * 如果 button 是 submit 类型，此属性值指定提交表单到服务器的内容类型。可选值：
     *  application/x-www-form-urlencoded: 未指定时的默认值。
     *  multipart/form-data: 如果使用type属性的<input>元素设置文件，使用此值。
     *  text/plain
     * 如果指定此属性，它将重写 button 的表单拥有者的enctype属性。
     * @public
     * @remarks
     * HTML Attribute: formenctype
     */

    @attr
    public formenctype!: string;
    private formenctypeChanged(): void {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formEnctype = this.formenctype;
        }
    }


    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     * 如果 button 是 submit 类型，此属性指定浏览器提交表单使用的 HTTP 方法。可选值：
     * post: 来自表单的数据被包含在表单内容中，被发送到服务器。
     * get:  来自表单的数据以'?'作为分隔符被附加到 form 的URI属性中，得到的 URI 被发送到服务器。当表单没有副作用，且仅包含 ASCII 字符时使用这种方法。
     * 如果指定了，此属性会重写 button 拥有者的method属性。
     * @public
     * @remarks
     * HTML Attribute: formmethod
     */

    @attr
    public formmethod!: string;
    private formmethodChanged(): void {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formMethod = this.formmethod;
        }
    }


    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     * 如果 button 是 submit 类型，此布尔属性指定当表单被提交时不需要验证。如果指定了，它会重写 button 拥有者的novalidate属性。
     * @public
     * @remarks
     * HTML Attribute: formnovalidate
     */

    @attr({ mode: "boolean" })
    public formnovalidate: boolean = false;
    private formnovalidateChanged(): void {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formNoValidate = this.formnovalidate;
        }
    }

 
    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     * 如果 button 是 submit 类型，此属性指定一个名称或关键字，表示接收提交的表单后在哪里显示响应。这是一个浏览上下文（例如 tab，window 或内联框架）的名称或关键字。如果指定了，它会重写 button 拥有者的target 属性。关键字如下：
     * _self: 在同一个浏览上下文中加载响应作为当前的。未指定时此值为默认值。
     * _blank:  在一个新的不知名浏览上下文中加载响应。
     * _parent: 在当前浏览上下文父级中加载响应。如果没有父级的，此选项将按_self 执行。
     * _top:  在顶级浏览上下文（即当前浏览上下文的祖先，且没有父级）中架加载响应。如果没有顶级的，此选项将按_self 执行。
     * @public
     * @remarks
     * HTML Attribute: formtarget
     */

    @attr
    public formtarget: "_self" | "_blank" | "_parent" | "_top" = "_self";
    private formtargetChanged(): void {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formTarget = this.formtarget;
        }
    }


    /**
     * The button type.
     * button 的类型。可选值：
     * submit:  此按钮将表单数据提交给服务器。如果未指定属性，或者属性动态更改为空值或无效值，则此值为默认值。
     * reset:  此按钮重置所有组件为初始值。
     * button: 此按钮没有默认行为。它可以有与元素事件相关的客户端脚本，当事件出现时可触发。
     * menu: 此按钮打开一个由指定<menu>元素进行定义的弹出菜单。
     *
     * @public
     * @remarks
     * HTML Attribute: type
     */

    @attr
    public type: "submit" | "reset" | "button" = "submit";
    private typeChanged(
        previous: "submit" | "reset" | "button" | void,
        next: "submit" | "reset" | "button"
    ): void {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.type = this.type;
        }

        next === "submit" && this.addEventListener("click", this.handleSubmission);
        previous === "submit" && this.removeEventListener("click", this.handleSubmission);
        next === "reset" && this.addEventListener("click", this.handleFormReset);
        previous === "reset" && this.removeEventListener("click", this.handleFormReset);
    }


    /**
     *
     * Default slotted content
     *
     * @public
     * @remarks
     */

    @observable
    public defaultSlottedContent: HTMLElement[] = [];
    attachProxy(): void {};
    detachProxy(): void {};
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    public connectedCallback(): void {
        super.connectedCallback();

        this.proxy.setAttribute("type", this.type);
        this.handleUnsupportedDelegatesFocus();

        // const elements = Array.from(this.control?.children) as HTMLSpanElement[];
        // if (elements) {
        //     elements.forEach((span: HTMLSpanElement) => {
        //         span.addEventListener("click", this.handleClick);
        //     });
        // }
    }

    /**
     * 当自定义元素与文档DOM断开连接时被调用。
     * 被移除的元素的 disconnectedCallback 会被同步触发，在 disconnectedCallback 中可以做一些清理工作，例如移除事件监听。在那之后新创建的 t_fendt 元素的 connectedCallback 将会被调用。
     * @internal
     */
    public disconnectedCallback(): void {
        super.disconnectedCallback();

        const elements = Array.from(this.control?.children) as HTMLSpanElement[];
        if (elements) {
            elements.forEach((span: HTMLSpanElement) => {
                span.removeEventListener("click", this.handleClick);
            });
        }
    }

    /**
     * Prevent events to propagate if disabled and has no slotted content wrapped in HTML elements
     * 如果已禁用且HTML元素中没有包装的时隙内容，则防止事件传播
     * @internal
     */
    private handleClick = (e: Event) => {
        if (this.disabled && this.defaultSlottedContent?.length <= 1) {
            e.stopPropagation();
        }
    };

    /**
     * Submits the parent form
     * 提交
     */
    private handleSubmission = () => {
        if (!this.form) {
            return;
        }

        const attached = this.proxy.isConnected;

        if (!attached) {
            this.attachProxy();
        }

        // 对requestSubmit的浏览器支持并不全面
        // 因此，如果不支持代理，请单击代理
        typeof this.form.requestSubmit === "function"
            ? this.form.requestSubmit(this.proxy)
            : this.proxy.click();

        if (!attached) {
            this.detachProxy();
        }
    };

    /**
     * Resets the parent form
     * 重置
     */
    private handleFormReset = () => {
        this.form?.reset();
    };

    public control!: HTMLButtonElement;

    /**
     * Overrides the focus call for where delegatesFocus is unsupported.
     * This check works for Chrome, Edge Chromium, FireFox, and Safari
     * Relevant PR on the Firefox browser: https://phabricator.services.mozilla.com/D123858
     * 覆盖不支持delegatesFocus的地方的焦点调用
     * 此检查适用于Chrome、Edge Chrome、FireFox和Safari
     * Firefox浏览器上的相关PR：https://phabricator.services.mozilla.com/D123858
     */
    private handleUnsupportedDelegatesFocus = () => {
        // 检查是否支持delegatesFocus
        if (
            window.ShadowRoot &&
            !window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus") &&
            this.$hiController.definition.shadowOptions?.delegatesFocus
        ) {
            this.focus = () => {
                this.control.focus();
            };
        }
    };
}
// HIElement.define(Button);
