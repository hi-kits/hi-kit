/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-23 10:24:32
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-07 14:00:25
 */
// import  { Box } from "./box";
// 通用
import { HiButton, HiButtonGroup } from './currency/button';
import { HiIcon } from './currency/icon';
import { HiBox } from './currency/box';
import { HiBackTop } from './other/backTop';


// 布局
import { HiCol, HiRow, HiLayout } from './layout/grid';
import { HiDivider } from './layout/divider';
import { HiSpace } from './layout/space';


//导航
import { HiPagination } from './navigation/pagination';
import { HiNavDot } from './navigation/navDot';
import { HiSteps, HiStep } from './navigation/steps';


// 数据录入
import { HiCheckbox, HiCheckboxGroup } from './entry/checkbox';
import { HiSwitch } from './entry/switch';
import { HiSlider } from './entry/slider';
import { HiRadio } from './entry/radio';
import { HiEditWord } from './entry/editWord';
import { HiDatePane, HiDateRangePane } from './entry/date-picker';
import { HiInput } from './entry/input';
import { HiUpload } from './entry/upload';
import { HiTimePane, HiTimePicker } from './entry/time-picker';


// 数据展示
import { HiTag } from './data/tag';
import { HiAvatar, HiAvatarGroup } from './data/avatar';
import { HiBadge } from './data/badge';
import { HiCard, HiCardFooter, HiCardHeader, HiCardContent } from './data/card';
import { HiEmpty } from './data/empty';
import { HiTips } from './data/tips';
import { HiTimeline, HiTimelineItem } from './data/timeline';
import { HiList, HiListItem, HiListItemAction, HiListItemExtra, HiListItemMedia, HiListItemInner } from './data/list';
import { HiComment, HiCommentAction } from './data/comment';
import { HiSegmenteds, HiSegmented } from './data/segmented';
import { HiTabs, HiTab } from './data/tabs';


// 反馈
import { HiLoading } from './feedback/loading';
import { HiSidebar } from './feedback/sidebar';
import { HiPopcon, Popover } from './feedback/popover';
import { HiMessage, HiMessageService } from './feedback/message';
import { HiModal, HiModalService } from './feedback/modal';
import { HiToast, HiToastService } from './feedback/toast';
import { HiAlert } from './feedback/alert';
import { HiNotify } from './feedback/notify';



window['HiMessage'] = HiMessageService;
window['HiModal'] = HiModalService;
window['HiToast'] = HiToastService;

// window['showDialog'] = function (e){
//     console.log(e);

// }
