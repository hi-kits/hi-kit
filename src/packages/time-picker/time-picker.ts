/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-20 18:27:46
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-06 18:47:55
 */
import { HIElement, customElement, attr, when, ref, html } from 'hi-element';
import { timePickerStyle as styles } from './time-picker.style';
import '../button/button';
import '../popover/popover';
import  { HiTimePane } from './time-pane/time-pane';

const template = html<HiTimePicker>`
  <h-popover class="date-picker" id="popover" ${when(x => x.dir, html`dir=${x => x.dir}`)} ${ref('popover')}>
    <h-button id="select" ${ref('select')} ${when(x => x.disabled, html`disabled`)}
      ><span id="datetxt" ${ref('datetxt')}></span
      >
      <svg class="icon" viewBox="0 0 1024 1024">
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
      <path
      d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"
    ></path></svg
    ></h-button>
    <h-popcon id="popcon" class="date-pane" ${ref('popcon')}>
      <div class="pop-footer">
        <h-button ${ref('btnNow')} type="flat" autoclose>此刻</h-button>
        <h-button ${ref('btnSubmit')} type="primary" id="btn-submit" autoclose>确 认</h-button>
      </div>
    </h-popcon>
  </h-popover>
`;

@customElement({
  name: 'h-time-picker',
  template,
  styles
})
export class HiTimePicker extends HIElement {
  // 是否可用
  @attr({ mode: 'boolean' }) disabled: boolean = false;
  // 默认值
  @attr defaultTimeValue: string = '';

  @attr timevalue: string;
  private timevalueChanged(value) {
    this.datetxt.textContent = this.timevalue;
    // 向子组件传递数据
    if (this.nativeclick) {
      this.nativeclick = false;
      this.timePane.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            value: this.timevalue,
          }
        })
      );
    } 
  }

  // 是否点击过
  private nativeclick = false;

  timePane: HiTimePane;

  // DOM ref
  public popover;
  public popcon;
  public select;
  public datetxt;
  public btnNow;
  public btnSubmit;

  connectedCallback(): void {
    super.connectedCallback();
    // selec点击事件
    this.select.addEventListener('click', () => {
      if (!this.timePane) {
        this.timePane = new HiTimePane();
        this.timePane.selectedTime = this.timevalue || this.defaultTimeValue;
        this.timePane.timevalue = this.timevalue || this.defaultTimeValue;
        this.popcon.prepend(this.timePane);
      }
    });
    // 点击确定按钮
    this.btnSubmit.addEventListener('click', () => {
      this.nativeclick = true;
      this.timevalue = this.timePane.timevalue;
    });
    // 点击此刻按钮
    this.btnNow.addEventListener('click', () => {
      this.nativeclick = true;
      this.timevalue = this.getCurrentTime();
    });
    // 面板关闭
    this.popcon.addEventListener('close', () => {
      this.timePane.timevalue = this.timevalue;
    });

    this.timevalue = this.getDefaultValue();
  }

  getDefaultValue(): string {
    const arr = this.defaultTimeValue.split(':').map(item => item.padStart(2, '0'));
    return arr.join (' : ');
  }

  getCurrentTime(): string {
    const date = new Date();
    
    return date.getHours().toString().padStart(2, '0') + ' : ' + date.getMinutes().toString().padStart(2, '0') + ' : ' + date.getSeconds().toString().padStart(2, '0');
  }
}
