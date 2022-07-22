/**
 * @class: HiNotify 消息通知
 * @version 0.0.1
 * @author by fico on 2022/07/08
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, html, attr, ref, observable } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '@mixins/hiElementBase';
// 样式助手
import { Style } from '@utils/style';
// 事件处理
import { EventUtil } from '@utils/event';
// 样式文件
import { NotifyStyles as styles } from "./notify.style";



/**
 * 消息类型
 */
type NotifyType = 'info' | 'success' | 'error' | 'warning' | 'loading';

/**
 * 通知提示
 * @function get
 * @param { Object } options 请求参数对象
 * @param { string } options.type 通知类型
 * @param { string } options.title 通知标题
 * @param { boolean } options.placement 位置
 * @param { boolean } options.autohide 自动关闭
 * @param { string } options.content 通知内容
 * @param { number } options.duration 自动关闭的延时，单位毫秒。设为 0 时不自动关闭
 * @param { number } options.callback 关闭时触发的回调函数
 */
interface NotifyOptions {
    type?: NotifyType;
    title?: string;
    placement: string;
    autohide: boolean;
    content: string;
    duration?: number | undefined;
    callback?: () => void;
}
/**
 * 位置类型 通过placement可以设置通知框位置
 * @date 7/21/2022 - 16:00:27 PM
 *
 * @typedef {DirType}
 */
 type PlacementType = 'topleft' | 'topright' |  'bottomleft' | 'bottomright';

// 模版文件
const template = html<HiNotify>`
<div class="Notify" ${ref('Notify')}>
    <div class="Header">${x => x.title}</div>
    <div class="Body">${x => x.content}</div>
    <button 
        class="Close"
        @click="${x => x.close()}"
        type="button"
    ></button>
</div>
`;
// 定义元素
@customElement({
   name: 'h-notify',
   template,
   styles,
   shadowOptions: { mode: 'closed'},
})
export class HiNotify extends HIElementBase {
    // ------------------ 构造函数 ------------------
    constructor() {
        super();
    }
    // ------------------ 参数 ------------------
    @observable
    Notify: HTMLDivElement;    
    /**
     * 标题
     * @date 7/21/2022 - 4:37:05 PM
     *
     * @type {string}
     */
    @observable
    title: string;

    
    /**
     * 内容
     * @date 7/21/2022 - 4:36:53 PM
     *
     * @type {string}
     */
    @observable
    content: string;
    
    /**
     * 自动关闭
     * @date 7/21/2022 - 4:35:59 PM
     *
     * @type {boolean}
     */
    autohide: boolean = true;
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
    // ------------------ 属性 ------------------
   
    @attr placement: PlacementType = 'topright';
    @attr type: NotifyType;
    typeChanged(oldValue: string, newValue: string): void {

        switch (newValue) {
            case 'info':
                Style(this.Notify)({
                    background: 'var(--infoColor)'
                });
                break;
            case 'success':
                Style(this.Notify)({
                    background: 'var(--successColor)'
                });
                break;
            case 'error':
                Style(this.Notify)({
                    background: 'var(--errorColor)'
                });
                break;
            case 'warning':
                Style(this.Notify)({
                    background: 'var(--waringColor)'
                });
                break;
            default:
                break;
        }
        
    }

    // ------------------ 自定义函数 ------------------
    // 关闭时触发的回调函数
    onCallback;
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();
        EventUtil.addHandler(this.Notify, 'transitionend', (ev:any) =>{
            if ( ev.propertyName === 'opacity' && !this.show ) {
                // 移除当前消息
                notifyContent.removeChild(this);
                this.onCallback();
                // this.dispatchEvent(new CustomEvent('close'));
            }
        });
       
    }

    /**
     * 设置参数
     * @param notify 通知对象
     * @param options NotifyOptions
     */
    setParams(notify, options:NotifyOptions): void {
        notify.type = options.type;
        notify.title = options.title;
        notify.placement = options.placement;
        notify.content = options.content;
        notify.autohide = options.autohide ?? notify.autohide;
        notify.show = true;
        notify.onCallback = options.callback;
        if(notify.autohide) {
            notify.timer = setTimeout(()=>{
                notify.show = false;
                this.close();
            }, options.duration || 5000);
        }
    }
    close(): void {
        this.show = false;
        setTimeout(() => {
            this.remove();
        }, 300);
    }

}
let notifyContent: any = document.getElementById('HiNotifyWrap');
if(!notifyContent){
    notifyContent = document.createElement('div');
    notifyContent.id = 'HiNotifyWrap';
    Style(notifyContent)({
        'position': 'fixed',
        'pointer-events': 'none',
        'right': '15px',
        'top': '15px',
        'z-index': 99
    });
    ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'].forEach((element) => {
        const Div = document.createElement('div');
        const _Style: any = {};
        Div.id = 'HiNotify' + element;
        if (element === 'TopLeft') {
            _Style.left = '15px';
            _Style.top = '15px';
        } else if (element === 'TopRight') {
            _Style.right = '15px';
            _Style.top = '15px';
        } else if (element === 'BottomLeft') {
            _Style.left = '15px';
            _Style.bottom = '15px';
        } else if (element === 'BottomRight') {
            _Style.right = '15px';
            _Style.bottom = '15px';
        }
        Style(Div)({
            'position': 'fixed',
            ..._Style
        });
        notifyContent.appendChild(Div);
    })
    document.body.appendChild(notifyContent);
}
export const HiNotifyService = {
    /**
     * 通用提示
     * @date 2022-06-16
     * @param { MessageOptions} options
     */
    show( options: NotifyOptions ) {
        const notify = new HiNotify();
        switch (options.placement) {
            case 'topleft':
                let HiNTL: any = document.getElementById('HiNotifyTopLeft');
                HiNTL.appendChild(notify);
                break;
            case 'bottomleft':
                let HiNBL: any = document.getElementById('HiNotifyBottomLeft');
                HiNBL.appendChild(notify);
                break;
            case 'bottomright':
                let HiNBR: any = document.getElementById('HiNotifyBottomRight');
                HiNBR.appendChild(notify);
                break;
            case 'topright':
            default:
                let HiNTR: any = document.getElementById('HiNotifyTopRight');
                HiNTR.appendChild(notify);
                break;
        }
        // notifyContent.appendChild(notify);
        notify.setParams(notify, options);
        return notify;
    },
    /**
     * 清空子元素
     */
    close: () => {
        notifyContent.innerHTML = '';
    }
}
