/**
 * @const: HiTabs 标签页
 * @version 0.0.1
 * @author by fico on 2022/07/01
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, attr, ref, css, html, observable } from 'hi-element';
// 事件处理
import { EventUtil } from '@utils/event';
// 样式助手
import { Style } from '@utils/style';
// 混入基础功能
import { HIElementBase } from '@mixins/hiElementBase';
// 样式文件
import { TabsStyles as styles } from "./tabs.style";
// 模版文件
const template = html<HiTabs>`
<style ${ref("Filter")}></style>
<div class="Tab">
    <div class="TabNavWrap">
        <div 
            class="TabNav"
            ${ref('TabNav')}
            @click="${(x, c) => x.tabNavClick(c.event as MouseEvent)}"
        ></div>
        <div class="TabLine"  ${ref('TabLine')}></div>
    </div>
    <div class="TabContent">
        <div class="TabContentWrap"  ${ref('TabContent')}>
            <slot ${ref('Slot')}>NEED CONTENT</slot>
        </div>
    </div>
</div>
`;
// 定义元素
@customElement({
   name: 'h-tabs',
   styles,
   template,
})
export class HiTabs extends HIElementBase {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    Slot: HTMLSlotElement;
    @observable
    TabNav: HTMLDivElement;
    @observable
    TabLine: HTMLDivElement;
    @observable
    TabContent: HTMLDivElement;
    @observable
    Filter: HTMLStyleElement;
    tabPos = {};
    // ------------------ 属性 ------------------
    
    /**
     * 每个 h-tab 可以指定 disabled 属性，用来禁用该标签页
     * @date 7/1/2022 - 4:50:40 PM
     *
     * @type {boolean}
     */
    @attr disabled: boolean;
    private disabledChanged(oldValue, newValue): void {
        const nav = this.TabNav.querySelector(`.NavItem[key='${newValue}']`);
        if(nav){
            nav['disabled'] = 'disabled';
        }
    }
    /**
     * 可选择标签页风格， flat  card 默认为 flat
     * @date 7/1/2022 - 1:39:04 PM
     *
     * @type {('flat' | 'card' | 'line')}
     */
    @attr type: 'flat' | 'card' | 'line';    
    /**
     * 设置标签头的对齐方式，默认为 start (居左)，可设置 center (居中)、 end （居右）
     * @date 7/1/2022 - 3:30:26 PM
     *
     * @type {('start' | 'center' | 'end')}
     */
    @attr align: 'start' | 'center' | 'end';
    
    /**
     * activekey 作用在 h-tab 上，可以指定切换到具体标签页，也可以指定初始值。
     * @date 7/1/2022 - 3:39:56 PM
     *
     * @type {*}
     */
    @attr activekey;
    private activekeyChanged(oldValue, newValue): void {
        if (!newValue) {
            return
        }
        setTimeout(() => {
            let active = this.tabPos[newValue];
            if( active === undefined ){
                this.activekey = this.Slot.assignedElements()[0].getAttribute('key');
                active = this.tabPos[this.activekey];
            }
            Style(this.TabLine)({
                width: `${active.width}px`,
                transform: `translateX(${active.left}px)`
            });
            Style(this.TabContent)({
                transform: `translateX(${-(active.index) * 100}%)`
            });

            this.Filter.innerHTML = `
            ::slotted(h-tab:not([key="${this.activekey}"])){
                height:0;
                overflow:visible;
            }`;
            if( oldValue!==newValue){
                this.TabNav.parentNode!['scrollLeft'] = active.left + active.width/2-this.TabNav.parentNode!['offsetWidth']/2;
                const pre = this.TabNav.querySelector(`.NavItem.active`);
                if(pre){
                    pre.classList.remove('active');
                }
                const cur = this.TabNav.querySelector(`.NavItem[key='${newValue}']`);
                cur!.classList.add('active');
                // cur!.focus();
                // if(this.init && oldValue!==null){
                //     this.dispatchEvent(new CustomEvent('change',{
                //         detail:{
                //             key:this.activekey,
                //             index:active.index,
                //             label:active.label,
                //         }
                //     }));
                // }
            }
        }, 50);
    }
    


    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();
        EventUtil.addHandler(this.Slot, 'slotchange', ()=>{
            const slots = this.Slot.assignedElements();
            let _html = ''
            slots.forEach((item, index)=>{
                item['key'] ??  (item['key'] = index);
                if( item.tagName === 'H-TAB' ){
                    _html += `<h-button class="NavItem" 
                        ${ item.getAttribute('disabled') !==null ? "disabled" : "" } 
                        key=${item['key']} >
                        ${ item.getAttribute('label') }
                        </h-button>`;
                }
            })
            this.TabNav.innerHTML = _html;
            this.inittab();
            if( !this.activekey ){
                this.activekey = slots[0]['key'];
            } else {
                this.activekey = this.activekey;
            }
            
            // this.init = true;
        });
        
    }
    tabNavClick(ev): void {
        const item = ev.target!['closest']('h-button');
        if(item){
            if (item.getAttribute('disabled') !== null) {
                return
            }
            this.activekey = item.getAttribute('key');
        }
    }
    inittab() {
        const items = this.TabNav.querySelectorAll('.NavItem');
        Array.from(items).forEach((item, index)=>{
            this.tabPos[item.getAttribute('key') ?? 0] = {
                index: index,
                width: item['offsetWidth'],
                left: item['offsetLeft'],
                label: item.textContent
            };
        })
        if(this.activekey != null || this.activekey != undefined){
            Style(this.TabLine)({
                width: `${this.tabPos[this.activekey].width}px`,
                transform: `translateX(${this.tabPos[this.activekey].left}px)`
            });
        }
    }

}

