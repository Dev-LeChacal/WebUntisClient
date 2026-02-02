import { JsonRpcClient } from "../clients/JsonRpcClient";
import { Credentials } from "../types/credentials";
import { SessionInfo } from "../types/session";

export class Authenticator {
    private session: SessionInfo | null = null;

    constructor(
        private credentials: Credentials,
        private schoolBase64: string,
        private rpc: JsonRpcClient,
    ) { }

    //#region Public

    resetSession(): void {
        this.session = null;
    }

    getSession(): SessionInfo | null {
        return this.session;
    }

    getCookies(): string {
        return this._cookies;
    }

    //#endregion

    //#region Private

    private get _cookies(): string {
        if (!this.session)
            throw new Error("Not authenticated");

        return `JSESSIONID=${this.session!.sessionId}; schoolname=${this.schoolBase64}`;
    }

    //#endregion

    //#region Login/Logout

    async login(): Promise<SessionInfo> {
        const { username, password, identity } = this.credentials;
        this.session = await this.rpc.authenticate(username, password, identity);
        return this.session;
    }

    async logout(): Promise<boolean> {
        await this.rpc.logout(this._cookies);
        this.resetSession();
        return true;
    }

    //#endregion
}