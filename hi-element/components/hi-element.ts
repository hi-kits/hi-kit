/**
 * @version 0.0.1
 * @author by fico on 2022/05/05
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { Controller } from "./controller";
import {
    HIElementDefinition,
    PartialHIElementDefinition,
} from "./hi-definitions";

/**
 * 表示基于HIElement基础结构的自定义元素
 * @public
 */
export interface HIElement {
    /**
     * 底层控制器，用于处理数据的生命周期和呈现
     * 这个 HIElement.
     */
    readonly $hiController: Controller;

    /**
     * 发出自定义HTML事件
     * @param type - 事件的类型名称
     * @param detail - 要随事件一起发送的事件详细信息对象
     * @param options - 其他选项. By default bubbles and composed.
     * @remarks
     * 仅当元素已连接时才发出事件
     */
    $emit(
        type: string,
        detail?: any,
        options?: Omit<CustomEventInit, "detail">
    ): boolean | void;

    /**
     * The connected callback for this HIElement.
     * @remarks
     * This method is invoked by the platform whenever this HIElement
     * becomes connected to the document.
     */
    connectedCallback(): void;

    /**
     * The disconnected callback for this HIElement.
     * @remarks
     * This method is invoked by the platform whenever this HIElement
     * becomes disconnected from the document.
     */
    disconnectedCallback(): void;

    /**
     * The attribute changed callback for this HIElement.
     * @param name - The name of the attribute that changed.
     * @param oldValue - The previous value of the attribute.
     * @param newValue - The new value of the attribute.
     * @remarks
     * This method is invoked by the platform whenever an observed
     * attribute of HIElement has a value change.
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}

/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
function createHIElement<T extends typeof HTMLElement>(
    BaseType: T
): { new (): InstanceType<T> & HIElement } {
    return class extends (BaseType as any) implements HIElement {
        public readonly $hiController!: Controller;

        public constructor() {
            /* eslint-disable-next-line */
            super();
            Controller.forCustomElement(this as any);
        }

        public $emit(
            type: string,
            detail?: any,
            options?: Omit<CustomEventInit, "detail">
        ): boolean | void {
            return this.$hiController.emit(type, detail, options);
        }

        public connectedCallback(): void {
            this.$hiController.onConnectedCallback();
        }

        public disconnectedCallback(): void {
            this.$hiController.onDisconnectedCallback();
        }

        public attributeChangedCallback(
            name: string,
            oldValue: string,
            newValue: string
        ): void {
            this.$hiController.onAttributeChangedCallback(name, oldValue, newValue);
        }
    } as any;
}

/**
 * A minimal base class for HIElements that also provides
 * static helpers for working with HIElements.
 * @public
 */
export const HIElement = Object.assign(createHIElement(HTMLElement), {
    /**
     * Creates a new HIElement base class inherited from the
     * provided base type.
     * @param BaseType - The base element type to inherit from.
     */
    from<TBase extends typeof HTMLElement>(BaseType: TBase) {
        return createHIElement(BaseType);
    },

    /**
     * Defines a platform custom element based on the provided type and definition.
     * @param type - The custom element type to define.
     * @param nameOrDef - The name of the element to define or a definition object
     * that describes the element to define.
     */
    define<TType extends Function>(
        type: TType,
        nameOrDef?: string | PartialHIElementDefinition
    ): TType {
        return new HIElementDefinition(type, nameOrDef).define().type;
    },
});

/**
 * Decorator: Defines a platform custom element based on `HIElement`.
 * @param nameOrDef - The name of the element to define or a definition object
 * that describes the element to define.
 * @public
 */
export function customElement(nameOrDef: string | PartialHIElementDefinition) {
    /* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
    return function (type: Function) {
        new HIElementDefinition(type, nameOrDef).define();
    };
}
