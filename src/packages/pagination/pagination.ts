/**
 * @class: HiPagination 分页
 * @version 0.0.1
 * @author by fico on 2022/06/17
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, html, attr, ref, observable } from 'hi-element';
import { PaginationStyles as styles } from "./pagination.style";
import { HiButton } from "../button";

const template = html<HiPagination>`
<h-button type="flat" ${ x => x.href ? "href=1" : "" } target="_self" ${ref('left')}>
    <svg class="icon" viewBox="0 0 1024 1024"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
</h-button>
<div class="page" ${ref('page')}></div>
<h-button type="flat" ${ x => x.href ? "href=1" : "" } target="_self" ${ref('right')}>
    <svg class="icon" viewBox="0 0 1024 1024"><path d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"></path></svg>
</h-button>

`;
@customElement({
   name: 'h-pagination',
   template,
   styles
})
export class HiPagination extends HIElement {
    // ------------------ 构造函数 ------------------
    constructor(
    ) {
        super();
    }
    // ------------------ 参数 ------------------
    
    /**
     * 计数
     * @date 6/17/2022 - 5:37:25 PM
     *
     * @type {number}
     */
    count: number = 1;
    
    /**
     * 初始化状态
     * @date 7/4/2022 - 9:43:35 AM
     *
     * @type {boolean}
     */
    init: boolean;

    /**
     * 当前位置
     * @date 6/17/2022 - 5:38:37 PM
     *
     * @type {number}
     */
    @observable
    current;
    currentChanged(oldValue, newValue) {
        const _current = Math.min(Math.max(1, newValue), this.count);
        this.updatePage(_current);
        if(this.init){
            this.$emit('change', {
                current: newValue,
                pagesize: this.pagesize,
                total: this.total,
            })
        }
    }
    
    /**
     * 左侧箭头
     * @date 7/4/2022 - 9:43:58 AM
     *
     * @public
     * @type {HTMLButtonElement}
     */
    @observable
    public left: HTMLButtonElement;
    
    /**
     * 分页展示
     * @date 7/4/2022 - 9:44:43 AM
     *
     * @public
     * @type {!HTMLDivElement}
     */
    @observable
    public page!: HTMLDivElement;
    
    /**
     * 右侧箭头
     * @date 7/4/2022 - 9:44:33 AM
     *
     * @public
     * @type {HTMLButtonElement}
     */
    @observable
    public right: HTMLButtonElement;
    // ------------------ 属性 ------------------
    
    /**
     * 默认值defaultcurrent
     * 可以给分页指定一个初始值defaultcurrent，默认为1。
     * @date 6/17/2022 - 5:29:55 PM
     *
     * @type {number}
     */
    @attr defaultcurrent: number = 1;
    
    /**
     * 每页条数pagesize
     * 设置或返回分页组件的每页条数。
     * @date 6/17/2022 - 5:31:33 PM
     *
     * @type {number}
     */
    @attr pagesize: number = 1;
    pagesizeChanged(oldValue, newValue): void {
        this.render(newValue,this.total);
    }
    /**
     * 数据总数total
     * 设置或返回分页组件的数据总数
     * @date 6/17/2022 - 5:31:33 PM
     *
     * @type {number}
     */
    @attr total: number;
    
    
    /**
     * 简约模式simple
     * 可以添加simple属性，只展示当前页和总页数
     * @date 6/17/2022 - 5:33:28 PM
     *
     * @type {boolean}
     */
    @attr({ mode: "boolean" }) simple: boolean;
    
    /**
     * 链接href
     * 支持href链接模式，可以实现分页通过a链接跳转
     * @date 6/17/2022 - 5:34:39 PM
     *
     * @type {string}
     */
    @attr href: string;

    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();
        this.current = this.defaultcurrent;
        this.render(this.pagesize, this.total);
        this.page.addEventListener('click',  ev => {
            const item = (ev.target as HTMLElement).closest('h-button');
            if(item){
                this.current = Number(item['dataset'].current);
            }
        })
        this.addEventListener('keydown', ev =>{
            switch (ev.keyCode) {
                case 37://ArrowLeft
                    this.current--;
                    break;
                case 39://ArrowRight
                    this.current++;
                    break;
                default:
                    break;
            }
        })
        this.left.addEventListener('click',(ev)=>{
            this.current--;
        })
        this.right.addEventListener('click',(ev)=>{
            this.current++;
        })
        this.init = true;
    }
    /**
     * 
     * @param pagesize 每页显示的条数
     * @param total 总数
     */
    render(pagesize, total): void {
        setTimeout(() => {
            this.count = Math.ceil(total/pagesize);
            const current = Math.min(Math.max(1,this.current),this.count);
            if(this.simple){
                const html = `<h-button class="simple-page" tabindex="-1" type="flat">${current} / ${this.count}</h-button>`;
                this.page.innerHTML = html;
            }else{
                const html = Array.from({length:this.count},(el,i)=>i).splice(0,9).map(el=>`<h-button ${this.href?"href="+(el+1):""} target="_self" ${el+1==current?"current":""} type="flat" data-current="${el+1}">${el+1}</h-button>`).join('');
                this.page.innerHTML = html;
            }
            this.updatePage(current);
        }, 10);
    }
    /**
     * 更新分页
     * @param current 当前位置
     */
    updatePage( current = this.current ): void{
        if (current == 1) {
            this.left.setAttribute('disabled','');
        } else {
            this.left.removeAttribute('disabled');
        }
        if (current==this.count) {
            this.right.setAttribute('disabled','');
        } else {
            this.right.removeAttribute('disabled');
        }
        // this.left.disabled = current == 1;
        // this.right.disabled = current==this.count;
        if(this.href){
            this.left.setAttribute('href', this.href + '=' + (current-1));
            this.left.setAttribute('href', this.href + '=' + (current+1));
        }
        if(this.simple){
            this.page.innerHTML = current + ' / ' + this.count;
        }else{
            if( this.count>9 ){
                let place: Array<any>;
                switch (current) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        place = [ 1, 2, 3, 4, 5, 6, 7,'next',this.count];
                        break;
                    case this.count:
                    case this.count-1:
                    case this.count-2:
                    case this.count-3:
                    case this.count-4:
                        place = [ 1, 'pre', this.count-6, this.count-5, this.count-4, this.count-3, this.count-2, this.count-1, this.count];
                        break;
                    default:
                        place = [ 1, 'pre', current-2, current-1, current, current+1, current+2, 'next', this.count];
                        break;
                }
                this.page.querySelectorAll('h-button').forEach((el, i)=>{
                    if( typeof place[i] === 'number'){
                        (el as HTMLElement).dataset.current = place[i];
                        el.textContent = place[i];
                        (el as HTMLButtonElement).disabled = false;
                        if(place[i]==current){
                            el.setAttribute("current","");
                            (el as HTMLButtonElement).focus();
                        }else{
                            el.removeAttribute("current");
                        }
                        el.removeAttribute("tabindex");
                        if(this.href){
                            el['href'] = this.href + '=' + place[i];
                        }
                    }else{
                        el.textContent = '...';
                        el.removeAttribute("current");
                        el.setAttribute("tabindex", '-1');
                    }
                })
            }else{
                this.page.querySelectorAll('h-button').forEach((el, i)=>{
                    const elCurrent = (el as HTMLElement).dataset.current;
                    if( elCurrent === current ){
                        el.setAttribute("current","");
                        (el as HTMLButtonElement).focus();
                    }else{
                        el.removeAttribute("current");
                    }
                    if(this.href){
                        el['href'] = this.href + '=' + (el as HTMLElement).dataset.current;
                    }
                })
            }
        }
    }
}


