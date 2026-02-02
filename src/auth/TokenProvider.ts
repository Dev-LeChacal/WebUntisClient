import { Authenticator } from "./Authenticator";
import { Fetcher } from "./Fetcher";

export class TokenProvider {
    private tenantId: string | null = null;
    private token: string | null = null;
    private expiry: number = 0;

    constructor(
        private authenticator: Authenticator,
        private fetcher: Fetcher,
        private url: string,
    ) { }

    //#region Public

    async getToken(): Promise<string> {
        if (this._isTokenValid)
            return this.token!;

        return await this._fetchNewToken();
    }

    getTenantId(): string | null {
        return this.tenantId;
    }

    //#endregion

    //#region Private

    private get _isTokenValid(): boolean {
        const now = Date.now();

        const tokenIsNotNull = this.token !== null;
        const tokenIsNotExpired = now < this.expiry - 30_000;

        return tokenIsNotNull && tokenIsNotExpired;
    }

    private get _newExpiry(): number {
        return Date.now() + 15 * 60 * 1000;
    }

    private async _fetchNewToken(): Promise<string> {
        const token = await this.fetcher.newToken();

        this._storeToken(token);

        return token;
    }

    private _storeToken(token: string): void {
        this.token = token;
        this.expiry = this._newExpiry;

        const decoded = this._decodeJwt(token);
        this.tenantId = decoded.tenant_id;
    }

    private _decodeJwt(token: string): any {
        const payload = token.split(".")[1];
        const json = Buffer.from(payload, "base64").toString("utf8");
        return JSON.parse(json);
    }

    //#endregion
}