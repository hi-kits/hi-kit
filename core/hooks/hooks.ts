import { useHook, useUpdate } from "./create-hooks";

import { isEqualArray, isFunction } from "../utils";

export * from "./use-effect";
export * from "./custom-hooks/use-prop";
export * from "./custom-hooks/use-event";
/**
 * Create a persistent local state
 * @param {*} initialState
 */
export function useState(initialState: any) {
    // retrieve the render to request an update
    let update = useUpdate();

    return useHook((state: any = []) => {
        if (!state[1]) {
            let load = (value: any) => (isFunction(value) ? value(state[0]) : value);
            // Initialize the initial state
            state[0] = load(initialState);
            // Associate an immutable setState to the state instance
            state[1] = (nextState: any) => {
                nextState = load(nextState);
                if (state[0] !== nextState) {
                    state[0] = nextState;
                    update();
                }
            };
        }
        // The return is always the same reference
        return state;
    });
}

/**
 * Memorize the return of a callback
 * @template T
 * @param {(args:any[])=>T} currentMemo
 * @param {any[]} [currentArgs]
 * @returns {T}
 */
export function useMemo(currentMemo: any, currentArgs: any) {
    let [state] = useHook(([state, args, cycle = 0]: any = []) => {
        if (!args || (args && !isEqualArray(args, currentArgs))) {
            state = currentMemo(currentArgs);
        }
        return [state, currentArgs, cycle];
    });
    return state;
}
/**
 * Apply the redux pattern as a hook
 * @param {(state:any,action:any)=>any} reducer
 * @param {any} initialState
 */
export function useReducer(reducer: any, initialState: any) {
    let render = useUpdate();
    return useHook((state: any = []) => {
        if (!state[1]) {
            state[0] = initialState;
            state[1] = (action: any) => {
                let nextState = reducer(state[0], action);
                if (nextState != state[0]) {
                    state[0] = nextState;
                    render();
                }
            };
        }
        return state;
    });
}
/**
 * Memorize a callback allowing it to remember the scope
 * variables regardless of the render
 * @template {()=>any} T;
 * @param {T} callback
 * @param {any[]} [args]
 * @returns {T}
 */
export function useCallback(callback: any, args: any) {
    return useMemo(() => callback, args);
}
