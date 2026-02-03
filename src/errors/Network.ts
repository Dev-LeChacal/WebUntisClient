import { WebUntisError } from "./WebUntis";

export class NetworkError extends WebUntisError {
    constructor(
        message: string,
        public readonly statusCode?: number,
        code?: string
    ) {
        super(message, code);
        this.name = 'NetworkError';
        Object.setPrototypeOf(this, NetworkError.prototype);
    }
}