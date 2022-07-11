/**
 * @class: HiNotify 消息通知
 * @version 0.0.1
 * @author by fico on 2022/07/08
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, html, attr, when, ref, observable } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../_mixins/hiElementBase';
// 样式助手
import { Style } from '../../utils/style/style';
// 事件处理
import { EventUtil } from '../../utils/event';
// 获取滚动条位置
import { GetPageScroll } from '../../utils/browser/getPageScroll';
// 样式文件
import { NotifyStyles as styles } from "./notify.style";
// 依赖组件
import { HiButton } from "../button";
import { HiIcon } from "../icon";

/**
 * 方向类型 通过dir可以设置气泡框方向
 * @date 6/17/2022 - 2:00:27 PM
 *
 * @typedef {DirType}
 */
 type DirType = 'top' | 'right' | 'bottom' | 'left' | 'topleft' | 'topright' | 'righttop' | 'rightbottom' | 'bottomleft' | 'bottomright' | 'lefttop' | 'leftbottom' | 'auto';

// 模版文件
const template = html<HiNotify>`
<template>
    
</template>
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

    // ------------------ 属性 ------------------
   
    @attr dir: DirType = 'auto';


    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();

       
    }


}


