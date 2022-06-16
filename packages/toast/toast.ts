/**
 * Toast
 * @class: Toast
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, html } from 'hi-element';
import { ToastStyles as styles } from "./toast.style";

const template = html<Toast>`
<div class="ToastBox">
    ${x => x.content}
</div>
`;
@customElement({
   name: 'h-toast',
   template,
   styles
})
export class Toast extends HIElement {
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
    time: number;
    /**
     * 定时器
     * @public
     */    
    timer!: any;
    // ------------------ 属性 ------------------

    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        this.shadowRoot!.addEventListener('transitionend',(ev:any)=>{
            if(ev.propertyName === 'transform' && !this.show){
                toastContent.removeChild(this);
                this.dispatchEvent(new CustomEvent('close'));
            }
        })
    }
}

let toastContent: any = document.getElementById('ToastWrap');
if(!toastContent){
    toastContent = document.createElement('div');
    toastContent.id = 'ToastWrap';
    toastContent.style = 'position:fixed; pointer-events:none; left:0; right:0; top:-100px; z-index:51;';
    document.body.appendChild(toastContent);
}
/**
 * 消息提示
 * @function get
 * @param { Object } options 请求参数对象
 * @param { string } options.content 显示内容
 * @param { Function } options.time 显示时间间隔
 * @param { Function } options.site 位置
 */
export default (
    options: {
        content: string, 
        time: number, 
        site: Array<any>
    } ) => {
        const toast = new Toast();
        toast.time = options.time;
        toast.content = options.content;
        toast.show = true;
        toastContent.appendChild(toast);
        toast.timer = setTimeout(()=>{
            toast.show = false;
        }, options.time || 2000 );
}
