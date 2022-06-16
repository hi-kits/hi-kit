export * from "./button";
export * from "./checkbox";
export * from "./grid";
export * from "./loading";
export * from "./switch";
export * from "./short";
export * from "./toast";
export * from "./box";
export * from "./editWord";
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