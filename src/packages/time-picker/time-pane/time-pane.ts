/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-20 18:27:46
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-06 18:47:37
 */
import { HIElement, customElement, attr, html, ValueConverter, ref, observable } from 'hi-element';
import { timePaneStyle as styles } from './time-pane.style';

const template = html<HiTimePane>`
  <div class="date-pane" id="date-pane">
    <div class="date-head">
      <p class="timepicker_header">
        <b>${x=> x.selectedTime}</b>
      </p>
    </div>
    <div class="date-con" data-type="date">
      <div class="date-mode date-date">
        <div class="timepicker_data_select">
        
          <select  @change="${(x, c) => x.timeChangeHandler(c.event, 'hour')}" ${ref('hour_select')} size="5" class="timepicker_hour">
            ${Array.from(
              { length: 24 },
              (el, i) =>
                `<option class='timeOption' value="${(i).toString().padStart(2, '0')}" data-hour="${(i).toString().padStart(2, '0')}">${(i).toString().padStart(2, '0')}</option>`
            ).join('')}
          
          </select>
          <select @change="${(x, c) => x.timeChangeHandler(c.event, 'minute')}" ${ref('minute_select')} size="5"  class="timepicker_minute">
          ${Array.from(
            { length: 60 },
            (el, i) =>
              `<option class='timeOption' value="${(i).toString().padStart(2, '0')}" data-minute="${(i).toString().padStart(2, '0')}">${(i).toString().padStart(2, '0')}</option>`
          ).join('')}
          </select>
          <select @change="${(x, c) => x.timeChangeHandler(c.event, 'second')}" size="5"  ${ref('second_select')} class="timepicker_second">
          ${Array.from(
            { length: 60 },
            (el, i) =>
              `<option class='timeOption' value="${(i).toString().padStart(2, '0')}" data-second="${(i).toString().padStart(2, '0')}">${(i).toString().padStart(2, '0')}</option>`
          ).join('')}
          </select>
        </div>
      </div>
    </div>
  </div>
`;

@customElement({
  name: 'h-time-pane',
  template,
  styles
})
export class HiTimePane extends HIElement {
 
  // 选择的时间
  @attr selectedTime: string = "00 : 00 : 00";
  // 用于和父组件交互
  @attr timevalue: string;
 
  private hour = '00';
  private minute = '00';
  private second = '00'

  // DOM Ref
  public hour_select : HTMLSelectElement;
  public minute_select: HTMLSelectElement;
  public second_select: HTMLSelectElement;


  public connectedCallback(): void {
    super.connectedCallback();
    
    // 父组件传递过来的
    this.addEventListener('change', ev => {
      this.timevalue = ev['detail'].value;
      this.selectedTime = this.timevalue;
      // 设置select的value
      this.setSelectValue();
    });
    this.setSelectValue();
  }

  

  timeChangeHandler(ev, type) {
    // hour/minute/second 改动了
    // 更新对应的值
    this[type] = this[type + '_select'].value.padStart(2, '0');
    // 修改selectedTime
    this.updateSelectedTime()
    
  }
  // 当select的选择的值改变了更新展示的text
  updateSelectedTime() {
    this.selectedTime = this.hour + ' : ' + this.minute + ' : ' + this.second;
    this.timevalue = this.selectedTime;
  }
  // 设置select的value
  setSelectValue() {
    const time = this.timevalue || this.selectedTime;
    const [hour, minute, second] = time.split(' : ');
    this.hour_select.value = hour;
    this.minute_select.value = minute;
    this.second_select.value = second;
  }
}
