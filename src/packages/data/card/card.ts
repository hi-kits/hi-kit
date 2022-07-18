/**
 * @class: HiCard 卡片
 * @version 0.0.1
 * @author by fico on 2022/06/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, html, css, ref, observable } from 'hi-element';
// 样式助手
import { Style } from '../../../utils/style/style';
// 配置文件
import { hiConfig, hiConfigStyle } from "../../config";
// 样式
export const styles = css`
${hiConfigStyle()}
.Card{
    position:relative;
    background:var(--colorWhite);
    border: 1px solid var(--colorNeutral05) ;
    font-size:12px;
    overflow:hidden;
}

:host([noBorder]) .Card{
    border: 0;
}

`;
// 模版文件
const template = html<HiCard>`

<div class="Card" ${ref('cardbox')}>
	<slot></slot>
</div>

`;
// 定义元素
@customElement({
   name: 'h-card',
   template,
   styles
})
export class HiCard extends HIElement {
    // ------------------ 构造函数 ------------------
    constructor(
	) {
		super();
	}
	// ------------------ 参数 ------------------
    
    /**
     * 卡片元素
     * @date 6/27/2022 - 6:51:24 PM
     *
     * @type {HTMLDivElement}
     */
    @observable
    cardbox: HTMLDivElement;

	// ------------------ 属性 ------------------
    
	/**
     * 没有边框
     * @date 6/27/2022 - 5:39:55 PM
     *
     * @type {boolean}
     */
    @attr({ mode: "boolean" }) noBorder: boolean;
    
	/**
     * 圆角半径
     * @date 6/27/2022 - 6:50:58 PM
     *
     * @type {number}
     */
    @attr radius: number;
    private radiusChanged(oldValue, newValue): void {
        setTimeout(() => {
            Style(this.cardbox)({
                borderRadius: newValue + 'px',
            });
        }, 10);
    }
	// ------------------ 自定义函数 ------------------

    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
     connectedCallback(): void {
        super.connectedCallback();        
    }



}

