/**
 * @class: HiToast Toast提示
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, html } from 'hi-element';
// 事件处理
import { EventUtil } from '../_utils/event';

// 样式文件
import { ToastStyles as styles } from "./toast.style";

const template = html<HiToast>`
<div class="ToastBox" style="${x => x.position()}">
    ${x => x.content}
</div>
`;
// 定义元素
@customElement({
   name: 'h-toast',
   template,
   styles
})
export class HiToast extends HIElement {
    // ------------------ 构造函数 ------------------
    constructor(
    ) {
        super();
    }
    // ------------------ 参数 ------------------
    /**
     * 显示状态
     * @type boolean
     */
    private _show: boolean = false;
    public get show(): boolean {
        return this._show;
    }
    public set show(value: boolean) {
        this._show = value;
        if ( value === null || value === false){
            this.removeAttribute('show');
        } else {
            this.setAttribute('show', '');
        }
    }
    /**
     * 显示内容
     * @public
     */
    content = '';
    /**
     * 间隔时间
     * @public
     */
    duration: number | undefined;
    /**
     * 定时器
     * @public
     */    
    timer!: any;
    
    /**
     * 显示位置信息设置 
     * @date 6/16/2022 - 2:03:25 PM
     * @examples [10,10] or ['45%'] or [,,20,20] or ['20%',20]
     * @type {Array<string>}
     */
    site: Array<string> | undefined;
    // ------------------ 属性 ------------------

    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        EventUtil.addHandler(this.shadowRoot!, 'transitionend',(ev:any)=>{
            if(ev.propertyName === 'transform' && !this.show){
                // DOM.removeChildNodes(toastContent);
                toastContent.removeChild(this);
                this.$emit('close');
            }
        });
        this.position();
    }
    
    
    /**
     * 及时显示位置
     * @date 6/16/2022 - 2:02:42 PM
     *
     * @returns {string}
     */
    position(): string {
        if ( !this.site ) {
            return '';
        };
        let CSS: any = {};
        for ( let i=0; i < this.site.length; i++ ) {
            if( !this.site[i] ){
                continue;
            } else {
                let _Site;
                if ( typeof this.site[i] === 'string' && this.site[i].indexOf('%') >= 0 ) {
                    _Site = this.site[i];
                } else {
                    _Site = this.site[i] + 'px';
                };
                switch(i){
                    case 0: CSS.top = _Site; CSS.bottom = 'auto'; break;
                    case 1: CSS.right = _Site; CSS.left = 'auto'; CSS['margin-left'] = 'auto'; break;
                    case 2: CSS.bottom = _Site; break;
                    case 3: CSS.left = _Site; CSS['margin-left'] = 'auto'; break;
                };
            };
        };
        return `top:${CSS.top}; right:${CSS.right}; bottom:${CSS.bottom}; left:${CSS.left}; margin-left:${CSS['margin-left']};`;        
    }
}

let toastContent: any = document.getElementById('HiToastWrap');
if(!toastContent){
    toastContent = document.createElement('div');
    toastContent.id = 'HiToastWrap';
    toastContent.style = 'position:fixed; pointer-events:none; left:0; right:0; top:-100px; z-index:88;';
    document.body.appendChild(toastContent);
}

/**
 * 消息提示
 * @function get
 * @date 6/17/2022 - 1:50:51 PM
 *
 * @export
 * @param {{
        content: string, 
        duration: number, 
        site: Array<any>,
    }} options
 * @param { Object } options 请求参数对象
 * @param { string } options.content 显示内容
 * @param { Function } options.duration 显示时间间隔
 * @param { Function } options.site 位置
 */
export function HiToastService (
    options: {
        content: string, 
        duration?: number, 
        site?: Array<any>,
    }) {
        const toast = new HiToast();
        toast.duration = options.duration;
        toast.content = options.content;
        toast.site = options!.site;
        toast.show = true;
        toastContent.appendChild(toast);
        toast.timer = setTimeout(()=>{
            toast.show = false;
        }, options.duration || 2000 );
}
