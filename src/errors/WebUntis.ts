export class WebUntisError extends Error {
    constructor(message: string, readonly code?: string) {
        super(message);
        this.name = 'WebUntisError';
        Object.setPrototypeOf(this, WebUntisError.prototype);
    }
}