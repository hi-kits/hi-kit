/**
 * @version 0.0.1
 * @author by fico on 2022/05/05
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

export * from "./platform";
export * from "./templating/template";
export * from "./components/hi-element";
export {
    HIElementDefinition,
    PartialHIElementDefinition,
} from "./components/hi-definitions";
export * from "./components/attributes";
export * from "./components/controller";
export type { Callable, Constructable, Mutable } from "./interfaces";
export * from "./templating/compiler";
export {
    ElementStyles,
    ElementStyleFactory,
    ComposableStyles,
    StyleTarget,
} from "./styles/element-styles";
export { css, cssPartial } from "./styles/css";
export { CSSDirective } from "./styles/css-directive";
export * from "./templating/view";
export * from "./observation/observable";
export * from "./observation/notifier";
export { Splice } from "./observation/array-change-records";
export { enableArrayObservation } from "./observation/array-observer";
export { DOM } from "./dom";
export type { Behavior } from "./observation/behavior";
export * from "./templating/binding";
export * from "./templating/html-directive";
export * from "./templating/ref";
export * from "./templating/when";
export * from "./templating/repeat";
export * from "./templating/slotted";
export * from "./templating/children";
export {
    elements,
    ElementsFilter,
    NodeBehaviorOptions,
} from "./templating/node-observation";
