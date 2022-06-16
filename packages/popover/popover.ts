/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2022-06-09 15:44:00
 * @LastEditors: liulina
 * @LastEditTime: 2022-06-16 16:22:29
 */
import {
  HIElement,
  customElement,
  attr,
  observable,
  ref,
  when,
  slotted,
  html,
  css,
} from 'hi-element';

import { PopoverStyles as styles } from './popover.style';

type DirType = 'top' | 'right' | 'bottom' | 'left' | 'efttop' | 'leftbottom' | 'topleft' | 'topright' |
'righttop' | 'rightbottom' | 'bottomleft' | 'bottomright';

type TriggerType = 'hover'| 'focus'| 'contextmenu' | 'click';

type PopoverType = 'confirm' | 'nomal';


const template = html<Popover>`
  <slot></slot>
  <div class="popoverWrap">
    <div class="popcon-content" ${ref("control")}>
      <div class="popcon-title" id="title">${(x) => x.title}</div>
      <hr/>
      <div class="popcon-body">
        ${(x) => x.content}
      </div>
      ${when(
        x => x.type === 'confirm',
        html`
        <div class="popcon-footer" >
          <h-button id="btn-cancel">${(x) => x.canceltext}</h-button>
          <h-button id="btn-submit" type="primary">${(x) => x.oktext}</h-button>
        </div>
        `
      )}
    </div>
  </div>
`;
@customElement({
  name: 'h-popover',
  template,
  styles,
})
export class Popover extends HIElement {
  // 聚焦
  @attr({ mode: 'boolean' }) stopfocus: boolean = false;
  // 是否可用
  @attr({ mode: 'boolean' }) disabled: boolean = false;
  /**
   * 触发方式
    @param 
    value：hover、focus、contextmenu、click
  */
  @attr trigger: TriggerType = 'hover';
  /**
   * 展示方向
   */
  @attr dir: DirType = 'top';
  // title
  @attr title: string = '';
  // 类型
  @attr type: PopoverType = 'nomal';
  // 内容
  @attr content: string = '333';
  /**
   * 确定文案
   */
  @attr oktext: string = '确 定';
  /**
   * 取消文案
   */
  @attr canceltext: string = '取 消';
  /**
   * 加载状态
   */
  @attr loading: boolean = false;
  /**
   * 控制popover展示与否
   */
  @attr popoverVisible: boolean = false;
  private popoverVisibleChange() {
    this.open = this.popoverVisible;
  }
  /**
     * 是否展示
     *
     * @public
     */
  @observable
  public open: boolean = false;
  private openChanged(): void {
    // console.log(this.open);
    this.open ? this.setAttribute("open", ''): this.removeAttribute("open");
  }
  
  public control: HTMLDivElement;
  /**
   * 当自定义元素第一次被连接到文档DOM时被调用
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    console.log(this.control, this.trigger!=='click');
    if (this.trigger) {
      // this.addEventListener('click',this.show);
      if(this.trigger==='contextmenu'){
        this.addEventListener('contextmenu',(ev)=>{
          ev.preventDefault();
          this.show(ev);
        });
      } else {
        this.addEventListener(this.trigger, this.show);
      }
    }
    // if(!(this.trigger && this.trigger!=='click')){
    //   this.addEventListener('click',this.show);
    // }
    if(this.type=='confirm'){
      const elements = Array.from(this.control?.children) as HTMLDivElement[];
      if (elements) {
        const footer = elements.find((div: HTMLDivElement) => div.className === 'popcon-footer');
        if (footer?.children) {
          const footerBtnList = Array.from(footer?.children) as HTMLElement[];
          console.log(footerBtnList)
          footerBtnList.forEach(btn => {
            // 获取操作按钮的类型
            const type = btn.id.split('-')[1];
            // 确定取消 绑定事件
            btn.addEventListener("click", this.handleClick);
          });
        }
      }
    }
    // 在popover外部的时候，直接关掉pop
    document.addEventListener('mousedown',this.setpop);
  }

  setpop = (ev) => {
    const path = ev.path || (ev.composedPath && ev.composedPath());
    if(!path.includes(this.control) && !this.loading
    && !path.includes(this.control.children[1]) || (this.trigger==='contextmenu') && !path.includes(this.control) && ev.which == '1'){
      this.open = false;
    }
  }
  /**
   * @name: popover展示与隐藏
   * @param {*} boolean
   * @return {*} void
   */
  show(ev): void{
    if (!this.disabled && !this.open) {
      this.open = true;
    } else {
      this.open = false
    }
  }
  // 按钮的点击事件
  handleClick(e): void{
    e.stopPropagation();
    // submit  ｜ cancel需要做一些其他的处理
    // TODO callback()
    this.open = false;
  }
}
