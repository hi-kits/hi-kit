/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-27 19:05:32
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-05 10:24:00
 */
import type { ValueConverter } from 'hi-element';
import { DateUtils } from '../_util';
// 值转换
export const valueParseDate: ValueConverter = {
  toView(value: any): [string, string] {
    // 补0之后的时间字符串
    return typeof value === 'string' ? value.split('~').map(value => DateUtils.parseDate(value, this.type)) : value;
  },
  fromView(value: string): any {
    // convert strings to numbers
    return value;
  }
};
// 默认值转换
export const defaultValueParseDate: ValueConverter = {
  toView(value: any): Date {
    // convert numbers to strings
    return this.defaultvalue.split('~');
  },
  fromView(value: string): any {
    // convert strings to numbers
    return value;
  }
};

// date值转换
export const dateParseDate: ValueConverter = {
  toView(value: any): Date {
    // convert numbers to strings
    return value.map(el => new Date(el));
  },
  fromView(value: string): any {
    // convert strings to numbers
    return value;
  }
};
