import { log } from '../../../../fluentui-master/packages/web-components/tools/date-pick/date-pick';
/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-27 19:08:48
 * @LastEditors: liulina
 * @LastEditTime: 2022-06-29 14:46:12
 */

export class DateUtils {
  static toDate = d => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day];
  };

  static parseDate = (date, type = 'date') => {
    const [year, month, day] = this.toDate(date);
    let value = '';
    switch (type) {
      case 'date':
        value = year + '-' + (month + '').padStart(2, '0') + '-' + (day + '').padStart(2, '0');
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
