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

type MessageType = 'info' | 'success' | 'error' | 'warning' | 'loading' | 'show';

/**
 * 消息提示
 * @function get
 * @param { Object } options 请求参数对象
 * @param { string } options.type 消息类型
 * @param { string } options.content 消息内容
 * @param { number } options.duration 自动关闭的延时，单位毫秒。设为 0 时不自动关闭
 * @param { number } options.callback 关闭时触发的回调函数
 */
interface MessageOptions {
    type: MessageType,
    content:string, 
    duration: number, 
    callback: () => void 
}

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
     * show: 通用的消息提示。
     */
    @attr type!: MessageType;
    // typeChanged(oldValue: string, newValue: string): void {
    //     switch (newValue) {
    //         case 'info':
    //             break;
    //         default:
    //             break;
    //     }
        
    // }

    // 自动关闭的延时，单位毫秒。设为 0 时不自动关闭
    onCallback;
    // ------------------ 自定义函数 ------------------
    // 设置参数
    setParams (message:any, type: string, content:string, duration: number, callback: () => void = (() => {})): void {
        message.type = type;
        message.show = true;
        message.onCallback = callback;
        message.textContent = content;
        message.timer = setTimeout(()=>{
            message.show = false;
        }, duration || 2000);
    }

    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
     connectedCallback(): void {
        super.connectedCallback();
        this.shadowRoot!.addEventListener('transitionend', (ev:any) =>{
            if ( ev.propertyName === 'transform' && !this.show ) {
                messageContent.removeChild(this);
                this.onCallback();
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
    info: ( options: MessageOptions ) => {
        const message = new Message();
        messageContent.appendChild(message);
        message.setParams(message, 'info', options.content, options.duration, options.callback);
    },
    success: ( options: MessageOptions ) => {
        const message = new Message();
        messageContent.appendChild(message);
        message.setParams(message, 'success', options.content, options.duration, options.callback);
    },
    error: ( options: MessageOptions ) => {
        const message = new Message();
        messageContent.appendChild(message);
        message.setParams(message, 'error', options.content, options.duration, options.callback);
    },
    warning: ( options: MessageOptions ) => {
        const message = new Message();
        messageContent.appendChild(message);
        message.setParams(message, 'warning', options.content, options.duration, options.callback);
    },
    loading: ( options: MessageOptions ) => {
        const message = new Message();
        messageContent.appendChild(message);
        message.setParams(message, 'loading', options.content, options.duration, options.callback);
    },
    show: ( options: MessageOptions ) => {
        const message = new Message();
        messageContent.appendChild(message);
        message.setParams(message, options.type, options.content, options.duration, options.callback);
    },
}

