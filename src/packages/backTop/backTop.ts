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
import { HIElementBase } from '../_mixins/hiElementBase';
// 样式助手
import { Style } from '../_utils/style/style';
// 事件处理
import { EventUtil } from '../_utils/event';
// 获取滚动条位置
import { GetPageScroll } from '../_utils/browser/getPageScroll';
// 样式文件
import { BackTopStyles as styles } from "./backTop.style";
// 依赖组件
import { HiButton } from "../button";
import { HiIcon } from "../icon";

// 模版文件
const template = html<HiBackTop>`
<template>
    ${when(
        x => x.show,
        html`<div class="BackToTop">
        <h-button shape='circle'  @click="${x => x.backToTop()}" type="primary">
        <h-icon name="up" color="#ffffff"></h-icon>
        </h-button>
    </div>`
    )}
</template>
`;
// 定义元素
@customElement({
   name: 'h-back-top',
   template,
   styles,
   shadowOptions: { mode: 'closed'},
})
export class HiBackTop extends HIElementBase {
    // ------------------ 构造函数 ------------------
    constructor() {
        super();
    }
    // ------------------ 参数 ------------------
    @observable
    show: boolean;
    // ------------------ 属性 ------------------
   



    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();

        EventUtil.addHandler(window, "scroll", () => {
            const ScrollTop = GetPageScroll().Y;
            if(ScrollTop >= 200){
                this.show = true;
            } else if ( ScrollTop < 100 ){
                this.show = false;
            };
        });
        
    }

    backToTop(): void{
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        });
        // this.scrollToTop()
        
    }
    scrollToTop() {
        let scrollTop = document.documentElement.scrollTo || document.body.scrollTop
        if (Number(scrollTop) > 0) {
            window.requestAnimationFrame(this.scrollToTop)
            window.scrollTo(0, Number(scrollTop) - Number(scrollTop) / 8)
        }
    }

}


