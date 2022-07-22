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
// 依赖组件
import { HiTips } from "../../data/tips";
// 模版文件
const template = html<HiRate>`
${repeat(
    x => x.rateData,
    html`
    <input 
        type="radio" 
        name="item" 
        value="${(x, c) => c.index}" 
        id="item0${(x, c) => c.index}"
        @change="${(x, c: ExecutionContext) => c.parent.changeFn()}"
    />
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
    rateData: string[] = [];
    
    /**
     * 单选
     * @date 7/18/2022 - 3:37:49 PM
     *
     * @type {*}
     */
    private radio;
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
    
    /**
     * 默认数
     * @date 7/18/2022 - 3:35:03 PM
     *
     * @type {number}
     */
    @attr defaultvalue: number;
    
    /**
     * 图标
     * @date 7/18/2022 - 3:35:17 PM
     *
     * @type {string}
     */
    @attr icon: string;
    
    /**
     * 当前值
     * @date 7/18/2022 - 3:35:28 PM
     *
     * @type {number}
     */
    @attr value: number;
    
    /**
     * 评分长度
     * @date 7/18/2022 - 3:55:55 PM
     *
     * @type {number}
     */
    @attr length: number = 5;
    

    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();
        if (this.length) {
            this.rateData = [];
            for (let index = 0; index < this.length; index++) {
                this.rateData.push('');
            }
        }
        setTimeout(() => {
            if(this.defaultvalue){
                this.checkedFn(this.length - Number(this.defaultvalue));
            };
        }, 10);
    }
    dotClick(ev, idx): void {
        ev.preventDefault();
        this.checkedFn(idx, this.radio[Number(idx)].checked);
    }
    checkedFn(idx, isChecked?): void {
        const _Radio = this.shadowRoot!.querySelectorAll('input[type="radio"]');
        if(_Radio.length > 0) {
            this.radio = _Radio;
            
                this.radio.forEach((el, index)=>{
                    if (isChecked) {
                        this.radio[Number(idx)].checked = false;
                    } else {
                        if (idx < (Number(this.length) + index)) {
                            this.radio[Number(idx)].checked = true;
                        } else {
                            this.radio[Number(idx)].checked = false;
                        }
                    }
                    this.value = (this.length - idx);
                });
            
            this.$emit('change', { value:this.value });
        }
    }

}

