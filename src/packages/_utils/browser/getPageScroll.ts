/**
 * 活动滚动条位置
 * @class GetPageScroll
 * @version 0.0.1
 * @author by fico on 2022/07/08
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
export function GetPageScroll() {
    let x:any = "";
    let y:any = "";
    if (window.pageYOffset) {
        //除了IE
        y = window.pageYOffset;
        x = window.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        //IE 6严格
        y = document.documentElement.scrollTop;
        x = document.documentElement.scrollLeft;
    } else if (document.body) {
        //所有其他的IE
        y = document.body.scrollTop;
        x = document.body.scrollLeft;
    };
    return {X:x,Y:y};
}