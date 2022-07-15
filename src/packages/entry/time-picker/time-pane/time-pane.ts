/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-20 18:27:46
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-12 14:30:30
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
        
          <select  @change="${(x, c) => x.timeChangeHandler(c.event, 'hour')}" ${ref('hour_select')} size="9" class="timepicker_hour">
            ${Array.from(
              { length: 24 },
              (el, i) =>
                `<option class='timeOption' value="${(i).toString().padStart(2, '0')}" data-hour="${(i).toString().padStart(2, '0')}">${(i).toString().padStart(2, '0')}</option>`
            ).join('')}
          
          </select>
          <select @change="${(x, c) => x.timeChangeHandler(c.event, 'minute')}" ${ref('minute_select')} size="9"  class="timepicker_minute">
          ${Array.from(
            { length: 60 },
            (el, i) =>
              `<option class='timeOption' value="${(i).toString().padStart(2, '0')}" data-minute="${(i).toString().padStart(2, '0')}">${(i).toString().padStart(2, '0')}</option>`
          ).join('')}
          </select>
          <select @change="${(x, c) => x.timeChangeHandler(c.event, 'second')}" size="9"  ${ref('second_select')} class="timepicker_second">
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
  @attr selectedTime: string = "00:00:00";
  // 用于和父组件交互
  @attr timevalue: string;
 
  private hour = '00';
  private minute = '00';
  private second = '00';
  private stepStyle = 0;

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
      console.log('change----', this.selectedTime);
      
    });

    this.stepStyle = this.hour_select.children[0].clientHeight;
    this.setSelectValue();
    console.log('init----', this.selectedTime);
  }

  
  // 时间发生改变后
  timeChangeHandler(ev, type) {
    // hour/minute/second 改动了
    // 获取当前的change的select的值
    const value = this[type + '_select'].value.padStart(2, '0')
    // 更新对应的值
    this.setValueAndPosition(type, value, 'single')
    // 修改selectedTime
    this.updateSelectedTime();
    this.dispatchEvent(new CustomEvent('updateValue', {
      detail: {
        value: this.selectedTime
      }
     }))
  }
  // 当select的选择的值改变了更新展示的text
  updateSelectedTime() {
    this.selectedTime = this.hour + ':' + this.minute + ':' + this.second;
    this.timevalue = this.selectedTime;
  }
  // 设置select的value
  setSelectValue() {
    const time = this.timevalue || this.selectedTime;
    const [hour, minute, second] = time.split(':');
    console.log('setSelectValuet----', hour, minute, second);
    this.setValueAndPosition('hour', hour, 'select');
    this.setValueAndPosition('minute', minute, 'select');
    this.setValueAndPosition('second', second, 'select');
  }
  // 设置select的value以及option的位置
  setValueAndPosition(type, value, valueType){
    if (valueType === 'select') {
      this[type + '_select'].value = value;
    }
    this[type] = value;
    // 滚动到顶部
    this[type + '_select'].scrollTop = this.stepStyle * value;

  }
}
