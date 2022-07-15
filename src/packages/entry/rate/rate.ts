/**
 * @class: HiRate 评分
 * @version 0.0.1
 * @author by fico on 2022/07/15
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, attr, html, observable, repeat } from 'hi-element';
// 事件处理
import { EventUtil } from '../../../utils/event';
// 混入基础功能
import { HIElementBase } from '../../_mixins/hiElementBase';
// 样式文件
import { RateStyles as styles } from "./rate.style";
// 模版文件
const template = html<HiRate>`
<input tabindex="5" type="radio" name="item" id="item05" value="5" />
${repeat(
    x => x.rateData,
    html`
    <input tabindex="${(x, c) => c.index}" type="radio" name="item" value="${(x, c) => c.index}" />
    <h-tips class="star-item" tips="${(x, c) => c.parent!.tips[c.index]}">
        <label for="item05">
            <h-icon name="star" color="#f00"></h-icon>
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

    @attr icon: string;
    

    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
     connectedCallback(): void {
        super.connectedCallback();
        
    }

}

