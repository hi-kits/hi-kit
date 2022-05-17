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
    <div class="message">短发短发
        <slot>dfsdf</slot>
    </div>
 `;
@customElement({
   name: 'h-message',
   template,
   styles
})
export class Message extends HIElement {


    /**
     * The Message Service type.
     * Service 的类型。可选值：
     * info:  默认的消息提示。
     * success:  成功的消息提示。
     * error: 失败的消息提示。
     * warning: 警告的消息提示。
     * loading: 加载中的消息提示。
     */

    @attr type!: 'info' | 'success' | 'error' | 'warning' | 'loading';



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
        if(value===null||value===false){
            this.removeAttribute('show');
        }else{
            this.setAttribute('show', '');
        }
    }
    @observable
    
    // public get show(): boolean {
    //     return this._show;
    // }
    // public set show(value: boolean) {
    //     this._show = value;
    // }
    timer!: any;

    connectedCallback() {
        super.connectedCallback();
        this.shadowRoot!.addEventListener('transitionend',(ev:any)=>{
            if(ev.propertyName === 'transform' && !this.show){
                messageContent.removeChild(this);
                this.dispatchEvent(new CustomEvent('close'));
            }
        })
    }

    // static definition = {
    //     name: 'h-message',
    //     template,
    //     styles,
    //     attributes: [
    //       'value', // same attr/prop
    //       { attribute: 'some-attr', property: 'someAttr' }, // different attr/prop
    //     ]
    //   };
    
    //   value = 'sdfsdfsdf';
    //   someAttr = '';

}

let messageContent: any = document.getElementById('MessageContent');
if(!messageContent){
    messageContent = document.createElement('div');
    messageContent.id = 'MessageContent';
    messageContent.style = 'position:fixed; pointer-events:none; left:0; right:0; top:10px; z-index:51;';
    document.body.appendChild(messageContent);
}

// HIElement.define(Message);
export default {
    info: () => {
        const message = new Message();
        messageContent.appendChild(message);
        message.show = true;
        message.textContent = '';
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
