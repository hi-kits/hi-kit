/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-20 18:27:46
 * @LastEditors: liulina
 * @LastEditTime: 2022-06-27 19:49:52
 */
import { HIElement, customElement, attr, html, ValueConverter, ref } from 'hi-element';
import { datePaneStyle as styles } from './date-pane.style';
import type { HiButton } from '../../button/button';
import { parseDate, toDate } from '../_util';

const template = html<HiDatePane>`
  <div class="date-pane" id="date-pane">
    <div class="date-head">
      <h-button type="flat" class="prev" ${ref('prev')}>
        <svg class="icon" viewBox="0 0 1024 1024">
          <path
            d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
          ></path>
        </svg>
      </h-button>
      <h-button type="flat" class="date-switch" ${ref('switch')}> 2019-08 </h-button>
      <h-button type="flat" class="next" ${ref('next')}>
        <svg class="icon" viewBox="0 0 1024 1024">
          <path
            d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"
          ></path>
        </svg>
      </h-button>
    </div>
    <div class="date-con" data-type="date">
      <div class="date-mode date-date">
        <div class="date-week">
          <span class="date-week-item">日</span>
          <span class="date-week-item">一</span>
          <span class="date-week-item">二</span>
          <span class="date-week-item">三</span>
          <span class="date-week-item">四</span>
          <span class="date-week-item">五</span>
          <span class="date-week-item">六</span>
        </div>
        <div class="date-body" ${ref('days')}>
          ${Array.from({ length: 42 }, el => '<button class="date-button date-day-item" type="flat"></button>').join('')}
        </div>
      </div>
      <div class="date-mode date-month">
        ${x =>
          x
            .getMonths()
            .map(
              (el, i) =>
                '<button class="date-button date-month-item" type="flat" data-month="' +
                (i + 1).toString().padStart(2, '0') +
                '">' +
                el +
                '</button>'
            )
            .join('')}
      </div>
      <div class="date-mode date-year">
        ${Array.from({ length: 20 }, el => '<button class="date-button date-year-item" type="flat"></button>').join('')}
      </div>
    </div>
  </div>
`;
const valueParseDate: ValueConverter = {
  toView(value: any): string {
    // convert numbers to strings
    return parseDate(this.$value, this.type);
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
  name: 'h-date-pane',
  template,
  styles
})
export class HiDatePane extends HIElement {
  // 默认值
  @attr defaultvalue: Date = new Date();
  // 左侧还是右侧
  @attr range?: 'left' | 'right';

  // 最小值
  @attr min: Array<Number> = [0, 1, 1];
  private minChanged() {
    toDate(this.min);
  }
  // 最大值
  @attr max: Array<Number> = [9999, 12, 31];
  private maxChanged() {
    toDate(this.max);
  }

  @attr type = 'date';

  @attr({ converter: valueParseDate }) value: string = '';
  private valueChange() {
    //'2019/1/1'
    if (this.minormax) {
      // 找到最小的
      this.value = this.getMinorMax(
        this.getMinorMax(new Date(this.value), new Date(this.max.join(',')), 'min'),
        new Date(this.min.join(',')),
        'max'
      ).toLocaleDateString();
    }
    this.render(this.value);
    if (this.init) {
      //   if (this.range === 'left') {
      //     const right = this.nextElementSibling;
      //     right.render();
      //   }
      //   if (this.range === 'right') {
      //     const left = this.previousElementSibling;
      //     left.render();
      //   }
      if (this.nativeclick) {
        this.nativeclick = false;
        this.dispatchEvent(
          new CustomEvent('change', {
            detail: {
              value: this.value,
              date: this.date
            }
          })
        );
      }
    }
  }

  @attr({ converter: dateParseDate }) date: string = '';

  @attr rangedate: [Date, Date] = [new Date(), new Date()];

  private mode: 'date' | 'month' | 'year' = 'date';
  // 存储panel的value
  private $value;
  // 是否是初始化
  private init = false;
  // 设置了最大值或者最小值
  private minormax = !this.min || !this.max;
  // 是否被点击过
  private nativeclick = false;
  // 日历上的日期
  days: HTMLDivElement;
  // 切换年月日的区域
  switch: HiButton;
  // prve 按钮
  prev: HiButton;
  // next
  next: HiButton;

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

  render(date = this.$value) {
    //console.log('render')
    this.$value = date;
    const [year, month, day] = toDate(date);
    const [n_year, n_month, n_day] = toDate(new Date());
    // 左侧的date-pane
    const left = this.range ? this.previousElementSibling : null;
    // 右侧的date-pane
    const right = this.range ? this.nextElementSibling : null;
    switch (this.mode) {
      case 'date':
        const days = this.getDays(year, month);
        const elements = Array.from(this.days?.children) as HTMLButtonElement[];
        elements.forEach((el, i) => {
          const [_year, _month, _day] = days[i].split('-');
          el.dataset.date = _year + '-' + _month.toString().padStart(2, '0') + '-' + _day.toString().padStart(2, '0');
          el.dataset.year = _year;
          el.dataset.month = _month.toString().padStart(2, '0');
          el.dataset.day = _day.toString().padStart(2, '0');
          el.textContent = _day;
          if (n_year + '-' + n_month + '-' + n_day == days[i]) {
            el.setAttribute('now', '');
          } else {
            el.removeAttribute('now');
          }
          if (Number(_month) != Number(month)) {
            el.setAttribute('other', '');
          } else {
            el.removeAttribute('other');
          }
          if (this.minormax) {
            el.disabled = el.dataset.date < parseDate(this.min) || el.dataset.date > parseDate(this.max);
          } else {
            el.disabled = false;
          }
          if (this.range) {
            if (el.dataset.date > parseDate(this.rangedate[0]) && el.dataset.date < parseDate(this.rangedate[1])) {
              el.setAttribute('select', '');
            } else {
              el.removeAttribute('select');
            }
            if (el.dataset.date == parseDate(this.rangedate[0])) {
              el.setAttribute('selectstart', '');
            } else {
              el.removeAttribute('selectstart');
            }
            if (el.dataset.date == parseDate(this.rangedate[1])) {
              el.setAttribute('selectend', '');
            } else {
              el.removeAttribute('selectend');
            }
            // 不可用的日期
            // const disabled =
            //   (this.range === 'left' && right && parseDate(el.dataset.date, 'month') > parseDate(right.value, 'month')) ||
            //   (this.range === 'right' && left && parseDate(el.dataset.date, 'month') < parseDate(left.value, 'month'));
            // disabled && (el.disabled = true);
          } else {
            if (year + '-' + month + '-' + day == days[i]) {
              el.setAttribute('current', '');
            } else {
              el.removeAttribute('current');
            }
          }
        });
        this.switch.textContent = year + '年' + (month + '').padStart(2, '0') + '月';
        this.switch.disabled = false;
        if (this.minormax) {
          this.prev.disabled = parseDate(this.min, 'month') >= parseDate(date, 'month');
          this.next.disabled = parseDate(this.max, 'month') <= parseDate(date, 'month');
        } else {
          this.prev.disabled = false;
          this.next.disabled = false;
        }

        // if (this.range === 'left') {
        //   const disabled = parseDate(date, 'month') >= parseDate(right.value, 'month');
        //   disabled && (this.next.disabled = true);
        // }
        // if (this.range === 'right') {
        //   const disabled = parseDate(date, 'month') <= parseDate(left.value, 'month');
        //   disabled && (this.prev.disabled = true);
        // }
        break;
      case 'month':
        // this.months.forEach((el, i) => {
        //   el.dataset.date = year + '-' + el.dataset.month;
        //   el.dataset.year = year;
        //   if (n_year + '-' + n_month == year + '-' + Number(el.dataset.month)) {
        //     el.setAttribute('now', '');
        //   } else {
        //     el.removeAttribute('now');
        //   }
        //   if (this.minormax) {
        //     el.disabled = el.dataset.date < parseDate(this.min, 'month') || el.dataset.date > parseDate(this.max, 'month');
        //   } else {
        //     el.disabled = false;
        //   }
        //   if (this.range) {
        //     if (
        //       el.dataset.date > parseDate(this.rangedate[0], 'month') &&
        //       el.dataset.date < parseDate(this.rangedate[1], 'month')
        //     ) {
        //       el.setAttribute('select', '');
        //     } else {
        //       el.removeAttribute('select');
        //     }
        //     if (el.dataset.date == parseDate(this.rangedate[0], 'month')) {
        //       el.setAttribute('selectstart', '');
        //     } else {
        //       el.removeAttribute('selectstart');
        //     }
        //     if (el.dataset.date == parseDate(this.rangedate[1], 'month')) {
        //       el.setAttribute('selectend', '');
        //     } else {
        //       el.removeAttribute('selectend');
        //     }
        //     if (this.type == 'date') {
        //       const disabled =
        //         (this.range === 'left' && parseDate(el.dataset.date, 'month') > parseDate(right.value, 'month')) ||
        //         (this.range === 'right' && parseDate(el.dataset.date, 'month') < parseDate(left.value, 'month'));
        //       disabled && (el.disabled = true);
        //     }
        //   } else {
        //     if (el.dataset.month == month) {
        //       el.setAttribute('current', '');
        //     } else {
        //       el.removeAttribute('current');
        //     }
        //   }
        // });
        // this.switch.textContent = year + '年';
        // this.switch.disabled = false;
        // if (this.minormax) {
        //   this.prev.disabled = this.min[0] >= year;
        //   this.next.disabled = this.max[0] <= year;
        // } else {
        //   this.prev.disabled = false;
        //   this.next.disabled = false;
        // }
        // if (this.range === 'left') {
        //   const right = this.nextElementSibling;
        //   const disabled = year >= parseDate(right.value, 'year');
        //   disabled && (this.next.disabled = true);
        // }
        // if (this.range === 'right') {
        //   const left = this.previousElementSibling;
        //   const disabled = year <= parseDate(left.value, 'year');
        //   disabled && (this.prev.disabled = true);
        // }
        break;
      case 'year':
      // const years = this.getYears(year);
      // this.years.forEach((el, i) => {
      //   el.dataset.year = years[i];
      //   el.dataset.date = years[i];
      //   el.textContent = years[i];
      //   if (el.dataset.year == n_year) {
      //     el.setAttribute('now', '');
      //   } else {
      //     el.removeAttribute('now');
      //   }
      //   if (this.minormax) {
      //     el.disabled = el.dataset.date < this.min[0] || el.dataset.date > this.max[0];
      //   } else {
      //     el.disabled = false;
      //   }
      //   if (this.range) {
      //     if (
      //       el.dataset.date > parseDate(this.rangedate[0], 'year') &&
      //       el.dataset.date < parseDate(this.rangedate[1], 'year')
      //     ) {
      //       el.setAttribute('select', '');
      //     } else {
      //       el.removeAttribute('select');
      //     }
      //     if (el.dataset.date == parseDate(this.rangedate[0], 'year')) {
      //       el.setAttribute('selectstart', '');
      //     } else {
      //       el.removeAttribute('selectstart');
      //     }
      //     if (el.dataset.date == parseDate(this.rangedate[1], 'year')) {
      //       el.setAttribute('selectend', '');
      //     } else {
      //       el.removeAttribute('selectend');
      //     }
      //     if (this.type !== 'year') {
      //       const disabled =
      //         (this.range === 'left' && el.dataset.year > parseDate(right.value, 'year')) ||
      //         (this.range === 'right' && el.dataset.year < parseDate(left.value, 'year'));
      //       disabled && (el.disabled = true);
      //     }
      //   } else {
      //     if (el.dataset.year == year) {
      //       el.setAttribute('current', '');
      //     } else {
      //       el.removeAttribute('current');
      //     }
      //   }
      // });
      // this.switch.textContent = years[0] + '年 - ' + (years[0] + 19) + '年';
      // this.switch.disabled = true;
      // if (this.minormax) {
      //   this.prev.disabled = this.min[0] >= this.years[0].dataset.year;
      //   this.next.disabled = this.max[0] <= this.years[19].dataset.year;
      // } else {
      //   this.prev.disabled = false;
      //   this.next.disabled = false;
      // }
      // if (this.range === 'left' && this.init) {
      //   const right = this.nextElementSibling;
      //   const disabled = this.years[19].dataset.year >= right.years[0].dataset.year;
      //   disabled && (this.next.disabled = true);
      // }
      // if (this.range === 'right' && this.init) {
      //   const left = this.previousElementSibling;
      //   const disabled = this.years[0].dataset.year <= left.years[19].dataset.year;
      //   disabled && (this.prev.disabled = true);
      // }
      default:
        break;
    }
  }
  private getMinorMax(date1: Date, date2: Date, type): Date {
    return [date1, date2].reduce((last, current) => {
      return last.getTime() > current.getTime() ? (type === 'min' ? current : last) : type === 'min' ? last : current;
    });
  }
}
