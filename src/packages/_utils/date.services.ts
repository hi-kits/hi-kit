/**
 * 日期基础服务
 * @class DateServices
 * @version 0.0.1
 * @author by fico on 2019/01/04
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 日期格式化方法
 */
export function DateServices(date, format = 'yyyy-MM-dd hh:mm:ss'): string {
  /**
   * 日期格式 如:'yyyy-MM-dd'
   * @inner
   */
  // format = format || 'yyyy-MM-dd hh:mm:ss';
  const FORMAT = {
    'M+': date.getMonth() + 1,     // 月份
    'd+': date.getDate(),     // 日
    'h+': date.getHours(),     // 小时
    'H+': date.getHours(),     // 小时
    'm+': date.getMinutes(),     // 分
    's+': date.getSeconds(),     // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds()    // 毫秒
  };
  if (/(y+)/.test(format)) {
    // tslint:disable-next-line:no-parameter-reassignment
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const KEY in FORMAT) {
    if (new RegExp('(' + KEY + ')').test(format)) {
      // tslint:disable-next-line:no-parameter-reassignment
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (FORMAT[KEY]) : (('00' + FORMAT[KEY]).substr(('' + FORMAT[KEY]).length)));
    }
  }
  return format;
}
