/**
 * @class: HiCard 卡片
 * @version 0.0.1
 * @author by fico on 2022/06/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, html } from 'hi-element';
import { CardStyles as styles } from "./card.style";

const template = html<HiCard>`

<div class="Card">
	<slot></slot>
</div>

`;
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

	// ------------------ 属性 ------------------
	@attr
	noBorder: boolean;
	// ------------------ 自定义函数 ------------------

    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
     connectedCallback(): void {
        super.connectedCallback()
        
    }



}

