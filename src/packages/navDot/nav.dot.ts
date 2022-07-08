/**
 * @class: HiNavDot 导航点
 * @version 0.0.1
 * @author by fico on 2022/07/07
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, html, attr, repeat, observable, ref, elements, children } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../_mixins/hiElementBase';
// class 助手
import { Classic } from '../_utils/classic';
// 事件处理
import { EventUtil } from '../_utils/event';
// 样式文件
import { NavDotStyles as styles } from "./nav.dot.style";

// 模版文件
const template = html<HiNavDot>`
<ul class="DotStyle Fillup">
    ${repeat(
        (x, c) => x.dot, 
        html`
            <li
                class="${(x, c) => x}"
                @click="${(x, c) => c.parent.dotClick(c.parentContext.event as MouseEvent, c.index)}">${x => x}
            </li>
        `
    )}
</ul>
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
    slots: HTMLSlotElement;
    options;
    @observable
    class = 'w111';
    elements;
    @observable
    dot: string[] = ['1','2'];
    // ------------------ 属性 ------------------
    @attr total: number = 2;
    @attr current: number = 0;
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
    
    

    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        function supportImport() {
            return 'import' in document.createElement('link');
          }
          
          
        // EventUtil.addHandler(this.slots, 'slotchange', ()=>{
        //     this.elements  = [].slice.call(this.querySelectorAll('a'));
            
        //     this.elements.forEach( ( dot, idx ) => {
        //         dot.addEventListener( 'click', ( ev ) => {
        //             ev.preventDefault();
        //             if( idx !== this.current ) {
        //                 Classic.instance.remove(this.elements[ this.current ], 'current');
        //                 // this.elements[ current ].className = '';
    
        //                 // special case
        //                 // if( idx < current ) {
        //                 // 	dot.className += ' current-from-right';
        //                 // }
    
        //                 setTimeout( () => {
        //                     Classic.instance.add(dot, 'current')
        //                     this.current = idx;
                            
        //                 }, 25 );						
        //             }
        //         } );
        //     } );
        // });
        
    }
    dotClick(ev, idx): void {
        ev.preventDefault();
        if( idx !== this.current ) {
            // Classic.instance.remove(ev.target, 'current');
            // ev.target.className = '';
            // ev.target.parexnt.element.class = 'ws';

            // special case
            // if( idx < current ) {
            // 	dot.className += ' current-from-right';
            // }

            setTimeout( () => {
                ev.target.className = 'current';
                this.current = idx;
                
            }, 25 );
        }
    }
    
    

}


