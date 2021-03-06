/**
 * @class: HiMessage 消息
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, observable, ref, slotted,  html, when } from 'hi-element';
// 事件处理
import { EventUtil } from '@utils/event';
// 样式文件
import { MessageStyles as styles } from "./message.style";
// 依赖组件
import { HiIcon } from "@currency/icon";
import { HiLoading } from "../loading";
// 样式助手
import { Style } from '@utils/style';

/**
 * 消息类型
 */
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
    type?: MessageType,
    content:string, 
    duration?: number | undefined, 
    callback?: () => void 
}
// 模版文件
const template = html<HiMessage>`
    <div class="message">
        ${when(
            x => x.type == 'loading',
            html`<h-loading size="16" color="green"></h-loading>`
        )}
        ${when(
            x => x.type != 'loading',
            html<HiMessage>`<h-icon ${ref('icon')} name="${x => x.iconName}" ></h-icon>`
        )}
        <slot></slot>
        ${ x => x.textContent}
    </div>
`;
// 定义元素
@customElement({
   name: 'h-message',
   template,
   styles
})
export class HiMessage extends HIElement {
    // ------------------ 构造函数 ------------------
    constructor(
    ) {
        super();
    }
    // ------------------ 参数 ------------------
    @observable
    icon: HTMLElement;
    @observable
    iconName: string;
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
    private typeChanged(oldValue: string, newValue: string): void {

        switch (newValue) {
            case 'info':
                this.iconName = 'info-circle';
                Style(this.icon)({
                    color: 'var(--infoColor)'
                });
                break;
            case 'success':
                this.iconName = 'check-circle';
                Style(this.icon)({
                    color: 'var(--successColor)'
                });
                break;
            case 'error':
                this.iconName = 'error';
                Style(this.icon)({
                    color: 'var(--errorColor)'
                });
                break;
            case 'warning':
                this.iconName = 'warning-circle';
                Style(this.icon)({
                    color: 'var(--waringColor)'
                });
                break;
            default:
                break;
        }
        
    }

    // 关闭时触发的回调函数
    onCallback;
    // ------------------ 自定义函数 ------------------
    /**
     * 设置参数
     * @date 2022-06-16
     * @param { any } message
     * @param { string} type
     * @param { string} content
     * @param { number } duration
     * @param { callback: () => void = (() => {})} 
     * @returns { void }
     */
    setParams (
        message:any, 
        type: string | undefined, 
        content:string, 
        duration: number | undefined, 
        callback: () => void = (() => {})
    ): void {
        message.type = type;
        message.show = true;
        message.onCallback = callback;
        message.textContent = content;
        message.timer = setTimeout(()=>{
            message.show = false;
        }, duration || 2000);
    }
    close(): void {
        this.show = false;
        setTimeout(() => {
            this.remove();
        }, 300);
    }
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();
        EventUtil.addHandler(this.shadowRoot, 'transitionend', (ev:any) =>{
            if ( ev.propertyName === 'transform' && !this.show ) {
                // 移除当前消息
                messageContent.removeChild(this);
                this.onCallback();
                // this.dispatchEvent(new CustomEvent('close'));
            }
        });
    }

}

let messageContent: any = document.getElementById('HiMessageWrap');
if(!messageContent){
    messageContent = document.createElement('div');
    messageContent.id = 'HiMessageWrap';
    Style(messageContent)({
        'position': 'fixed',
        'pointer-events': 'none',
        'left': 0,
        'right': 0,
        'top': '10px',
        'z-index': 99
    });
    document.body.appendChild(messageContent);
}

export const HiMessageService = {
    /**
     * 信息提示
     * @date 2022-06-16
     * @param { MessageOptions} options
     */
    info: ( options: MessageOptions ) => {
        const message = new HiMessage();
        messageContent.appendChild(message);
        message.setParams(message, 'info', options.content, options.duration, options.callback);
        return message;
    },
    /**
     * 成功提示
     * @date 2022-06-16
     * @param { MessageOptions} options
     */
    success: ( options: MessageOptions ) => {
        const message = new HiMessage();
        messageContent.appendChild(message);
        message.setParams(message, 'success', options.content, options.duration, options.callback);
        return message;
    },
    /**
     * 错误提示
     * @date 2022-06-16
     * @param { MessageOptions} options
     */
    error: ( options: MessageOptions ) => {
        const message = new HiMessage();
        messageContent.appendChild(message);
        message.setParams(message, 'error', options.content, options.duration, options.callback);
        return message;
    },
    /**
     * 警告提示
     * @date 2022-06-16
     * @param { MessageOptions} options
     */
    warning: ( options: MessageOptions ) => {
        const message = new HiMessage();
        messageContent.appendChild(message);
        message.setParams(message, 'warning', options.content, options.duration, options.callback);
        return message;
    },
    /**
     * 加载提示
     * @date 2022-06-16
     * @param { MessageOptions} options
     */
    loading: ( options: MessageOptions ) => {
        const message = new HiMessage();
        messageContent.appendChild(message);
        message.setParams(message, 'loading', options.content, options.duration, options.callback);
        return message;
    },
    /**
     * 通用提示
     * @date 2022-06-16
     * @param { MessageOptions} options
     */
    show: ( options: MessageOptions ) => {
        const message = new HiMessage();
        messageContent.appendChild(message);
        message.setParams(message, options.type, options.content, options.duration, options.callback);
        return message;
    },
    /**
     * 清空子元素
     */
    close: () => {
        messageContent.innerHTML = '';
    }
}

