/**
 * @class: HiTips 文字提示
 * @version 0.0.1
 * @author by fico on 2022/06/17
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, html, attr } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../_mixins/hiElementBase';
// 样式文件
import { TipsStyles as styles } from "./tips.style";

/**
 * 方向类型 通过dir可以设置气泡框方向
 * @date 6/17/2022 - 2:00:27 PM
 *
 * @typedef {DirType}
 */
type DirType = 'top' | 'right' | 'bottom' | 'left' | 'topleft' | 'topright' | 'righttop' | 'rightbottom' | 'bottomleft' | 'bottomright' | 'lefttop' | 'leftbottom' | 'auto';
// 模版文件
const template = html<HiTips>`<slot></slot>`;
// 定义元素
@customElement({
   name: 'h-tips',
   template,
   styles,
   shadowOptions: { mode: 'closed'},
})
export class HiTips extends HIElementBase {
    // ------------------ 构造函数 ------------------
    constructor() {
        super();
    }
    // ------------------ 参数 ------------------
    
    // ------------------ 属性 ------------------
    /**
     * 颜色
     * 通过color可以设置提示框为任意颜色，优先级高于type
     * @date 6/17/2022 - 1:55:30 PM
     *
     * @type {string}
     */
    colorChanged(oldValue, newValue): void {
        this.style.setProperty('--colorNeutral7',newValue);
    }
    
    /**
     * 方向
     * 通过dir可以设置气泡框方向，默认为top，可以取值top、right、bottom、left、topleft、topright、righttop、rightbottom、bottomleft、bottomright、lefttop、leftbottom。
     * @date 6/17/2022 - 3:26:51 PM
     *
     * @type {DirType}
     */
    @attr dir: DirType = 'top';
    
    /**
     * 后缀
     * @date 6/17/2022 - 5:04:58 PM
     *
     * @type {string}
     */
    @attr suffix: string;

    /**
     * 展示类型
     * 可以通过type设置提示框的颜色，有三种类型
     * @date 6/17/2022 - 5:08:51 PM
     *
     * @type {('success' | 'error' | 'warning')}
     */
    @attr type: 'success' | 'error' | 'warning';
    
    /**
     * 前缀
     * @date 6/17/2022 - 5:05:22 PM
     *
     * @type {string}
     */
    @attr prefix: string;
    
    /**
     * 添加show属性可以主动控制提示框的出现时机，不再与hover和focus关联，可以取值true和false。
     * @date 6/17/2022 - 4:00:31 PM
     *
     * @type {boolean}
     */
    @attr({ mode: "boolean" }) show: boolean;
    /**
     * 提示信息
     * 提示文字。如果不设置则不显示提示
     * @date 6/17/2022 - 3:27:36 PM
     *
     * @type {string}
     */
    @attr tips: string;

    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        if( this.dir === 'auto' ){
            const { left, top, width, height } = this.getBoundingClientRect();
            const w = document.body.scrollWidth;
            const h = document.body.scrollHeight;
            const TIP_SIZE = 50;
            if( top < TIP_SIZE ){
                this.dir = 'bottom';
            }
            if( h-top-height < TIP_SIZE ){
                this.dir = 'top';
            }
            if( left < TIP_SIZE ){
                this.dir = 'right';
            }
            if( w-left-width < TIP_SIZE ){
                this.dir = 'left';
            }
        }
        
    }
    
    

}


