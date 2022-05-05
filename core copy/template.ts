import { h, $, render } from "./render";
/**
 * @template {Element} T
 * @param {any} vnode
 * @param {DocumentFragment} [base]
 * @returns {T}
 */
export let template = <T>(vnode: any, base: DocumentFragment = $.createElement("template").content): T => 
    //@ts-ignore
    render(h("host", null, vnode), base).children[0];
