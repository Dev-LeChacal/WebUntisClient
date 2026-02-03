import { WebUntisError } from "./WebUntis";

export class AuthenticationError extends WebUntisError {
    constructor(message: string, code?: string) {
        super(message, code);
        this.name = 'AuthenticationError';
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}