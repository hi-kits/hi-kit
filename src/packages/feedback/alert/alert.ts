/**
 * @class: HiAlert 警告提示
 * @version 0.0.1
 * @author by fico on 2022/06/17
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, html, attr, when, ref, observable } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../../_mixins/hiElementBase';
// 样式助手
import { Style } from '../../../utils/style/style';
// 样式文件
import { AlertStyles as styles } from "./alert.style";
// 依赖组件
import { HiButton } from "../../currency/button";
import { HiIcon } from "../../currency/icon";

// 模版文件
const template = html<HiAlert>`
<template>
    ${when(
        x => x.showIcon,
        html<HiAlert>`
            <h-icon ${ref('icon')} name="${x => x.iconName}"
             style="margin-right: 12px; color:${x => x.iconColor}"
            ></h-icon>
        `
    )}
    <div class="Slot">
        <div class="Title">${x => x.title}</div>
        <slot></slot>
    </div>
    ${when(
        x => x.closeable,
        html`
        <h-button type="flat" size="small" size="16"
            @click="${x => x.close()}"
        >
            <h-icon name="close" size="12"></h-icon>
        </h-button>
        `
    )}
</template>
`;
// 定义元素
@customElement({
   name: 'h-alert',
   template,
   styles,
   shadowOptions: { mode: 'closed'},
})
export class HiAlert extends HIElementBase {
    // ------------------ 构造函数 ------------------
    constructor() {
        super();
    }
    // ------------------ 参数 ------------------
    iconName;
    iconColor;
    @observable
    icon: HTMLElement;
    // ------------------ 属性 ------------------
    /**
     * 颜色
     * 通过color可以设置提示框为任意颜色，优先级高于type
     * @date 6/17/2022 - 1:55:30 PM
     *
     * @type {string}
     */
    colorChanged(oldValue, newValue): void {
        this.style.setProperty('--color',newValue);
    }
    
    /**
     * 可关闭的警告提示
     * 默认不显示关闭按钮
     * @date 7/8/2022 - 3:41:26 PM
     *
     * @type {boolean}
     */
    @attr({ mode: "boolean" }) closeable: boolean;
    
    /**
     * 显示图标
     * @date 7/8/2022 - 4:09:41 PM
     *
     * @type {boolean}
     */
    @attr({ mode: "boolean" }) showIcon: boolean;
    
    /**
     * 标题
     * @date 7/8/2022 - 3:58:17 PM
     *
     * @type {string}
     */
    @attr title: string;
    
    /**
     * 展示样式
     * 可以通过type设置框的颜色，有四种样式
     * @date 7/8/2022 - 3:40:58 PM
     *
     * @type {('success' | 'error' | 'warning' | 'info')}
     */
    @attr type: 'success' | 'error' | 'warning' | 'info';
    typeChanged(oldValue: string, newValue: string): void {
        switch (newValue) {
            case 'info':
                this.iconName = 'info-circle';
                this.iconColor = '#1890ff';
                break;
            case 'success':
                this.iconName = 'check-circle';
                this.iconColor = '#52c41a';
                break;
            case 'error':
                this.iconName = 'error';
                this.iconColor = '#f4615c';
                break;
            case 'warning':
                this.iconName = 'warning-circle';
                this.iconColor = '#faad14';
                break;
            default:
                break;
        }
    }


    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();
        
    }
    close(): void {
        this.remove();
    }
    

}


