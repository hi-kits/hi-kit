/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2022-06-09 15:44:00
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-22 11:25:28
 */
import { HIElement, customElement, attr, observable, ref, when, html } from 'hi-element';

import { PopconStyles as styles } from './popcon.style';
import type { HiButton } from '@currency/button/button';

declare const window: any;

type TriggerType = 'hover' | 'focus' | 'contextmenu' | 'click';

type PopoverType = 'confirm' | 'pane' | 'nomal';

const template = html<HiPopcon>`
  ${when(x => x.type && x.type === 'confirm', html`<h-icon name="question-circle" size="30" color="orangered"></h-icon>`)}
  <div class="popcon-content">
    ${when(
      x => x.type && x.type !== null,
      html<HiPopcon>`<div class="popcon-title" id="title" ${ref('titles')}>${x => x.ptitle}</div>
        <h-button class="btn-close" id="btn-close" icon="close" ${ref('btnClose')}></h-button>
        <hr />`
    )}
    <div class="popcon-body">
      <slot></slot>
    </div>
    ${when(
      x => x.type === 'confirm',
      html<HiPopcon>`
        <div class="popcon-footer">
          <h-button id="btn-cancel" ${ref('btnCancel')}>${x => x.canceltext}</h-button>
          <h-button id="btn-submit" type="primary" ${ref('btnSubmit')}>${x => x.oktext}</h-button>
        </div>
      `
    )}
  </div>
`;
@customElement({
  name: 'h-popcon',
  template,
  styles
})
export class HiPopcon extends HIElement {
  // 聚焦
  @attr({ mode: 'boolean' }) stopfocus: boolean = false;
  // 是否可用
  @attr({ mode: 'boolean' }) disabled: boolean = false;

  // title
  @attr ptitle: string = 'popcon';
  // 类型
  @attr type: PopoverType;

  /**
   * 确定文案
   */
  @attr oktext: string = '确 定';
  /**
   * 取消文案
   */
  @attr canceltext: string = '取 消';
  /**
   * 触发方式
    @param 
    value：hover、focus、contextmenu、click
  */
  @attr trigger: TriggerType = 'hover';

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
  @attr hOk: string | Function = '';

  // title Dom
  public titles: HTMLDivElement;
  public btnClose: HiButton;
  public btnCancel: HiButton;
  public btnSubmit: HiButton;

  /**
   * 是否展示
   *
   * @public
   */
  @observable
  public open: boolean = false;
  private openChanged(): void {
    this.open ? this.setAttribute('open', '') : this.removeAttribute('open');
  }

  constructor(type) {
    super();
  }
  /**
   * 当自定义元素第一次被连接到文档DOM时被调用
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('transitionend', ev => {
      if (ev.propertyName === 'transform' && this.open) {
        if (this.type == 'confirm') {
          this.btnSubmit.focus();
        }
        if (this.type == 'pane') {
          this.btnClose.focus();
        }
        this.dispatchEvent(new CustomEvent('open'));
      }
    });
    this.addEventListener('transitionend', ev => {
      if (ev.propertyName === 'transform' && !this.open) {
        this.dispatchEvent(new CustomEvent('close'));
      }
    });
    this.addEventListener('click', ev => {
      const target = ev.target as Element;
      if (target.closest('[autoclose]')) {
        this.open = false;
        window.xyActiveElement.focus();
      }
    });
    if (this.type) {
      this.btnClose.addEventListener('click', () => {
        this.open = false;
        window.xyActiveElement.focus();
      });
    }
    if (this.type == 'confirm') {
      this.btnCancel.addEventListener('click', async () => {
        this.dispatchEvent(new CustomEvent('cancel'));
        this.open = false;
        window.xyActiveElement.focus();
      });
      this.btnSubmit.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('submit'));
        if (!this.loading) {
          this.open = false;
          window.xyActiveElement.focus();
        }
      });
    }
  }
}
