/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-20 18:27:46
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-05 14:31:04
 */
import { HIElement, customElement, attr, ref, html, ValueConverter } from 'hi-element';
import { datePickerStyle as styles } from './date-range-pane.style';
import { valueParseDate, dateParseDate } from './converter';
import { DateUtils } from '../_util';
import type { HiDatePane } from '../date-pane/date-pane';
import type { DatePaneType } from '../_dateType';
// ${ref('date01')}
// ${ref('date02')}

const rangeTemplate = html<HiDateRangePane>`
  <h-date-pane id="date-left" range="left" ${ref('date01')}></h-date-pane>
  <h-date-pane id="date-right" range="right" ${ref('date02')}></h-date-pane>
`;
@customElement({
  name: 'h-date-range-pane',
  template: rangeTemplate,
  styles
})
export class HiDateRangePane extends HIElement {
  private selected = false;
  private $date = ['', ''];
  // 左侧date-pane
  public date01: HiDatePane;
  // 右侧date-pane
  public date02: HiDatePane;

  private $value;

  // 默认值 ({ converter: defaultValueParseDate })
  @attr defaultvalue: string[] = [DateUtils.parseDate(new Date()), DateUtils.parseDate(new Date())];
  defaultvalueChanged() {
    if (typeof this.defaultvalue === 'string') {
    }
  }
  // value
  @attr({ converter: valueParseDate }) value: string[];
  private valueChanged() {
    if (DateUtils.parseDate(this.value[0]) > DateUtils.parseDate(this.value[1])) {
      [this.value[0], this.value[1]] = [this.value[1], this.value[0]];
    }
    this.render(this.value);
    this.date02.render(this.value[1]);
    this.date01.render(this.value[0]);
    this.selected = false;
  }
  @attr({ converter: dateParseDate }) date: [Date, Date];
  // 最小值
  @attr min: string;
  private minChanged() {
    if (this.min && this.date01) {
      this.date01.min = this.min;
      this.date02.min = this.min;
    }
  }
  // 最大值
  @attr max: string;
  private maxChanged() {
    if (this.max && this.date01) {
      this.date01.max = this.max;
      this.date02.max = this.max;
    }
  }

  @attr type: DatePaneType = 'date';
  private typeChanged() {
    if (this.type && this.date01) {
      this.date01.type = this.type;
      this.date02.type = this.type;
    }
  }

  // 选择事件
  choose(value) {
    if (!this.selected) {
      this.$date[0] = value;
      this.$date[1] = value;
    } else {
      this.$date[1] = value;
      if (this.$date[0] > this.$date[1]) {
        [this.$date[0], this.$date[1]] = [this.$date[1], this.$date[0]];
      }
    }
    this.render(this.$date, this.selected);
    this.selected = !this.selected;
  }
  // 渲染
  render(value = this.$value, change?) {
    this.date01.rangedate = value;
    this.date02.rangedate = value;
    if (change) {
      this.$value = value;
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            value: value,
            date: this.date
          }
        })
      );
    }
  }
  connectedCallback(): void {
    super.connectedCallback();
    this.$date = ['', ''];
    this.type = this.type;
    this.min && (this.min = this.min);
    this.max && (this.max = this.max);
    this.value = this.defaultvalue;

    this.date01.min = this.min;
    this.date02.min = this.min;
    this.date01.max = this.max;
    this.date02.max = this.max;

    this.date01.addEventListener('select', ev => {
      console.log(ev);
      // this.choose(ev.detail.value);
    });
    this.date02.addEventListener('select', ev => {
      console.log(ev);
      // this.choose(ev.detail.value);
    });
  }
}
