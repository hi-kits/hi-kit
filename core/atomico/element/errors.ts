export class PropError {
    message: string;
    target: HTMLElement;
    value: string;
    /**
     *
     * @param {HTMLElement} target
     * @param {string} message
     * @param {string} value
     */
    constructor(target: HTMLElement, message: string, value: string) {
        this.message = message;
        this.target = target;
        this.value = value;
    }
}
