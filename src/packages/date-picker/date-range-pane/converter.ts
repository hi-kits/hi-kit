/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-27 19:05:32
 * @LastEditors: liulina
 * @LastEditTime: 2022-06-27 19:07:13
 */
import type { ValueConverter } from 'hi-element';
// 值转换
export const valueParseDate: ValueConverter = {
  toView(value: any): [Date, Date] {
    // convert numbers to strings
    return this.$value.map(value => this.parseDate(value, this.type));
  },
  fromView(value: string): any {
    // convert strings to numbers
  }
};
// 默认值转换
export const defaultValueParseDate: ValueConverter = {
  toView(value: any): Date {
    // convert numbers to strings
    return value.split('~');
  },
  fromView(value: string): any {
    // convert strings to numbers
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
  }
};
