import { $ } from "./render";
import { options } from "./options";

/**
 * It is used only if the browser supports adoptedStyleSheets.
 * caches the CSSStyleSheet using the css as a reference to the instance
 * @type {Object<string,import("./element/custom-element").Style>}
 */
let SHEETS: {[x: string]: any;} = {};

/**
 * Create a Style from a string
 * @param {TemplateStringsArray} template
 * @param  {...any} args
 */
export function css(template: { raw: any; }, ...args: any[]) {
    let cssText = (template.raw || template).reduce(
        (cssText: any, part: any, i: number) => cssText + part + (args[i] || ""),
        ""
    );
    return (SHEETS[cssText] = SHEETS[cssText] || createSheet(cssText));
}

/**
 * Create a stylesheet according to browser support
 * @param {string} cssText
 * @returns {import("./element/custom-element").Style}
 */
export function createSheet(cssText: string) {
    if (options.sheet) {
        let sheet = new CSSStyleSheet();
        // Ts by default does not add .replace yet
        // @ts-ignore
        sheet.replaceSync(cssText);
        return sheet;
    } else {
        let sheet = $.createElement("style");
        sheet.textContent = cssText;
        return sheet;
    }
}
