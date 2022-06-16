export { HiButton, HiButtonGroup } from "./button";
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
import { HiMessage } from './message/message';
import { HiDialog } from './dialog/dialog';
import { HiToast } from './toast/toast';
// export * from "./message";
window['Message'] = HiMessage;
window['Dialog'] = HiDialog;
window['HiToast'] = HiToast;

window['showDialog'] = function (e){
    console.log(e);
    
}