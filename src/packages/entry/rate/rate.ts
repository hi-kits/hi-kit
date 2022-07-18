/**
 * @class: HiRate 评分
 * @version 0.0.1
 * @author by fico on 2022/07/15
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, attr, html, observable, repeat, ExecutionContext } from 'hi-element';
// 事件处理
import { EventUtil } from '../../../utils/event';
// 混入基础功能
import { HIElementBase } from '../../_mixins/hiElementBase';
// 样式文件
import { RateStyles as styles } from "./rate.style";
// 模版文件
const template = html<HiRate>`
${repeat(
    x => x.rateData,
    html`
    <input tabindex="${(x, c) => c.index}" type="radio" name="item" value="${(x, c) => c.index}" id="item0${(x, c) => c.index}" />
    <h-tips class="star-item" tips="${(x, c) => c.parent!.tips[c.length - c.index-1]}">
        <label 
            for="item0${(x, c) => c.index}"
            @click="${(x, c: ExecutionContext) => c.parent.dotClick(c.parentContext.event as MouseEvent, c.index)}"
        >
            <h-icon name="star-fill"></h-icon>
        </label>
    </h-tips>
    `,
    { positioning: true }
)}
`;
// 定义元素
@customElement({
   name: 'h-rate',
   template,
   styles
})
export class HiRate extends HIElementBase {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------ 
    @observable
    rateData: string[] = ['','','','',''];
    radio;

    // ------------------ 属性 ------------------
    
    /**
     * 提示文字
     * 以 , 分割的字符串文本
     * @date 7/15/2022 - 7:32:00 PM
     *
     * @type {(string[] | string)}
     */
    @attr tips: string[] | string = [];
    tipsChanged(oldValue, newValue): void {
        if (typeof newValue == 'string') {
            this.tips = this.tips['split'](',');
        }
    }
    defaultvalue = 0;

    @attr icon: string;
    

    // ------------------ 自定义函数 ------------------
    focus(){
        this.shadowRoot!.querySelector('input[type="radio"]')!['focus']();
    }
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
     connectedCallback(): void {
        super.connectedCallback();
        this.radio = this.shadowRoot!.querySelectorAll('input[type="radio"]');
        // this.radio = [..._Radio].reverse();
        if(this.defaultvalue){
            this.radio[Number(this.defaultvalue)-1].checked = true;
        }
        
    }
    dotClick(ev, idx): void {
        ev.preventDefault();
        if(idx === 0){
            this.radio[idx].checked = false;
        }else{
            this.radio[Number(idx)].checked = true;
        }
        
    }

}

