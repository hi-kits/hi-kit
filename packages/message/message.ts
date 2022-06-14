/**
 * Message
 * @class: Message
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, slotted,  html } from 'hi-element';
import { MessageStyles as styles } from "./message.style";

const template = html<Message>`
    <div class="message">
        <slot></slot>
        ${ x => x.textContent}
    </div>
 `;
@customElement({
   name: 'h-message',
   template,
   styles
})
export class Message extends HIElement {
    // ------------------ 构造函数 ------------------
    constructor(
    ) {
        super();
    }
    // ------------------ 参数 ------------------
    /**
     * 显示状态
     * @public
     * @remarks
     */
    private _show!: boolean;
    get show(): boolean {
        return this._show;
    }
    set show(value: boolean) {
        this._show = value;
        if ( value === null || value === false ){
            this.removeAttribute('show');
        } else {
            this.setAttribute('show', '');
        }
    }
    /**
     * 定时器
     * @public
     */
    timer!: any;
    // ------------------ 属性 ------------------
    /**
     * 消息服务类型
     * Service 的类型。可选值：
     * info:  默认的消息提示。
     * success:  成功的消息提示。
     * error: 失败的消息提示。
     * warning: 警告的消息提示。
     * loading: 加载中的消息提示。
     */
    @attr type!: 'info' | 'success' | 'error' | 'warning' | 'loading';


    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
     connectedCallback() {
        super.connectedCallback();
        this.shadowRoot!.addEventListener('transitionend', (ev:any) =>{
            if ( ev.propertyName === 'transform' && !this.show ) {
                messageContent.removeChild(this);
                this.dispatchEvent(new CustomEvent('close'));
            }
        })
    }

}

let messageContent: any = document.getElementById('MessageWrap');
if(!messageContent){
    messageContent = document.createElement('div');
    messageContent.id = 'MessageWrap';
    messageContent.style = 'position:fixed; pointer-events:none; left:0; right:0; top:10px; z-index:51;';
    document.body.appendChild(messageContent);
}

export default {
    info: (text) => {
        const message = new Message();
        messageContent.appendChild(message);
        message.show = true;
        message.textContent = text;
        message.timer = setTimeout(()=>{
            message.show = false;
        }, 3000);
    },
}
// export default {

//     info: (text='',duration,onclose) => {
//         const message = new Message();
//         message.timer && clearTimeout(message.timer);
//         message.type = 'info';
//         message.textContent = text;
//         message.show = true;
//         message.onclose = onclose;
//         message.timer = setTimeout(()=>{
//             message.show = false;
//         },duration||3000);
//         return message;
//     },

//     success: function(text='',duration,onclose) {
//         const message = new Message();
//         message.timer && clearTimeout(message.timer);
//         message.type = 'success';
//         message.textContent = text;
//         message.show = true;
//         message.onclose = onclose;
//         message.timer = setTimeout(()=>{
//             message.show = false;
//         },duration||3000);
//         return message;
//     },

//     error: function(text='',duration,onclose) {
//         const message = new Message();
//         message.timer && clearTimeout(message.timer);
//         message.type = 'error';
//         message.textContent = text;
//         message.show = true;
//         message.onclose = onclose;
//         message.timer = setTimeout(()=>{
//             message.show = false;
//         },duration||3000);
//         return message;
//     },

//     warning: function(text='',duration,onclose) {
//         const message = new Message();
//         message.timer && clearTimeout(message.timer);
//         message.type = 'warning';
//         message.textContent = text;
//         message.show = true;
//         message.onclose = onclose;
//         message.timer = setTimeout(()=>{
//             message.show = false;
//         },duration||3000);
//         return message;
//     },

//     loading: function(text='',duration=0,onclose) {
//         const message = new Message();
//         message.timer && clearTimeout(message.timer);
//         message.type = 'loading';
//         message.textContent = text;
//         message.show = true;
//         message.onclose = onclose;
//         if(duration!==0){
//             message.timer = setTimeout(()=>{
//                 message.show = false;
//             },duration||3000);
//         }
//         return message;
//     }
// }
