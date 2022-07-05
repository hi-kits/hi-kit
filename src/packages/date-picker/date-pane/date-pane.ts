/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-20 18:27:46
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-05 14:25:03
 */
import { HIElement, customElement, attr, html, ValueConverter, ref, observable } from 'hi-element';
import { datePaneStyle as styles } from './date-pane.style';
import type { HiButton } from '../../button/button';
import { DateUtils } from '../_util';
import type { DatePaneType } from '../_dateType';

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
    <div class="date-con" data-type="date" ${ref('dateCon')}>
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
      <div class="date-mode date-month" ${ref('dateMonth')}>
        ${Array.from(
          { length: 12 },
          (el, i) =>
            `<button class="date-button date-month-item" type="flat" data-month="${(i + 1).toString().padStart(2, '0')}">${i + 1}</button>`
        ).join('')}
      </div>
      <div class="date-mode date-year" ${ref('dateYear')}>
        ${Array.from({ length: 20 }, el => '<button class="date-button date-year-item" type="flat"></button>').join('')}
      </div>
    </div>
  </div>
`;

const dateParseDate: ValueConverter = {
  toView(value: any): Date {
    return new Date(this.value);
  },
  fromView(value: string): any {
    return value;
  }
};
@customElement({
  name: 'h-date-pane',
  template,
  styles
})
export class HiDatePane extends HIElement {
  // 默认值
  @attr defaultvalue: string = new Date().toLocaleDateString();
  // 左侧还是右侧
  @attr range?: 'left' | 'right';

  // 最小值
  @attr min: string = '1600-1-1';
  private minChanged() {
    DateUtils.toDate(this.min);
    if (this.min !== null) {
      // 如果value为空，则可能是从没有走connected，需要重新赋值
      if (!this.value) {
        return (this.value = this.defaultvalue);
      }
      this.render();
    }
  }
  // 最大值
  @attr max: string = '9999-1-30';
  private maxChanged() {
    DateUtils.toDate(this.max);
    if (this.max !== null) {
      if (!this.value) {
        return (this.value = this.defaultvalue);
      }
      this.render();
    }
  }

  @attr type: DatePaneType = 'date';
  private typeChanged() {
    if (this.max !== null) {
      this.render();
    }
  }
  // 用于和外部交互的value   ({ converter: valueParseDate })
  @attr value: string = '';
  private valueChanged() {
    if (!this.value) {
      return;
    }
    // 先执行valuechanged然后再执行converter
    let value = DateUtils.parseDate(this.value, this.type);
    //'2019/1/1'
    if (this.minormax) {
      // 找到最小的
      value = this.getMinorMax(
        this.getMinorMax(new Date(this.value), new Date(this.max), 'min'),
        new Date(this.min),
        'max'
      ).toLocaleDateString();
    }
    this.render(value);
    if (this.init) {
      if (this.range === 'left') {
        const right = this.nextElementSibling as HiDatePane;
        right.render();
      }
      if (this.range === 'right') {
        const left = this.previousElementSibling as HiDatePane;
        left.render();
      }
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

  private _mode: DatePaneType = 'date';
  public get mode(): DatePaneType {
    return this._mode;
  }
  public set mode(value: DatePaneType) {
    this._mode = value;
    this.dateCon.dataset.type = value;
  }
  // 是否是初始化
  private init = false;
  // 设置了最大值或者最小值
  private _minormax: boolean;
  public get minormax() {
    return !!this.min || !!this.max;
  }
  // 是否被点击过
  private nativeclick = false;
  // 控制日期/月份/年展示的type
  dateCon: HTMLDivElement;
  // 日历上的日期
  days: HTMLDivElement;
  // 日历上的月份
  dateMonth: HTMLDivElement;
  // 日历上的年
  dateYear: HTMLDivElement;
  // 日历上的年分按钮的集合
  yearBtns: HTMLButtonElement[];
  // 切换年月日的区域
  switch: HiButton;
  // prve 按钮
  prev: HiButton;
  // next
  next: HiButton;

  public connectedCallback(): void {
    super.connectedCallback();
    this.mode = this.type;
    // 左侧向前的按钮
    this.prev.addEventListener('click', () => {
      let [year, month, day] = DateUtils.toDate(this.value);
      this.nativeclick = true;
      switch (this.mode) {
        case 'date':
          this.value = DateUtils.dateToString(new Date(...(this.toDay(year, month - 2, day) as [number, number, number])));
          break;
        case 'month':
          this.value = DateUtils.dateToString(new Date(...(this.toDay(year - 1, month - 1, day) as [number, number, number])));
          break;
        case 'year':
          this.value = DateUtils.dateToString(new Date(...(this.toDay(year - 20, month - 1, day) as [number, number, number])));
        default:
          break;
      }
    });
    //  右侧向后的按钮
    this.next.addEventListener('click', () => {
      let [year, month, day] = DateUtils.toDate(this.value);
      this.nativeclick = true;
      switch (this.mode) {
        case 'date':
          this.value = DateUtils.dateToString(new Date(...(this.toDay(year, month + 1, day) as [number, number, number])));
          break;
        case 'month':
          this.value = DateUtils.dateToString(new Date(...(this.toDay(year + 1, month - 1, day) as [number, number, number])));
          break;
        case 'year':
          this.value = DateUtils.dateToString(new Date(...(this.toDay(year + 20, month - 1, day) as [number, number, number])));
        default:
          break;
      }
    });
    // 中间切换年月日的按钮
    this.switch.addEventListener('click', () => {
      switch (this.mode) {
        case 'date':
          this.mode = 'month';
          this.render();
          break;
        case 'month':
          this.mode = 'year';
          this.render();
          break;
        default:
          break;
      }
    });
    // 日历中的天的点击事件
    this.days.addEventListener('click', ev => {
      const target = ev.target as Element;
      const item = target.closest('button');

      this.nativeclick = true;
      if (item) {
        this.select(item.dataset?.date);
        this.value = item.dataset.date as string;
      }
    });
    // 月份的点击事件
    this.dateMonth.addEventListener('click', ev => {
      const target = ev.target as Element;
      const item = target.closest('button');
      let [year, month, day] = DateUtils.toDate(this.value);
      this.nativeclick = true;
      if (item && item.dataset) {
        if (this.type == 'date') {
          const len = new Date(year, Number(item.dataset.month), 0).getDate();
          this.mode = 'date';
          this.value = item.dataset.date + '-' + (day > len ? len : day);
        } else {
          this.select(item.dataset.date);
          this.value = item.dataset.date as string;
        }
      }
    });
    // 年份中debutton
    this.dateYear.addEventListener('click', ev => {
      const target = ev.target as Element;
      const item = target.closest('button');
      let [year, month, day] = DateUtils.toDate(this.value);
      this.nativeclick = true;
      if (item) {
        switch (this.type) {
          case 'date':
            const len = new Date(Number(item.dataset.year), month, 0).getDate();
            this.mode = 'month';
            this.value = item.dataset.date + '-' + month + '-' + (day > len ? len : day);
            break;
          case 'month':
            this.mode = 'month';
            this.value = item.dataset.date + '-' + month;
            break;
          default:
            this.select(item.dataset.date + '');
            this.value = item.dataset.date + '';
            break;
        }
      }
    });
    // 获取到yearBtns的集合
    this.yearBtns = Array.from(this.dateYear?.children) as HTMLButtonElement[];
    this.value = this.defaultvalue;
    console.log('datePane---', this.value);

    this.init = true;
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

  public render(date = this.value): void {
    //console.log('render')
    if (!date) {
      return;
    }
    this.value = date;
    const [year, month, day] = DateUtils.toDate(date);
    const [n_year, n_month, n_day] = DateUtils.toDate(new Date());
    let left;
    let right;
    if (this.range) {
      // 左侧的date-pane
      left = this.previousElementSibling as HiDatePane;
      // 右侧的date-pane
      right = this.nextElementSibling as HiDatePane;
    }
    const mode = this.mode;
    switch (mode) {
      // 如果当前展示的类型是天
      case 'date':
        const days = DateUtils.getDays(year, month);
        const dateBtns = this.days && (Array.from(this.days?.children) as HTMLButtonElement[]);
        dateBtns &&
          dateBtns.forEach((el, i) => {
            const [_year, _month, _day] = days[i].split('-');
            el.dataset.date = _year + '-' + _month.toString().padStart(2, '0') + '-' + _day.toString().padStart(2, '0');
            el.dataset.year = _year;
            el.dataset.month = _month.toString().padStart(2, '0');
            el.dataset.day = _day.toString().padStart(2, '0');
            el.textContent = _day;
            if (n_year + '-' + n_month + '-' + n_day == days[i]) {
              // now 今天
              el.setAttribute('now', '');
            } else {
              el.removeAttribute('now');
            }
            if (Number(_month) != Number(month)) {
              el.setAttribute('other', '');
            } else {
              el.removeAttribute('other');
            }
            console.log('minormax', this.minormax);

            if (this.minormax) {
              console.log(el.dataset.date, DateUtils.parseDate(this.min), el.dataset.date, DateUtils.parseDate(this.max));
              el.disabled = el.dataset.date < DateUtils.parseDate(this.min) || el.dataset.date > DateUtils.parseDate(this.max);
            } else {
              el.disabled = false;
            }
            if (this.range) {
              if (el.dataset.date > DateUtils.parseDate(this.rangedate[0]) && el.dataset.date < DateUtils.parseDate(this.rangedate[1])) {
                el.setAttribute('select', '');
              } else {
                el.removeAttribute('select');
              }
              if (el.dataset.date == DateUtils.parseDate(this.rangedate[0])) {
                el.setAttribute('selectstart', '');
              } else {
                el.removeAttribute('selectstart');
              }
              if (el.dataset.date == DateUtils.parseDate(this.rangedate[1])) {
                el.setAttribute('selectend', '');
              } else {
                el.removeAttribute('selectend');
              }
              // 不可用的日期
              const disabled =
                (this.range === 'left' &&
                  right &&
                  DateUtils.parseDate(el.dataset.date, 'month') > DateUtils.parseDate(right.value, 'month')) ||
                (this.range === 'right' &&
                  left &&
                  DateUtils.parseDate(el.dataset.date, 'month') < DateUtils.parseDate(left.value, 'month'));
              disabled && (el.disabled = true);
            } else {
              // current 代表当前选择的日期
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
          this.prev.disabled = DateUtils.parseDate(this.min, 'month') >= DateUtils.parseDate(date, 'month');
          this.next.disabled = DateUtils.parseDate(this.max, 'month') <= DateUtils.parseDate(date, 'month');
        } else {
          this.prev.disabled = false;
          this.next.disabled = false;
        }

        if (this.range === 'left') {
          const disabled = DateUtils.parseDate(date, 'month') >= DateUtils.parseDate(right.value, 'month');
          disabled && (this.next.disabled = true);
        }
        if (this.range === 'right') {
          const disabled = DateUtils.parseDate(date, 'month') <= DateUtils.parseDate(left.value, 'month');
          disabled && (this.prev.disabled = true);
        }
        break;
      // 如果当前展示的月份
      case 'month':
        const monthBtns = Array.from(this.dateMonth?.children) as HTMLButtonElement[];
        monthBtns.forEach((el, i) => {
          el.dataset.date = year + '-' + el.dataset.month;
          el.dataset.year = year + '';
          // now 今天
          if (n_year + '-' + n_month == year + '-' + Number(el.dataset.month)) {
            el.setAttribute('now', '');
          } else {
            el.removeAttribute('now');
          }
          if (this.minormax) {
            el.disabled =
              el.dataset.date < DateUtils.parseDate(this.min, 'month') || el.dataset.date > DateUtils.parseDate(this.max, 'month');
          } else {
            el.disabled = false;
          }
          if (this.range) {
            if (
              el.dataset.date > DateUtils.parseDate(this.rangedate[0], 'month') &&
              el.dataset.date < DateUtils.parseDate(this.rangedate[1], 'month')
            ) {
              el.setAttribute('select', '');
            } else {
              el.removeAttribute('select');
            }
            if (el.dataset.date == DateUtils.parseDate(this.rangedate[0], 'month')) {
              el.setAttribute('selectstart', '');
            } else {
              el.removeAttribute('selectstart');
            }
            if (el.dataset.date == DateUtils.parseDate(this.rangedate[1], 'month')) {
              el.setAttribute('selectend', '');
            } else {
              el.removeAttribute('selectend');
            }
            if (this.type == 'date') {
              const disabled =
                (this.range === 'left' && DateUtils.parseDate(el.dataset.date, 'month') > DateUtils.parseDate(right.value, 'month')) ||
                (this.range === 'right' && DateUtils.parseDate(el.dataset.date, 'month') < DateUtils.parseDate(left.value, 'month'));
              disabled && (el.disabled = true);
            }
          } else {
            // current 代表当前选择的日期
            if (el.dataset.month == month + '') {
              el.setAttribute('current', '');
            } else {
              el.removeAttribute('current');
            }
          }
        });
        this.switch.textContent = year + '年';
        this.switch.disabled = false;
        if (this.minormax) {
          this.prev.disabled = Number(this.min.split('-')[0]) >= year;
          this.next.disabled = Number(this.max.split('-')[0]) <= year;
        } else {
          this.prev.disabled = false;
          this.next.disabled = false;
        }
        if (this.range === 'left') {
          const right = this.nextElementSibling as HiDatePane;
          const disabled = year >= Number(DateUtils.parseDate(right.value, 'year'));
          disabled && (this.next.disabled = true);
        }
        if (this.range === 'right') {
          const left = this.previousElementSibling as HiDatePane;
          const disabled = year <= Number(DateUtils.parseDate(left.value, 'year'));
          disabled && (this.prev.disabled = true);
        }
        break;
      case 'year':
        const years = DateUtils.getYears(year);

        this.yearBtns.forEach((el, i) => {
          el.dataset.year = years[i] + '';
          el.dataset.date = years[i] + '';
          el.textContent = years[i] + '';
          if (el.dataset.year == n_year + '') {
            // now 今天
            el.setAttribute('now', '');
          } else {
            el.removeAttribute('now');
          }
          if (this.minormax) {
            el.disabled = el.dataset.date < this.min[0] + '' || el.dataset.date > this.max[0] + '';
          } else {
            el.disabled = false;
          }
          if (this.range) {
            if (
              el.dataset.date > DateUtils.parseDate(this.rangedate[0], 'year') &&
              el.dataset.date < DateUtils.parseDate(this.rangedate[1], 'year')
            ) {
              el.setAttribute('select', '');
            } else {
              el.removeAttribute('select');
            }
            if (el.dataset.date == DateUtils.parseDate(this.rangedate[0], 'year')) {
              el.setAttribute('selectstart', '');
            } else {
              el.removeAttribute('selectstart');
            }
            if (el.dataset.date == DateUtils.parseDate(this.rangedate[1], 'year')) {
              el.setAttribute('selectend', '');
            } else {
              el.removeAttribute('selectend');
            }
            if (this.type !== 'year') {
              const disabled =
                (this.range === 'left' && el.dataset.year > DateUtils.parseDate(right.value, 'year')) ||
                (this.range === 'right' && el.dataset.year < DateUtils.parseDate(left.value, 'year'));
              disabled && (el.disabled = true);
            }
          } else {
            // current 代表当前选择的日期
            if (el.dataset.year == year + '') {
              el.setAttribute('current', '');
            } else {
              el.removeAttribute('current');
            }
          }
        });
        this.switch.textContent = years[0] + '年 - ' + (years[0] + 19) + '年';
        this.switch.disabled = true;
        if (this.minormax) {
          this.prev.disabled = (this.yearBtns[0].dataset.year &&
            Number(this.min.split('-')[0]) >= Number(this.yearBtns[0].dataset.year)) as boolean;
          this.next.disabled = Number(this.max.split('-')[0]) <= Number(this.yearBtns[19].dataset.year);
        } else {
          this.prev.disabled = false;
          this.next.disabled = false;
        }
        if (this.range === 'left' && this.init) {
          const right = this.nextElementSibling as HiDatePane;
          const disabled =
            this.yearBtns[19].dataset.year && Number(this.yearBtns[19].dataset.year) >= Number(right.yearBtns[0].dataset.year);
          disabled && (this.next.disabled = true);
        }
        if (this.range === 'right' && this.init) {
          const left = this.previousElementSibling as HiDatePane;
          const disabled = Number(this.yearBtns[0].dataset.year) <= Number(left.yearBtns[19].dataset.year);
          disabled && (this.prev.disabled = true);
        }
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
