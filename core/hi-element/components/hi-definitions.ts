/**
 * @version 0.0.1
 * @author by fico on 2022/05/05
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HI, KernelServiceId } from "../platform";
import { Observable } from "../observation/observable";
import { ComposableStyles, ElementStyles } from "../styles/element-styles";
import type { ElementViewTemplate } from "../templating/template";
import { AttributeConfiguration, AttributeDefinition } from "./attributes";

const defaultShadowOptions: ShadowRootInit = { mode: "open" };
const defaultElementOptions: ElementDefinitionOptions = {};
const hiRegistry = HI.getById(KernelServiceId.elementRegistry, () => {
    const typeToDefinition = new Map<Function, HIElementDefinition>();

    return Object.freeze({
        register(definition: HIElementDefinition): boolean {
            if (typeToDefinition.has(definition.type)) {
                return false;
            }

            typeToDefinition.set(definition.type, definition);
            return true;
        },
        getByType<TType extends Function>(key: TType): HIElementDefinition | undefined {
            return typeToDefinition.get(key);
        },
    });
});

/**
 * 表示自定义元素的元数据配置
 * @public
 */
export interface PartialHIElementDefinition {
    /**
     * 自定义元素的名称
     */
    readonly name: string;

    /**
     * 自定义元素渲染的模板
     */
    readonly template?: ElementViewTemplate;

    /**
     * 自定义元素关联的样式
     */
    readonly styles?: ComposableStyles | ComposableStyles[];

    /**
     * 自定义元素的自定义属性
     */
    readonly attributes?: (AttributeConfiguration | string)[];

    /**
     * 控制创建自定义元素是否是 shadow DOM
     */
    readonly shadowOptions?: Partial<ShadowRootInit> | null;

    /**
     * 控制如何使用平台定义自定义元素的选项
     */
    readonly elementOptions?: ElementDefinitionOptions;
}

/**
 * 定义HIElement的元数据
 * @public
 */
export class HIElementDefinition<TType extends Function = Function> {
    private observedAttributes: string[];

    /**
     * 此元素定义描述的类型
     */
    public readonly type: TType;

    /**
     * Indicates if this element has been defined in at least one registry.
     */
    public get isDefined(): boolean {
        return !!hiRegistry.getByType(this.type);
    }

    /**
     * 自定义元素的名称
     */
    public readonly name: string;

    /**
     * 自定义元素的自定义属性
     */
    public readonly attributes: ReadonlyArray<AttributeDefinition>;

    /**
     * 支持按关联属性名称查找属性的映射
     */
    public readonly propertyLookup: Record<string, AttributeDefinition>;

    /**
     * A map enabling lookup of property by associated attribute name.
     */
    public readonly attributeLookup: Record<string, AttributeDefinition>;

    /**
     * The template to render for the custom element.
     */
    public readonly template?: ElementViewTemplate;

    /**
     * The styles to associate with the custom element.
     */
    public readonly styles?: ElementStyles;

    /**
     * Options controlling the creation of the custom element's shadow DOM.
     */
    public readonly shadowOptions?: ShadowRootInit;

    /**
     * Options controlling how the custom element is defined with the platform.
     */
    public readonly elementOptions?: ElementDefinitionOptions;

    /**
     * Creates an instance of HIElementDefinition.
     * @param type - The type this definition is being created for.
     * @param nameOrConfig - The name of the element to define or a config object
     * that describes the element to define.
     */
    public constructor(
        type: TType,
        nameOrConfig: PartialHIElementDefinition | string = (type as any).definition
    ) {
        if (typeof nameOrConfig === "string") {
            nameOrConfig = { name: nameOrConfig };
        }

        this.type = type;
        this.name = nameOrConfig.name;
        this.template = nameOrConfig.template;

        const attributes = AttributeDefinition.collect(type, nameOrConfig.attributes);
        const observedAttributes = new Array<string>(attributes.length);
        const propertyLookup = {};
        const attributeLookup = {};

        for (let i = 0, ii = attributes.length; i < ii; ++i) {
            const current = attributes[i];
            observedAttributes[i] = current.attribute;
            propertyLookup[current.name] = current;
            attributeLookup[current.attribute] = current;
        }

        this.attributes = attributes;
        this.observedAttributes = observedAttributes;
        this.propertyLookup = propertyLookup;
        this.attributeLookup = attributeLookup;

        this.shadowOptions =
            nameOrConfig.shadowOptions === void 0
                ? defaultShadowOptions
                : nameOrConfig.shadowOptions === null
                ? void 0
                : { ...defaultShadowOptions, ...nameOrConfig.shadowOptions };

        this.elementOptions =
            nameOrConfig.elementOptions === void 0
                ? defaultElementOptions
                : { ...defaultElementOptions, ...nameOrConfig.elementOptions };

        this.styles =
            nameOrConfig.styles === void 0
                ? void 0
                : Array.isArray(nameOrConfig.styles)
                ? ElementStyles.create(nameOrConfig.styles)
                : nameOrConfig.styles instanceof ElementStyles
                ? nameOrConfig.styles
                : ElementStyles.create([nameOrConfig.styles]);
    }

    /**
     * Defines a custom element based on this definition.
     * @param registry - The element registry to define the element in.
     */
    public define(registry: CustomElementRegistry = customElements): this {
        const type = this.type;

        if (hiRegistry.register(this)) {
            const attributes = this.attributes;
            const proto = type.prototype;

            for (let i = 0, ii = attributes.length; i < ii; ++i) {
                Observable.defineProperty(proto, attributes[i]);
            }

            Reflect.defineProperty(type, "observedAttributes", {
                value: this.observedAttributes,
                enumerable: true,
            });
        }

        if (!registry.get(this.name)) {
            registry.define(this.name, type as any, this.elementOptions);
        }

        return this;
    }

    /**
     * Gets the element definition associated with the specified type.
     * @param type - The custom element type to retrieve the definition for.
     */
    static readonly forType = hiRegistry.getByType;
}
