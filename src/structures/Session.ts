import { AuthError } from "../errors/Auth";
import { CurrentSession } from "../types/current-session";
import { RawSessionInfo } from "../types/responses/session";

export class Session {
    private session: CurrentSession = null;

    constructor(
        public readonly schoolBase64: string,
        public readonly url: string
    ) {
    }

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

    public get(): CurrentSession {
        return this.session;
    }

    public clear(): void {
        this.session = null;
    }

    public isAuthenticated(): boolean {
        return this.session !== null;
    }

    public getCookies(): string {
        if ( this.session === null ) {
            throw new AuthError("Tried to get cookies but session is null");
        }

        return `JSESSIONID=${this.session.sessionId}; schoolname=${this.schoolBase64}`;
    }

    public getPersonId(): number {
        if ( this.session === null ) {
            throw new AuthError("Tried to get person id but session is null");
        }

        return this.session.personId;
    }

    public getClassId(): number {
        if ( this.session === null ) {
            throw new AuthError("Tried to get class id but session is null");
        }

        return this.session.classId;
    }
}
