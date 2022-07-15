/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-27 19:08:48
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-11 16:56:57
 */

export class DateUtils {
  static toDate = d => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day];
  };
  static dateToString = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + '-' + month + '-' + day;
  };
  static dateToTimeString = date => {
    const hour = date.getHours;
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return hour + ':' + minute + '-' + second;
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

  static getMonths() {
    return ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  }
  static getYears(year) {
    const start = (parseInt(year) / 20) * 20;
    return Array.from({ length: 20 }, (el, i) => start + i);
  }

  static getDays(year, month) {
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
}
