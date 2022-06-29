/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-27 19:08:48
 * @LastEditors: liulina
 * @LastEditTime: 2022-06-27 19:09:01
 */
export const toDate = d => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day];
};

export const parseDate = (date, type = 'date') => {
  const [year, month, day] = toDate(date);
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
