export class SearchError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SearchError";
        Object.setPrototypeOf(this, SearchError.prototype);
    }
}