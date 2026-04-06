export class Credentials {
  public readonly url: string;
  public readonly schoolBase64: string;

  constructor(
    public readonly school: string,
    public readonly username: string,
    public readonly password: string
  ) {
    this.url = `https://${school}.webuntis.com`;
    this.schoolBase64 = "_" + btoa(school);
  }
}