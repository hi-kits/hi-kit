/**
 * core
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

export let options = {
    /**
     * CSSStyleSheet support
     * @type {boolean}
     */
    //@ts-ignore
    sheet: !!document.adoptedStyleSheets,
    /**
     * define if you use rendering from the server
     * @type {(component:import("./element/custom-element").Context)=>void}
     */
    ssr: null,
};
