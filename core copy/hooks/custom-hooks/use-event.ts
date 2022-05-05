import { useHost } from "../create-hooks";
import { dispatchEvent } from "../../element/set-prototype";
/**
 *
 * @param {string} type
 * @param {import("../../element/set-prototype").InternalEventInit} [eventInit]
 */
export function useEvent(type: string | number, eventInit: {[x: string]: any;} = {}) {
    let ref = useHost();
    if (!ref[type]) {
        ref[type] = (detail = eventInit.detail) =>
            dispatchEvent(ref.current, {
                type,
                ...eventInit,
                detail,
            });
    }
    return ref[type];
}
