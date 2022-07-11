/**
 * 页面位置及窗口大小
 * @function: GetPageSize
 * @version: 0.0.1
 * @author by fico on 2022/07/08
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */

export function GetPageSize(): { PageW: any; PageH: any; WinW: any; WinH: any; } {
    let _ScrW: any;
    let _ScrH: any;
    if (window.innerHeight && window['scrollMaxY']) {
        // Mozilla
        _ScrW = window.innerWidth + window['scrollMaxX']; _ScrH = window.innerHeight + window['scrollMaxY'];
    } else if (document.body.scrollHeight > document.body.offsetHeight) {
        // all but IE Mac
        _ScrW = document.body.scrollWidth; _ScrH = document.body.scrollHeight;
    } else if (document.body) {
        // IE Mac
        _ScrW = document.body.offsetWidth; _ScrH = document.body.offsetHeight;
    }
    let _WinW: any;
    let _WinH: any;
    if (window.innerHeight) {
        // all except IE
        _WinW = window.innerWidth; _WinH = window.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) {
        // IE 6 Strict Mode
        _WinW = document.documentElement.clientWidth; _WinH = document.documentElement.clientHeight;
    } else if (document.body) {
        // other
        _WinW = document.body.clientWidth; _WinH = document.body.clientHeight;
    }
    // 页面小于窗口,设置和窗口相等
    const _PageW = (_ScrW < _WinW) ? _WinW : _ScrW;
    const _PageH = (_ScrH < _WinH) ? _WinH : _ScrH;
    return { PageW: _PageW, PageH: _PageH, WinW: _WinW, WinH: _WinH };
}
