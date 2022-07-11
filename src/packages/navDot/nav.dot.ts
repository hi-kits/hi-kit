/**
 * @class: HiNavDot 导航点
 * @version 0.0.1
 * @author by fico on 2022/07/07
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, html, attr, repeat, observable, ref, elements, children, ExecutionContext } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../_mixins/hiElementBase';
// class 助手
import { Classic } from '../../utils/style/classic';
// 事件处理
import { EventUtil } from '../../utils/event';
// 样式文件
import { NavDotStyles as styles } from "./nav.dot.style";

// 模版文件
const template = html<HiNavDot>`

<ul class="DotStyle ${x => x.type}" ${ref('dotBox')}>
    ${repeat(
        (x, c) => x.dot, 
        html<HiNavDot>`
            <li
                class="${(x, c) => c.parent.current}"
                @click="${(x, c: ExecutionContext) => c.parent.dotClick(c.parentContext.event as MouseEvent, c.index)}">${x => x}
                </li>
        `
    )}
</ul>
<style ${ref("Filter")}></style>
`;
// 定义元素
@customElement({
   name: 'h-nav-dot',
   template,
   styles,
})
export class HiNavDot extends HIElementBase {
    // ------------------ 构造函数 ------------------
    constructor(
    ) {
        super();
    }
    // ------------------ 参数 ------------------
    @observable
    dot: string[] = [];
    dotBox;
    @observable
    Filter: HTMLStyleElement;
    // ------------------ 属性 ------------------
    @attr type: 'fillup' | 'puff' | 'scaleup' = 'fillup' ;
    /**
     * 总数
     * @date 7/8/2022 - 1:52:26 PM
     *
     * @type {number}
     */
    @attr total: number = 6;
    
    /**
     * 当前位置
     * @date 7/8/2022 - 1:57:20 PM
     *
     * @type {number}
     */
    @attr current: number = 0;
    sizeChanged(oldValue, newValue): void {
        setTimeout(() => {
            this.Filter.innerHTML = `
                :host .DotStyle li{
                    width: ${newValue}px!important;
                    height: ${newValue}px!important;
                }`;
        }, 10);
    }
    

    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        for (let index = 0; index < this.total; index++) {
            this.dot.push('');
        }
        
        
    }
    dotClick(ev, idx): void {
        ev.preventDefault();
        if( idx !== this.current ) {
            const children = this.dotBox.children;
            for (let index = 0; index < children.length; index++) {
                const element = children[index];
                Classic.instance.remove(element, 'current');
            }

            Classic.instance.add(ev.target, 'current')
            this.current = idx;

        }
    }
    
    

}


