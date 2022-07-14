/**
 * @const: HiSlider 滑块
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
// 事件处理
import { EventUtil } from '../../utils/event';
// 配置文件
import { hiConfigStyle } from '../config';
// 样式文件
const styles = css`
${hiConfigStyle()}
:host{ 
    box-sizing:border-box; 
    display:flex; 
    padding:0 5px;
}
:host([disabled]){ 
    opacity:.8; 
    cursor:not-allowed; 
}
:host([disabled]) input[type="range"]{ 
    pointer-events:none; 
}
#slider-con{ 
    display:flex; 
    padding:5px 0; 
    width:100%;
    margin: auto;
}
::-moz-focus-inner,::-moz-focus-outer{
    border:0;
    outline : 0;
}
:host([showtips]){
    pointer-events:all;
}
input[type="range"]{
    pointer-events:all;
    margin:0 -5px;
    width: calc( 100% + 10px );
    -webkit-appearance: none;
    outline : 0;
    /*
    background: rgba(0,0,0,.1);
    */
    height: 12px;
    background:none;
    border-radius:2px;
}
input[type="range"]::-webkit-slider-runnable-track{
    display: flex;
    align-items: center;
    position: relative;
    height: 2px;
    border-radius:2px;
    background:linear-gradient(to right, var(--themeColor) calc(100% * var(--percent)), rgba(0,0,0,.1) 0% )
}
input[type="range"]::-moz-range-progress {
    display: flex;
    align-items: center;
    position: relative;
    height: 2px;
    border-radius:2px;
    outline : 0;
    background:var(--themeColor)
}
input[type="range"]::-moz-range-track{
    height: 2px;
    background: rgba(0,0,0,.1);
}
input[type="range"]::-webkit-slider-thumb{
    -webkit-appearance: none;
    position: relative;

    width: 14px;
    height: 14px;
    margin-top: -5px;
    background-color: var(--colorWhite);
    border:2px solid var(--themeColor);
    border-radius: 50%;
    box-shadow: 0;
    cursor: pointer;
    transition: border-color .3s,box-shadow .6s,transform .3s cubic-bezier(.18,.89,.32,1.28);
}
input[type="range"]::-moz-range-thumb{
    box-sizing:border-box;
    pointer-events:none;
    border:2px solid var(--themeColor);
    position: relative;
    width:10px;
    height:10px;
    border-radius: 50%;
    background:var(--themeColor);
    transition:.2s cubic-bezier(.12, .4, .29, 1.46);
}
input[type="range"]:focus{
    z-index:2;
}
input[type="range"]::-webkit-slider-thumb:active,
input[type="range"]:focus::-webkit-slider-thumb{
    transform:scale(1.2);
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background: var(--colorWhite);
}
input[type="range"]::-moz-range-thumb:active,
input[type="range"]:focus::-moz-range-thumb{
    transform:scale(1.2);
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background: var(--colorWhite);
}
:host([vertical]) #slider-con{
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%, -50%) rotate(-90deg);
    width:calc( var(--h,300px) - 10px)
    
}
:host([vertical]) #slider-con::before{
    writing-mode: vertical-lr;
    padding: 10px 6px;
}
:host([vertical]){
    display:inline-flex;
    position:relative;
    width:20px;
}
:host([vertical]) h-tips::before,:host([vertical]) h-tips::after{
    left: calc( var(--percent,.5) * 100% + 5px );
}
:host(:focus-within) #slider-con,:host(:hover) #slider-con{
    z-index:10
}
`;
// 模版文件
const template = html<HiSlider>`
<template>
    <h-tips id='slider-con'
        dir=${x => x.vertical ? "right" : "top"} 
        style="--percent:${x => (x.defaultvalue-x.min)/(x.max-x.min)}" 
        tips="${x => (x.showtips && !x.disabled) ? x.defaultvalue : '' }" 
        suffix="${x => x.suffix}" 
        prefix="${x => x.prefix}"
        ${ref('sliderCon')}
    >
        <input id='slider'
            value=${x => x.defaultvalue} 
            min=${x => x.min} 
            max=${x => x.max} 
            step=${x => x.step} 
            ${x => x.disabled ? "disabled" : ""} 
            type='range'
            ${ref('slider')}
        />
    </h-tips>
</template>
`;

// 定义元素
@customElement({
   name: 'h-slider',
   styles,
   template,
})
export class HiSlider extends HIElement {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------


    

    resizeObserver;
    @observable
    sliderCon: HTMLElement;
    @observable
    slider: HTMLInputElement;
    private _value: number;
    public get value(): number {
        return this._value;
    }
    public set value(value: number) {
        this._value = value;
        this.slider.value = String(value);
        this.sliderCon.style.setProperty('--percent',String((this.value-this.min)/(this.max-this.min)));

        this.sliderCon.setAttribute('tips', this.showtips != null && !this.disabled? String(this.value) : '');
    }
    @attr suffix: string;
    @attr prefix: string;
    _oninput;
    /**
     * svg 对象
     */
    @observable
    loading: SVGElement;
    // ------------------ 属性 ------------------
    @attr showtips: boolean;
    private showtipsChanged(oldValue, newValue): void {
        if(newValue===null||newValue===false){
            this.removeAttribute('showtips');
        }else{
            this.setAttribute('showtips', '');
        }
    }
    @attr defaultvalue: number = 0;
    @attr step: number = 1;
    @attr max: number = 100;
    @attr min: number = 0;

    @attr disabled: boolean;
    @attr vertical: boolean;

    // ------------------ 自定义函数 ------------------

    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        this.slider.focus();
        if( this.vertical ){
            this.resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const { height } = entry.contentRect;
                    this.sliderCon.style.setProperty('--h',height + 'px');
                }
            });
            this.resizeObserver.observe(this);
        };
        EventUtil.addHandler(this.slider, 'input', (ev) => {
            this.value = Number(this.slider.value);
            this._oninput = true;
            ev.stopPropagation();
            this.$emit('input', { value: this.slider.value });
        });
        EventUtil.addHandler(this.slider, 'change', (ev) => {
            this.value = Number(this.slider.value);
            this._oninput = false;
            this.$emit('change', { value: this.slider.value });
        });
        EventUtil.addHandler(this.shadowRoot, 'wheel', (ev) => {
            if( Number(getComputedStyle(this.slider).zIndex) == 2){
                ev.preventDefault();
                if(ev.deltaY<0 && !this.vertical || ev.deltaY>0 && this.vertical){
                    this.value = (Number(this.value) - this.step * 5);
                }else{
                    this.value = (Number(this.slider.value) + this.step * 5);
                }
                
                this.$emit('change', { value: this.slider.value })
            }
        });
    }
    disconnectedCallback() {
        if( this.vertical ){
            this.resizeObserver.unobserve(this);
        }
    }
    attributeChangedCallback1 (name, oldValue, newValue) {
        if( this.slider && oldValue!==newValue && !this._oninput){
            if(name == 'disabled'){
                if(newValue!==null){
                    this.slider.setAttribute('disabled', 'disabled');
                }else{
                    this.slider.removeAttribute('disabled');
                }
            }else{
                this.slider[name] = newValue;
                this[name] = newValue;
                this.sliderCon.style.setProperty('--percent', String((this.value-this.min)/(this.max-this.min)));
                if( name === 'suffix'){
                    this.suffix = newValue;
                }
            }
        }
    }
}

