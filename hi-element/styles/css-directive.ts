/**
 * @version 0.0.1
 * @author by fico on 2022/05/05
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import type { Behavior } from "../observation/behavior";
import type { ComposableStyles } from "./element-styles";

/**
 * Directive for use in {@link css}.
 *
 * @public
 */
export class CSSDirective {
    /**
     * Creates a CSS fragment to interpolate into the CSS document.
     * @returns - the string to interpolate into CSS
     */
    public createCSS(): ComposableStyles {
        return "";
    }

    /**
     * Creates a behavior to bind to the host element.
     * @returns - the behavior to bind to the host element, or undefined.
     */
    public createBehavior(): Behavior | undefined {
        return undefined;
    }
}
