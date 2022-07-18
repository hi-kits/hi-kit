/**
 * 反馈
 * @author by fico on 2022/07/15
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HiMessage, HiMessageService } from './message';
import { HiModal, HiModalService } from './modal';
import { HiToast, HiToastService } from './toast';

export { HiLoading } from './loading';
export { HiSidebar } from './sidebar';
export { HiPopcon, Popover } from './popover';
export { HiAlert } from './alert';
export { HiNotify } from './notify';



window['HiMessage'] = HiMessageService;
window['HiModal'] = HiModalService;
window['HiToast'] = HiToastService;
