export { HiButton, HiButtonGroup } from "./button";
export * from "./checkbox";
export * from "./radio";
export * from "./grid";
export * from "./loading";
export * from "./switch";
export * from "./short";
export * from "./toast";
export * from "./box";
export * from "./editWord";
export * from "./popover"
export * from "./date-picker"
export { HiTips } from "./tips";
export { HiPagination } from "./pagination";
import { HiMessageService } from './message';
import { HiDialog } from './dialog';
import { HiToastService } from './toast';

window['HiMessage'] = HiMessageService;
window['HiDialog'] = HiDialog;
window['HiToast'] = HiToastService;

window['showDialog'] = function (e){
    console.log(e);
    
}