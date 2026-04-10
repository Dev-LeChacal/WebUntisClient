export class TokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TokenError";
    Object.setPrototypeOf(this, TokenError.prototype);
  }
}