/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2022-06-09 15:44:00
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-03 18:55:36
 */
import { HIElement, customElement, attr, observable, ref, when, html } from 'hi-element';
import { HiPopcon } from './popcon/popcon';

import { PopoverStyles as styles } from './popover.style';
declare const window: any;
type DirType =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'efttop'
  | 'leftbottom'
  | 'topleft'
  | 'topright'
  | 'righttop'
  | 'rightbottom'
  | 'bottomleft'
  | 'bottomright';

type TriggerType = 'hover' | 'focus' | 'contextmenu' | 'click';

type PopoverType = 'confirm' | 'nomal';

const template = html<Popover>` <slot></slot> `;
@customElement({
  name: 'h-popover',
  template,
  styles
})
export class Popover extends HIElement {
  // 是否可用
  @attr({ mode: 'boolean' }) disabled: boolean = false;
  // 是否直接打开
  @attr({ mode: 'boolean' }) accomplish: boolean = false;
  /**
   * 触发方式
    @param 
    value：hover、focus、contextmenu、click
  */
  @attr trigger: TriggerType;
  /**
   * 展示方向
   */
  @attr dir: DirType;
  // title
  @attr ptitle: string = '';
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

  @attr hOk: string | Function = '';

  // popver Content
  public control: HTMLDivElement;
  public popcon: HiPopcon;
  /**
   * 当自定义元素第一次被连接到文档DOM时被调用
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    if (!this.trigger) {
      // 默认添加点击事件
      this.addEventListener('click', this.show);
    } else if (this.trigger && this.trigger == 'hover') {
      // 如果是hover绑定鼠标事件
      this.addEventListener('mouseenter', this.show);
      this.addEventListener('mouseenter', this.setpop);
    } else {
      // 其他方式直接绑定事件
      this.addEventListener(this.trigger, this.show);
    }
    // TODO如果trigger方式是鼠标右键
    if (this.trigger === 'contextmenu') {
      this.addEventListener('contextmenu', ev => {
        ev.preventDefault();

        const path = ev['path'] || (ev.composedPath && ev.composedPath());
        if (!path.includes(this.popcon)) {
          this.show(ev);
        }
      });
    }
    // 在popover外部的时候，直接关掉pop
    document.addEventListener('mousedown', this.setpop);
  }

  setpop = ev => {
    const path = ev.path || (ev.composedPath && ev.composedPath());
    if (
      (this.popcon && !path.includes(this.popcon) && !this.popcon.loading && !path.includes(this.children[0])) ||
      (this.trigger === 'contextmenu' && !path.includes(this.popcon) && ev.which == '1')
    ) {
      this.popcon.open = false;
    }
  };
  /**
   * @name: popover展示与隐藏
   * @param {*} boolean
   * @return {*} void
   */
  show(ev) {
    this.popcon = this.children[1] as HiPopcon;
    if (!this.disabled) {
      if (!this.popcon) {
        this.popcon = new HiPopcon(this.type);
        this.popcon.type = this.type;
        this.appendChild(this.popcon);
        this.popcon.title = this.title || 'popover';
        this.popcon.innerHTML = this.content || '';
        if (this.type == 'confirm') {
          this.popcon.oktext = this.oktext || '确 定';
          this.popcon.canceltext = this.canceltext || '取 消';
          // this.popcon.onsubmit = () => this.dispatchEvent(new CustomEvent('submit'));
          // this.popcon.btnCancel.oncancel = () => this.dispatchEvent(new CustomEvent('cancel'));
        }
      }
      //this.popcon.remove = true;
      this.popcon.clientWidth;
      if (this.trigger === 'contextmenu') {
        const { x, y } = this.getBoundingClientRect();
        this.popcon.style.setProperty('--x', ev.clientX - x + 'px');
        this.popcon.style.setProperty('--y', ev.clientY - y + 'px');
        this.popcon.open = true;
      } else {
        const path = ev.path || (ev.composedPath && ev.composedPath());
        if (!path.includes(this.popcon)) {
          window.xyActiveElement = document.activeElement;
          if (this.accomplish) {
            this.popcon.open = true;
          } else {
            this.popcon.open = !this.popcon.open;
          }
        }
      }
    } else {
      (this.popcon || this).dispatchEvent(new CustomEvent('submit'));
    }
    return this.popcon;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    // document.removeEventListener('mousedown', this);
  }
}
