/**
 * @const: HiSteps 步骤条
 * @version 0.0.1
 * @author by fico on 2022/06/29
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { customElement, attr, css,  html } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../../_mixins/hiElementBase';
// 样式文件
const styles = css`
:host {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgb(0 0 0 / 85%);
    font-size: 14px;
    line-height: 1.5715;
    list-style: none;
    display: flex;
    width: 100%;
    text-align: initial;
}
:host([dir="vertical"]) {
    display: flex;
    flex-direction: column;
}

`;

// 模版文件
const template = html<HiSteps>`<slot></slot>`;
// 定义元素
@customElement({
   name: 'h-steps',
   styles,
   template,
})
export class HiSteps extends HIElementBase {
    // ------------------ 构造函数 ------------------
    
    // ------------------ 参数 ------------------
    // ------------------ 属性 ------------------
    /**
     * 通过 start 来设置步骤条的起始序号
     * @date 6/30/2022 - 1:08:53 AM
     *
     * @type {number}
     */
    @attr start: number = 0;
    
    /**
     * 指定当前步骤，从 0 开始记数。在子 h-step 元素中，可以通过 status 属性覆盖状态
     * @date 6/30/2022 - 1:09:26 AM
     *
     * @type {number}
     */
    @attr current: number;

    /**
     * 指定步骤条方向。目前支持水平（ horizontal ）和竖直（ vertical ）两种方向
     * @date 6/30/2022 - 4:45:47 PM
     *
     * @type {("horizontal" | "vertical")}
     */
    @attr dir: "horizontal" | "vertical";
    /**
     * 点状步骤条
     * @date 6/30/2022 - 5:47:42 PM
     *
     * @type {boolean}
     */
    @attr({ mode: "boolean" }) dot: boolean;

    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();        
        this.childrenFn(()=> {
            for (let index = 0; index < this.children.length; index++) {
                const element = this.children[index];
                element.setAttribute('index', String(Number(this.start)+index));
                if ( index < this.current) {
                    element.setAttribute('status', 'finish');
                }
                if ( this.dir ) {
                    element.setAttribute('dir', this.dir);
                }
                if ( this.getAttribute('dot') ) {
                    element.setAttribute('dot','');
                }
            }
            this.children[this.current].setAttribute('status', 'process');
        });
    }

}

