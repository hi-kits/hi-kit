/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-06-14 17:05:11
 * @LastEditors: liulina
 * @LastEditTime: 2022-06-16 16:39:03
 */
export * from "./button";
export * from "./checkbox";
export * from "./grid";
export * from "./loading";
export * from "./switch";
export * from "./short";
export * from "./toast";
export * from "./box";
export * from "./editWord";
export * from "./popover"
// export * from "./color";
import Messages from './message/message';
import Dialog from './dialog/dialog';
import Toast from './toast/toast';
// export * from "./message";
window['Message'] = Messages;
window['Dialog'] = Dialog;
window['Toast'] = Toast;

window['showDialog'] = function (e){
    console.log(e);
    
}