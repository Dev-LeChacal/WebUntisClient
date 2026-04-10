export class AppDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AppDataError";
    Object.setPrototypeOf(this, AppDataError.prototype);
  }
}