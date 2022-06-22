/**
 * @const: HiSlider
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, observable, ref, css,  html, when } from 'hi-element';


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
<svg class="icon" id="icon" aria-hidden="true" viewBox="0 0 1024 1024" style="font-size: 50px; color: rgb(63, 81, 181);">
            <path id="path" d="M858.5 763.6c-18.9-44.8-46.1-85-80.6-119.5-34.5-34.5-74.7-61.6-119.5-80.6-0.4-0.2-0.8-0.3-1.2-0.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-0.4 0.2-0.8 0.3-1.2 0.5-44.8 18.9-85 46-119.5 80.6-34.5 34.5-61.6 74.7-80.6 119.5C146.9 807.5 137 854 136 901.8c-0.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c0.1 4.4 3.6 7.8 8 7.8h60c4.5 0 8.1-3.7 8-8.2-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
        </svg>
<svg class="icon" aria-hidden="true" id="icon" viewBox="0 0 ${x => x.view} ${x => x.view}" ${ref('svg')}>
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
        this.use && (this.use!.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `./icon.svg#icon-${newValue}`));
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

