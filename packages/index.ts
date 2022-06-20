import { HiButton, HiButtonGroup } from "./button";
import { HiCheckbox, HiCheckboxGroup } from "./checkbox";
import { HiCol, HiRow, HiLayout} from "./grid";
import { HiLoading } from "./loading";
import  { HiSwitch } from "./switch";
import { HiShort } from "./short";
import { HiToast } from "./toast";
import  { HiSlider } from "./slider";
// import  { Box } from "./box";
import  { HiDrawlottery } from "./extend/drawlottery";
import  { HiEditWord } from "./editWord";
// import  { Popover } from "./popover"
import { HiTips } from "./tips";
import { HiPagination } from "./pagination";
import { HiMessageService } from './message';
import { HiDialog } from './dialog';
import { HiToastService } from './toast';

window['HiMessage'] = HiMessageService;
window['HiDialog'] = HiDialog;
window['HiToast'] = HiToastService;

// window['showDialog'] = function (e){
//     console.log(e);
    
// }

export default {
    HiButton, HiButtonGroup,
    HiCheckbox, HiCheckboxGroup,
    HiCol, HiRow, HiLayout,
    HiLoading,
    HiSwitch,
    HiShort,
    HiToast,
    HiEditWord,
    HiTips,
    HiPagination
}