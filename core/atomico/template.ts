/**
 * core
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { h, $, render } from "./render";
/**
 * @template {Element} T
 * @param {any} vnode
 * @param {DocumentFragment} [base]
 * @returns {T}
 */
export function template (vnode: any, base: DocumentFragment = $.createElement("template").content) {
    //@ts-ignore
    render(h("host", null, vnode), base).children[0];
}

