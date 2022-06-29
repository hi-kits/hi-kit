/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-20 18:27:46
 * @LastEditors: liulina
 * @LastEditTime: 2022-06-27 11:26:28
 */
import { HIElement, customElement, attr, when, ref, slotted, html, ValueConverter } from 'hi-element';
import { datePickerStyle as styles } from './date-picker.style';
import '../button/button';
import '../popover/popover';

const template = html<DatePicker>`
  <h-popover class="date-picker" id="popover" ${when(x => x.dir, html`dir=${x => x.dir}`)}>
    <h-button id="select" ${when(x => x.disabled, html`disabled`)}
      ><span id="datetxt"></span
      ><svg class="icon" viewBox="0 0 1024 1024">
        <path
          d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32z m-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"
          p-id="8054"
        ></path></svg
    ></h-button>
    <div id="popcon" class="date-pane">
      <div class="pop-footer">
        <h-button autoclose>取 消</h-button>
        <h-button type="primary" id="btn-submit" autoclose>确 认</h-button>
      </div>
    </div>
  </h-popover>
`;
const valueParseDate: ValueConverter = {
  toView(value: any): string {
    // convert numbers to strings
    return this.parseDate(this.$value, this.type);
  },
  fromView(value: string): any {
    // convert strings to numbers
  }
};
const dateParseDate: ValueConverter = {
  toView(value: any): Date {
    // convert numbers to strings
    return new Date(this.$value);
  },
  fromView(value: string): any {
    // convert strings to numbers
  }
};
@customElement({
  name: 'h-date-picker',
  template,
  styles
})
export class DatePicker extends HIElement {
  // 是否可用
  @attr({ mode: 'boolean' }) disabled: boolean = false;
  // 默认值
  @attr defaultvalue: Date = new Date();
  // 最小值
  @attr min: Array<Number> = [0, 1, 1];
  private minChanged() {
    this.toDate(this.min);
  }
  // 最大值
  @attr max: Array<Number> = [9999, 12, 31];
  private maxChanged() {
    this.toDate(this.min);
  }
  // popover方向
  @attr dir = 'top';
  @attr type = 'date';

  private minormax = !this.min || !this.max;

  @attr({ converter: valueParseDate }) value: number = 0;

  @attr({ converter: dateParseDate }) date: string = '';

  @attr rangedate: [Date, Date] = [new Date(), new Date()];

  private mode = this.type;

  getDays(year, month) {
    const lastdays = new Date(year, month - 1, 0).getDate();
    const days = new Date(year, month, 0).getDate();
    const week = new Date(year, month - 1, 1).getDay();
    const prev = Array.from(
      { length: week },
      (el, i) => (month == 1 ? year - 1 : year) + '-' + (month == 1 ? 12 : month - 1) + '-' + (lastdays + i - week + 1)
    );
    const current = Array.from({ length: days }, (el, i) => year + '-' + month + '-' + (i + 1));
    const next = Array.from(
      { length: 42 - days - week },
      (el, i) => (month == 12 ? year + 1 : year) + '-' + (month == 12 ? 1 : month + 1) + '-' + (i + 1)
    );
    return [...prev, ...current, ...next];
  }

  getMonths() {
    return ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  }

  getYears(year) {
    const start = (parseInt(year) / 20) * 20;
    return Array.from({ length: 20 }, (el, i) => start + i);
  }

  toDay(year, month, day) {
    const len = new Date(year, month + 1, 0).getDate();
    day = day > len ? len : day;
    return [year, month, day];
  }

  select(value) {
    this.dispatchEvent(
      new CustomEvent('select', {
        detail: {
          value: value,
          date: this.date
        }
      })
    );
  }

  toDate = d => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day];
  };

  parseDate = (date, type = 'date') => {
    const [year, month, day] = this.toDate(date);
    let value = '';
    switch (type) {
      case 'date':
        value = year + '-' + (month + '0').padStart(2, '0') + '-' + (day + '').padStart(2, '0');
        break;
      case 'month':
        value = year + '-' + (month + '').padStart(2, '0');
        break;
      default:
        value = year + '';
        break;
    }
    return value;
  };
}
