/**
 * Holds authentication credentials for WebUntis.
 */
export class Credentials {
  /**
   * The base URL of the school's WebUntis server.
   */
  public readonly url: string;

  /**
   * The school identifier encoded as a prefixed base64 string.
   */
  public readonly schoolBase64: string;

  /**
   * @param school - The school identifier (e.g., "my-school").
   * @param username - The login username.
   * @param password - The login password.
   */
  constructor(
    public readonly school: string,
    public readonly username: string,
    public readonly password: string
  ) {
    this.url = `https://${school}.webuntis.com`;
    this.schoolBase64 = "_" + btoa(school);
  }
}