/**
 * 将mixin应用于构造函数
 * 来源于 {@link https://www.typescriptlang.org/docs/handbook/mixins.html | TypeScript Documentation }
 * @function HIElementBase
 * @version 0.0.1
 * @author by fico on 2022/06/30
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @public
 */
import { attr } from 'hi-element';
import { HIElementBase } from './hiElementBase';

export class HIElementForm extends HIElementBase {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    // ------------------ 属性 ------------------    
    /**
     * 合法性 validity
     * 可以通过属性 validity 来获取 value 的合法性
     * @date 7/5/2022 - 4:49:17 PM
     *
     * @type {boolean}
     */
    @attr({ mode: "boolean" }) validity: boolean;
    
    /**
     * 必填项 required
     * 表单验证属性，表示必填
     * @date 7/5/2022 - 4:49:35 PM
     *
     * @type {boolean}
     */
    @attr({ mode: "boolean" }) required: boolean;
    
    /**
     * 无效状态
     * @date 7/5/2022 - 4:52:41 PM
     *
     * @type {boolean}
     */
    @attr({ mode: "boolean" }) invalid: boolean;
    
    /**
     * 不确定状态 indeterminate
     * @date 7/5/2022 - 4:54:25 PM
     *
     * @type {boolean}
     */
    @attr({ mode: "boolean" }) indeterminate: boolean;
    
    /**
     * 选中状态
     * @date 7/5/2022 - 5:05:15 PM
     *
     * @type {boolean}
     */
    @attr({ mode: "boolean" }) checked: boolean;
    
    /**
     * 当前值
     * @date 7/5/2022 - 5:05:49 PM
     *
     * @type {string}
     */
    @attr({ mode: "boolean" }) value: string;
    
    /**
     * 只读属性
     * @date 7/5/2022 - 5:17:45 PM
     *
     * @type {boolean}
     */
    @attr({ mode: "boolean" }) readOnly: boolean;

    // ------------------ 自定义函数 ------------------

}
