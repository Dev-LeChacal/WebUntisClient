import { AuthError } from "../errors/Auth";
import { CurrentSessionInfo } from "../types/current-session-info";
import { RawSessionInfo } from "../types/responses/session";

export class Session {
    private session: CurrentSessionInfo = null;

    set(raw: RawSessionInfo): void {
        if (raw.sessionId === undefined || raw.klasseId === undefined || raw.personId === undefined || raw.personType === undefined) {
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

    get(): CurrentSessionInfo {
        return this.session;
    }

    clear(): void {
        this.session = null;
    }

    isAuthenticated(): boolean {
        return this.session !== null;
    }

    getCookies(school: string): string {
        if (this.session === null) {
            throw new AuthError("Tried to get cookies but session is null");
        }

        return `JSESSIONID=${this.session.sessionId}; schoolname=${school}`;
    }

    getPersonId(): number {
        if (this.session === null) {
            throw new AuthError("Tried to get person id but session is null");
        }

        return this.session.personId;
    }

    getClassId(): number {
        if (this.session === null) {
            throw new AuthError("Tried to get class id but session is null");
        }

        return this.session.classId;
    }
}
