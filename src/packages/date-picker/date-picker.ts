/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-20 18:27:46
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-01 11:11:06
 */
import { HIElement, customElement, attr, when, ref, slotted, html, ValueConverter } from 'hi-element';
import { datePickerStyle as styles } from './date-picker.style';
import { HiDatePane } from './date-pane/date-pane';
import { HiDateRangePane } from './date-range-pane/date-range-pane';
import '../button/button';
import '../popover/popover';
import { DateUtils } from './_util';

const template = html<DatePicker>`
  <h-popover class="date-picker" id="popover" ${when(x => x.dir, html`dir=${x => x.dir}`)} ${ref('popover')}>
    <h-button id="select" ${ref('select')} ${when(x => x.disabled, html`disabled`)}
      ><span id="datetxt" ${ref('datetxt')}></span
      ><svg class="icon" viewBox="0 0 1024 1024">
        <path
          d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32z m-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"
          p-id="8054"
        ></path></svg
    ></h-button>
    <div id="popcon" class="date-pane" ${ref('popcon')}>
      <div class="pop-footer">
        <h-button ${ref('btnCancel')} autoclose>取 消</h-button>
        <h-button ${ref('btnSubmit')} type="primary" id="btn-submit" autoclose>确 认</h-button>
      </div>
    </div>
  </h-popover>
`;
// const valueParseDate: ValueConverter = {
//   toView(value: any): string | []  {
   
//   },
//   fromView(value: string): any {
//     return true;
//     // convert strings to numbers
//   }
// };
const dateParseDate: ValueConverter = {
  toView(value: any): Date {
    // convert numbers to strings
    return new Date(this.$value);
  },
  fromView(value: string): any {
    return true;
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
  // 是否是范围事件选择器
  @attr({ mode: 'boolean' }) range: boolean = false;
  // 最小值
  @attr min: string
  // 最大值
  @attr max: string;
  // 默认值
  @attr({ converter: dateParseDate }) defaultvalue: string = '';
  // popover方向
  @attr dir = 'top';
  @attr type = 'date';


  @attr value: string;
  private valueChanged(value) {
    console.log(value);
    
    if (this.range) {
      // convert numbers to strings
      this.$value.map((value) => DateUtils.parseDate(value, this.type));
    } else {
      DateUtils.parseDate(this.$value, this.type);
    }
    this.$value = value;
    // this.datetxt.textContent = this.range ? this.value.join("~") : this.value;
    if (this.nativeclick) {
      this.nativeclick = false;
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            value: this.value,
            date: this.date,
          },
        })
      );
    } else {
      if (this.datePane) {
        this.datePane.value = this.value;
      } else {
        // this.defaultvalue = this.range ? this.value.join("~") : this.value;
      }
    }
  }

  @attr({ converter: dateParseDate }) date: string = '';

  @attr rangedate: [Date, Date] = [new Date(), new Date()];

  private mode = this.type;
  private $value;
  // 目前的datePane
  private datePane: HiDatePane | HiDateRangePane;
  // 是否点击过
  private nativeclick = false;
  public popover;
  public popcon;
  public select;
  public datetxt;
  public btnCancel;
  public btnSubmit;


  connectedCallback(): void {
    super.connectedCallback();
    if (!this.datePane) {
      if (this.range) {
        this.datePane = new HiDateRangePane();
      } else {
        this.datePane = new HiDatePane();
      }
      this.min && (this.datePane.min = this.min.split("-").map(Number));
      this.max && (this.datePane.max = this.max.split("-").map(Number));
      this.datePane.type = this.type;
      this.datePane.defaultvalue = this.defaultvalue;
      this.popcon.prepend(this.datePane);
    }
  }
}
