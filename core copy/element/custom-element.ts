import { setPrototype, transformValue } from "./set-prototype";
import { createHooks } from "../hooks/create-hooks";
export { Any } from "./set-prototype";
import { options } from "../options";
import { flat } from "../utils.js";
/**
 * Class to extend for lifecycle assignment
 * @param {any} component - Function to transform into customElement
 * @param {Base} [Base] - Class to extend for lifecycle assignment
 */
export function c(component: any, Base = HTMLElement) {
    /**
     * @type {import("./set-prototype").Attrs}
     */
    let attrs: {[x: string]: any;} = {};
    /**
     * @type {import("./set-prototype").Values}
     */
    let values: any = {};

    let { props, styles } = component;

    let Atom: any = class extends Base {
        private _render: () => any;
        private _props: any;
        mounted: Promise<unknown> | undefined;
        mount: any;
        unmounted: Promise<unknown> | undefined;
        unmount: any;
        symbolId: any;
        updated: any;
        constructor() {
            super();
            this._setup();
            this._render = () => component({ ...this._props });
            for (let prop in values) {
                let that: any = this;
                that[prop] = values[prop];
            }
        }
        /**
         * @returns {Style[]|Style}
         */
        static get styles() {
            //@ts-ignore
            return [super.styles, styles];
        }
        async _setup() {
            // _setup only continues if _props has not been defined
            if (this._props) return;

            this._props = {};

            this.mounted = new Promise((resolve) => (this.mount = resolve));
            this.unmounted = new Promise((resolve) => (this.unmount = resolve));

            this.symbolId = this.symbolId || Symbol();

            let hooks: any = createHooks(() => this.update(), this);

            let prevent: boolean;

            let firstRender = true;

            let hydrate = "hydrate" in this.dataset;

            this.update = () => {
                if (!prevent) {
                    prevent = true;

                    /**
                     * this.updated is defined at the runtime of the render,
                     * if it fails it is caught by mistake to unlock prevent
                     */
                    this.updated = (this.updated || this.mounted)
                        .then(() => {
                            try {
                                const result = hooks.load(this._render);

                                result &&
                                    result.render(
                                        this,
                                        this.symbolId,
                                        firstRender && hydrate
                                    );

                                prevent = false;

                                if (firstRender) {
                                    firstRender = false;
                                    // @ts-ignore
                                    applyStyles(this);
                                }

                                return !options.ssr && hooks.cleanEffects();
                            } finally {
                                // Remove lock in case of synchronous error
                                prevent = false;
                            }
                        })
                        // next tick
                        .then((cleanEffect: () => any) => {
                            cleanEffect && cleanEffect();
                        });
                }

                return this.updated;
            };

            this.update();

            options.ssr && options.ssr(this);

            await this.unmounted;

            !options.ssr && hooks.cleanEffects(true)();
        }
        update() {
            throw new Error("Method not implemented.");
        }
        connectedCallback() {
            this.mount();
            //@ts-ignore
            super.connectedCallback && super.connectedCallback();
        }
        async disconnectedCallback() {
            //@ts-ignore
            super.disconnectedCallback && super.disconnectedCallback();
            // The webcomponent will only resolve disconnected if it is
            // actually disconnected of the document, otherwise it will keep the record.
            await this.mounted;
            !this.isConnected && this.unmount();
        }
        /**
         * @param {string} attr
         * @param {(string|null)} oldValue
         * @param {(string|null)} value
         */
        attributeChangedCallback(attr: string | number, oldValue: any, value: string) {
            let that: any = this;
            if (attrs[attr]) {
                // _ignoreAttr exists temporarily
                // @ts-ignore
                if (attr === this._ignoreAttr || oldValue === value) return;
                // Choose the property name to send the update
                let { prop, type } = attrs[attr];
                that[prop] = transformValue(type, value);
            } else {
                // If the attribute does not exist in the scope attrs, the event is sent to super
                // @ts-ignore
                super.attributeChangedCallback(attr, oldValue, value);
            }
        }

        static get props() {
            //@ts-ignore
            return { ...super.props, ...props };
        }

        static get observedAttributes() {
            // See if there is an observedAttributes declaration to match with the current one
            // @ts-ignore
            let superAttrs = super.observedAttributes || [];
            for (let prop in props) {
                setPrototype(this.prototype, prop, props[prop], attrs, values);
            }
            return Object.keys(attrs).concat(superAttrs);
        }
    };

    return Atom;
}

/**
 * Attach the css to the shadowDom
 * @param {Base &  {shadowRoot: ShadowRoot, constructor: {styles: Style[] }} } host
 */
function applyStyles(host: any) {
    let { styles } = host.constructor;
    let { shadowRoot } = host;
    if (shadowRoot && styles.length) {
        if (options.sheet) {
            let sheets: any[] = [];
            flat(styles, (value) => value && sheets.push(value));
            //@ts-ignore
            shadowRoot.adoptedStyleSheets = sheets;
        } else {
            flat(
                styles,
                (style) =>
                    style && shadowRoot.appendChild(style.cloneNode(true))
            );
        }
    }
}

/**
 * @typedef {Object} ShadowRoot
 * @property {CSSStyleSheet[]} [adoptedStyleSheets]
 * @property {(child:ChildNode)=>void} appendChild
 */

/**
 * @typedef {typeof HTMLElement} Base
 */

/**
 * @typedef {Object} Context
 * @property {(value:any)=>void} mount
 * @property {(value:any)=>void} unmount
 * @property {Promise<void>} mounted
 * @property {Promise<void>} unmounted
 * @property {Promise<void>} updated
 * @property {()=>Promise<void>} update
 * @property {Object<string,any>} _props
 * @property {string} [_ignoreAttr]
 * @property {symbol} [symbolId]  - symbolId allows to obtain the symbol id that stores the state of the virtual-dom
 */

/**
 * @typedef {CSSStyleSheet|HTMLStyleElement} Style
 */

/**
 * @typedef { ReturnType<c> } Atom
 */

/**
 * @typedef { InstanceType< Atom > & {_ignoreAttr?: string } } AtomThis
 */
