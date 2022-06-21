/**
 * @const: HiSlider
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, css,  html, when } from 'hi-element';

import "./font_icon/iconfont.js";

const styles = css`
:host{
    font-size:inherit;
    display:inline-block;
    transition:.3s;
}
.icon {
    display:block;
    width: 1em;
    height: 1em;
    margin: auto;
    fill: currentColor;
    overflow: hidden;
    /*transition:inherit;*/
}
:host([spin]){
    animation: rotate 1.4s linear infinite;
}
@keyframes rotate{
    to{
        transform: rotate(360deg); 
    }
}
`
const template = html<HiIcon>`
<svg class="icon" aria-hidden="true" id="icon" viewBox="0 0 ${x => x.view} ${x => x.view}" ${ref('svg')}>
<use xlink:href="#icon-totop"></use>
    ${x => x.path ? html`<path ${ref('paths')}></path>` : html`<use ${ref('use')}></use>`}
</svg>
`;
@customElement({
   name: 'h-icon',
   styles,
   template,
})
export class HiIcon extends HIElement {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    @observable
    use: SVGElement;
    @observable
    paths: SVGElement;
    @observable
    svg: SVGElement;
    
    
    // ------------------ 属性 ------------------
    @attr name: string;
    private nameChanged(oldValue, newValue): void {
        this.use && (this.use!.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `icon.svg#icon-${newValue}`));
    }
    @attr view: number = 1024;
    @attr path: string;
    private pathChanged(oldValue, newValue): void {
        this.paths && (this.paths!.setAttribute("d", newValue));
    }
    @attr size: string;
    private sizeChanged(oldValue, newValue): void {
        this.svg && (this.svg!.style.fontSize = newValue + 'px');
    }
    @attr color: string;
    private colorChanged(oldValue, newValue): void {
        this.svg && (this.svg!.style.color = newValue);
    }

    // ------------------ 自定义函数 ------------------

    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
    }
}

