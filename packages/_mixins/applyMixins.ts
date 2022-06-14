/**
 * 将mixin应用于构造函数
 * 来源于 {@link https://www.typescriptlang.org/docs/handbook/mixins.html | TypeScript Documentation }
 * @function applyMixins
 * @version 0.0.1
 * @author by fico on 2022/06/13
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @public
 */
 export function applyMixins(derivedCtor: any, ...baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            if (name !== "constructor") {
                Object.defineProperty(
                    derivedCtor.prototype,
                    name,
                    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
                    Object.getOwnPropertyDescriptor(baseCtor.prototype, name)!
                );
            }
        });

        if (baseCtor.attributes) {
            const existing = derivedCtor.attributes || [];
            derivedCtor.attributes = existing.concat(baseCtor.attributes);
        }
    });
}
