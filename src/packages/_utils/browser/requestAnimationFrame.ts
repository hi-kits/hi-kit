/**
 * 动画
 * @function: requestAnimationFrame
 * @version: 0.0.1
 * @author by fico on 2022/07/08
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
export function RequestAnimationFrame(callback): any {
    if (window.requestAnimationFrame){
        return window.requestAnimationFrame(callback);
    }else if(window['webkitRequestAnimationFrame']){
        return window['webkitRequestAnimationFrame'](callback);
    }else{
        return window.setTimeout(callback, 1000 / 60);
    }
}