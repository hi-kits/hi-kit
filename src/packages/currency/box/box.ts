/**
 * @const: HiBox 盒子模型
 * @version 0.0.1
 * @author by fico on 2022/07/11
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
// 样式助手
import { display } from '../../../utils/style';
// 样式
const styles = css`
${display('inline-block')}
`;
// 模版文件
const template = html<HiBox>`<slot></slot>`;
// 定义元素
@customElement({
   name: 'h-box',
   styles,
   template,
})
export class HiBox extends HIElement {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------

    // ------------------ 属性 ------------------
    
    /**
     * 外边距 - 清除边框外的区域，外边距是透明的
     * @date 7/11/2022 - 8:41:48 AM
     *
     * @type {number}
     */
    @attr margin: number = 0;
    marginChanged(oldValue, newValue): void {
       this.style.margin = newValue + 'px';
    }
    /**
     * 边框 - 围绕在内边距和内容外的边框
     * @date 7/11/2022 - 8:42:15 AM
     *
     * @type {number}
     */
    @attr border: number = 0;
    borderChanged(oldValue, newValue): void {
        this.style.borderWidth = newValue + 'px';
    }
    
    /**
     * 内边距 - 清除内容周围的区域，内边距是透明的
     * @date 7/11/2022 - 8:42:37 AM
     *
     * @type {number}
     */
    @attr padding: number = 0;
    paddingChanged(oldValue, newValue): void {
        this.style.padding = newValue + 'px';
    }
    
    /**
     * 内容 - 盒子的内容，显示文本和图像
     * @date 7/11/2022 - 8:42:50 AM
     *
     * @type {number}
     */
    @attr content: number;
    contentChanged(oldValue, newValue): void {
        this.style.width = newValue + 'px';
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

