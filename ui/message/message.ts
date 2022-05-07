/**
 * button
 * @class: HButton
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, slotted,  html } from '@ele/index';
import { buttonStyles as styles } from "./message.style";

const template = html<Message>`
    <div class="message">
        <slot></slot>
    </div>
 `;
@customElement({
   name: 'h-message',
   template,
   styles
})
export class Message extends HIElement {


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

    @attr type!: 'info' | 'success' | 'error' | 'warning' | 'loading';



    /**
     *
     * Default slotted content
     *
     * @public
     * @remarks
     */

    @observable
    public defaultSlottedContent: HTMLElement[] = [];
    show!: boolean;
    timer!: any;

    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    public connectedCallback(): void {
        super.connectedCallback();

    }

    /**
     * 当自定义元素与文档DOM断开连接时被调用。
     * 被移除的元素的 disconnectedCallback 会被同步触发，在 disconnectedCallback 中可以做一些清理工作，例如移除事件监听。在那之后新创建的 t_fendt 元素的 connectedCallback 将会被调用。
     * @internal
     */
    public disconnectedCallback(): void {
        super.disconnectedCallback();

        
    }

    /**
     * Prevent events to propagate if disabled and has no slotted content wrapped in HTML elements
     * 如果已禁用且HTML元素中没有包装的时隙内容，则防止事件传播
     * @internal
     */
    private handleClick = (e: Event) => {

    };

}

export default {

    info: (text='',duration,onclose) => {
        const message = new Message();
        message.timer && clearTimeout(message.timer);
        message.type = 'info';
        message.textContent = text;
        message.show = true;
        message.onclose = onclose;
        message.timer = setTimeout(()=>{
            message.show = false;
        },duration||3000);
        return message;
    },

    success: function(text='',duration,onclose) {
        const message = new Message();
        message.timer && clearTimeout(message.timer);
        message.type = 'success';
        message.textContent = text;
        message.show = true;
        message.onclose = onclose;
        message.timer = setTimeout(()=>{
            message.show = false;
        },duration||3000);
        return message;
    },

    error: function(text='',duration,onclose) {
        const message = new Message();
        message.timer && clearTimeout(message.timer);
        message.type = 'error';
        message.textContent = text;
        message.show = true;
        message.onclose = onclose;
        message.timer = setTimeout(()=>{
            message.show = false;
        },duration||3000);
        return message;
    },

    warning: function(text='',duration,onclose) {
        const message = new Message();
        message.timer && clearTimeout(message.timer);
        message.type = 'warning';
        message.textContent = text;
        message.show = true;
        message.onclose = onclose;
        message.timer = setTimeout(()=>{
            message.show = false;
        },duration||3000);
        return message;
    },

    loading: function(text='',duration=0,onclose) {
        const message = new Message();
        message.timer && clearTimeout(message.timer);
        message.type = 'loading';
        message.textContent = text;
        message.show = true;
        message.onclose = onclose;
        if(duration!==0){
            message.timer = setTimeout(()=>{
                message.show = false;
            },duration||3000);
        }
        return message;
    }
}
