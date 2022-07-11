/**
 * 定义所有的 CSS display 值
 * @public
 */
export type CSSDisplayPropertyValue =
    | "block"
    | "contents"
    | "flex"
    | "grid"
    | "inherit"
    | "initial"
    | "inline"
    | "inline-block"
    | "inline-flex"
    | "inline-grid"
    | "inline-table"
    | "list-item"
    | "none"
    | "run-in"
    | "table"
    | "table-caption"
    | "table-cell"
    | "table-column"
    | "table-column-group"
    | "table-footer-group"
    | "table-header-group"
    | "table-row"
    | "table-row-group";

/**
 * 设置 `display: none;` 的CSS片段使用 [hidden] 属性隐藏 host
 * @public
 */
export const hidden = `:host([hidden]){display:none}`;

/**
 * 应用CSS display 属性
 * 还添加了CSS规则，以便在 [hidden] 属性应用于元素时不显示该元素
 * @param display - CSS display 属性值
 * @public
 */
export function display(displayValue: CSSDisplayPropertyValue): string {
    return `${hidden}:host{display:${displayValue}}`;
}

