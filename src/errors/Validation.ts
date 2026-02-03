import { WebUntisError } from "./WebUntis";

export class ValidationError extends WebUntisError {
    constructor(message: string, code?: string) {
        super(message, code);
        this.name = 'ValidationError';
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}