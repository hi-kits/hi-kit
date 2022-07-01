
/**
 * 将mixin应用于构造函数
 * 来源于 {@link https://www.typescriptlang.org/docs/handbook/mixins.html | TypeScript Documentation }
 * @function HIElementBase
 * @version 0.0.1
 * @author by fico on 2022/06/30
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @public
 */
import { HIElement, attr } from "hi-element";
export class HIElementBase extends HIElement{
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    // ------------------ 属性 ------------------
    /**
     * 颜色
     * @public string
     */
    @attr color: string;
    private colorChanged(oldValue, newValue): void {
        this.style.color = newValue;
    }
    /**
     * 尺寸
     * @public number
     */
    @attr size: 'large' | 'small' | 'default' | string;
    private sizeChanged(oldValue, newValue): void {
        for (let index = 0; index < this.children.length; index++) {
            const element = this.children[index];
            element.setAttribute('size', this.size);
        }
        
    }

    // ------------------ 自定义函数 ------------------
    /**
     * 处理子元素
     * @param callback  处理完成回调
     */
    childrenFn(callback?): void {
        const Length = this.children.length;
        if (Length > 0) {
            for (let index = 0; index < Length; index++) {
                const element = this.children[index];
                if (index == 0) {
                    element.setAttribute('first', '');
                } else if ((index + 1) == Length) {
                    element.setAttribute('last', '');
                }
                element.setAttribute('index', String(index));
            }
            if (callback) {
                callback();
            }
        }
    }
}
