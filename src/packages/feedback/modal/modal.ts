/**
 * @class: HiModal 对话框
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, html, ref, when, observable } from 'hi-element';
// 样式助手
import { Style } from '@utils/style';
// 样式文件
import { ModalStyles as styles } from "./modal.style";
// 依赖组件
import { HiButton } from "@currency/button";
import { HiIcon } from "@currency/icon";
import { HiInput } from "@entry/input";

/**
 * 对话框类型
 */
type ModalType = 'alert' | 'confirm' | 'prompt';

/**
 * 对话框参数
 * @function get
 * @param { Object } options 请求参数对象
 * @param { string } options.title 标题
 * @param { ModalType } options.type 类型
 * @param { string } options.content 内容
 * @param { string } options.oktext 确认键文本
 * @param { string } options.canceltext 取消键文本
 * @param { function } options.ok 确认回调
 * @param { function } options.cancel 取消回调
 */
interface ModalOptions {
    title?: string;
    type?: ModalType;
    content: string;
    oktext: string;
    ok?: () => void;
    canceltext: string;
    cancel?: () => void;
}
// 模版文件
const template = html<HiModal>`
<div class="Modal">
    <div class="ModalContent">
        <div class="ModalTitle">${x => x.title}</div>
        <h-button 
            class="ModalClose" 
            @click="${(x, c) => x.close()}"
        ><h-icon name="close" size="14"></h-icon>
        </h-button>
        <div class="ModalBody">
            <slot></slot>
            ${when(
                x => x.type=="prompt",
                html`<h-input></h-input>`
            )}
        </div>
        <div class="ModalFooter">
            <h-button class="ModalCancel"
                @click="${(x, c) => x.close()}"
            >${x => x.canceltext}</h-button>
            <h-button class="ModalSubmit" type="primary"
                @click="${(x, c) => x.okfn()}"
            >${x => x.oktext}</h -button>
        </div>
    </div>
</div>

`;
// 定义元素
@customElement({
   name: 'h-modal',
   template,
   styles
})
export class HiModal extends HIElement {
    // ------------------ 构造函数 ------------------
    constructor() {
        super();
    }
    // ------------------ 参数 ------------------
    ok = (() => {});
    cancel = (() => {});
    loading;
    autoclose = true;
    // ------------------ 属性 ------------------
    
    /**
     * 取消键文本
     * @date 7/5/2022 - 11:23:08 AM
     *
     * @public
     * @type {!string}
     */
    @attr canceltext: string = '取消';

    
    /**
     * 确定键文本
     * @date 7/5/2022 - 11:23:18 AM
     *
     * @public
     * @type {!string}
     */
    @attr({ mode: "reflect" }) oktext:string = '确定';

    
    /**
     * 对话框类型
     * @date 7/5/2022 - 11:08:04 AM
     *
     * @type {ModalType}
     */
    @attr type: ModalType;
    
    /**
     * 标题
     * @date 7/5/2022 - 11:09:40 AM
     *
     * @type {string}
     */
    @attr title: string;
    
    /**
     * 显示open
     * 当 HiModal 内容比较复杂时，可以直接写在页面body上，通过 open 属性来控制显示
     * @date 7/5/2022 - 11:29:08 AM
     *
     * @type {boolean}
     */
    @attr({ mode: "boolean" }) open: boolean

    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback()
       
    }
    /**
     * 关闭弹窗
     */
    close(): void {
        this.cancel();
        this.open = false;
    }
    okfn(): void {
        this.dispatchEvent(new CustomEvent('submit'));
        if(!this.loading && this.autoclose){
            this.open = false;
        }
        this.ok();
    }
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
        modal:any, 
        type: string | undefined, 
        options: ModalOptions
    ): void {
        modal.type = type;
        modal.open = true;
        modal.ok = options.ok ?? modal.ok;
        modal.cancel = options.cancel ?? modal.cancel;
        modal.textContent = options.content;
        modal.title = options.title;
        if (type == 'prompt') {
            modal.autoclose = false;
        }
    }
}

let modalContent: any = document.getElementById('HiModalWrap');
if(!modalContent){
    modalContent = document.createElement('div');
    modalContent.id = 'HiModalWrap';
    Style(modalContent)({
        'position': 'fixed',
        'left': 0,
        'right': 0,
        'top': '10px',
        'z-index': 51
    });
    document.body.appendChild(modalContent);
}

export const HiModalService = {
    /**
     * alert
     * @date 2022-06-16
     * @param { ModalOptions} options
     */
    alert: ( options: ModalOptions ) => {
        const modal = new HiModal();
        modalContent.appendChild(modal);
        options.title = options.title || 'Alert';
        modal.setParams(modal, 'alert', options);
    },
 
    /**
     * confirm
     * @date 2022-06-16
     * @param { ModalOptions} options
     */
    confirm: ( options: ModalOptions ) => {
        const modal = new HiModal();
        modalContent.appendChild(modal);
        options.title = options.title || 'Confirm';
        modal.setParams(modal, 'confirm', options);
    },
    /**
     * prompt
     * @date 2022-06-16
     * @param { ModalOptions} options
     */
    prompt: ( options: ModalOptions ) => {
        const modal = new HiModal();
        modalContent.appendChild(modal);
        options.title = options.title || 'Prompt';
        modal.setParams(modal, 'prompt', options);
    },
}
