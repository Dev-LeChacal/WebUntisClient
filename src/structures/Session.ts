import { AuthError } from "../errors/Auth";
import { CurrentSession } from "../types/current-session";
import { RawSessionInfo } from "../types/responses/session";

/**
 * Manages the current WebUntis user session and its state.
 */
export class Session {
  private session: CurrentSession = null;

  /**
   * @param schoolBase64 - The school identifier in base64 format.
   * @param url - The base URL of the WebUntis server.
   */
  constructor(
    public readonly schoolBase64: string,
    public readonly url: string
  ) {
  }

  /**
   * Initializes the session with raw data from the server.
   * @param raw - The raw session information received from the API.
   * @throws {AuthError} If required session fields are missing.
   */
  public set(raw: RawSessionInfo): void {
    if ( raw.sessionId === undefined || raw.klasseId === undefined || raw.personId === undefined || raw.personType === undefined ) {
      const properties = (["sessionId", "klasseId", "personId", "personType"] as (keyof RawSessionInfo)[]);
      const missing = properties.filter(key => raw[key] === undefined);

      throw new AuthError(`Cannot set session: missing fields: ${missing.join(", ")}`);
    }

    this.session = {
      sessionId: raw.sessionId,
      classId: raw.klasseId,
      personId: raw.personId,
      personType: raw.personType
    };
  }

  /**
   * Returns the current session state.
   * @returns The session object or null if not authenticated.
   */
  public get(): CurrentSession {
    return this.session;
  }

  /**
   * Clears the current session, effectively logging out the user.
   */
  public clear(): void {
    this.session = null;
  }

  /**
   * Checks if the user is currently authenticated.
   * @returns True if a valid session exists.
   */
  public isAuthenticated(): boolean {
    return this.session !== null;
  }

  /**
   * Constructs the cookie string required for authorized API requests.
   * @returns A string containing JSESSIONID and schoolname.
   * @throws {AuthError} If called when the session is null.
   */
  public getCookies(): string {
    if ( this.session === null ) {
      throw new AuthError("Tried to get cookies but session is null");
    }

    return `JSESSIONID=${this.session.sessionId}; schoolname=${this.schoolBase64}`;
  }

  /**
   * Retrieves the current user's person ID.
   * @returns The person ID as a number.
   * @throws {AuthError} If called when the session is null.
   */
  public getPersonId(): number {
    if ( this.session === null ) {
      throw new AuthError("Tried to get person id but session is null");
    }

    return this.session.personId;
  }

  /**
   * Retrieves the current user's class (Klasse) ID.
   * @returns The class ID as a number.
   * @throws {AuthError} If called when the session is null.
   */
  public getClassId(): number {
    if ( this.session === null ) {
      throw new AuthError("Tried to get class id but session is null");
    }

    return this.session.classId;
  }
}
