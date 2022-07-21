/**
 * 反馈
 * @author by fico on 2022/07/15
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HiMessage, HiMessageService } from './message';
import { HiModal, HiModalService } from './modal';
import { HiToast, HiToastService } from './toast';
import { HiNotify, HiNotifyService } from './notify';

export { HiLoading } from './loading';
export { HiSidebar } from './sidebar';
export { HiPopcon, Popover } from './popover';
export { HiAlert } from './alert';



window['HiMessage'] = HiMessageService;
window['HiModal'] = HiModalService;
window['HiToast'] = HiToastService;
window['HiNotify'] = HiNotifyService;
