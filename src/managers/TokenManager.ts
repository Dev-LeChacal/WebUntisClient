import { AuthError } from "../errors/Auth";
import { Session } from "../structures/Session";
import { RequestManager } from "./RequestManager";

export class TokenManager {
    private readonly TOKEN_BUFFER_MS = 30000; // 30 sec
    private readonly TOKEN_LIFETIME_MS = 15 * 60 * 1000; // 15 min

    private token: string | null = null;
    private tenantId: string | null = null;
    private expiryTime: number = 0;

    constructor(
        private readonly request: RequestManager,
        private readonly session: Session,
        private readonly baseURL: string,
    ) {
    }

    async fetchToken(): Promise<void> {
        const cookies = this.session.getCookies();

        const token = await this.request.getText(
            `${this.baseURL}/WebUntis/api/token/new`,
            { Cookie: cookies }
        );

        this.token = token;
        this.expiryTime = Date.now() + this.TOKEN_LIFETIME_MS;
        this.tenantId = this.decodeJWT(token);
    }

    async getToken(): Promise<string> {
        if ( this.token === null || this.isTokenExpired() ) {
            await this.fetchToken();
        }

        if ( this.token === null ) {
            throw new AuthError("Token not found");
        }

        return this.token;
    }

    getTenantId(): string {
        if ( this.tenantId === null ) {
            throw new AuthError("No tenant id");
        }

        return this.tenantId;
    }

    clear(): void {
        this.token = null;
        this.tenantId = null;
        this.expiryTime = 0;
    }

    private decodeJWT(token: string): string {
        const parts = token.split(".");

        if ( parts.length !== 3 ) {
            throw new Error("Invalid JWT format");
        }

        const payload = parts[1];
        const json = Buffer.from(payload, "base64").toString("utf8");

        return JSON.parse(json).tenant_id;
    }

    private isTokenExpired(): boolean {
        return Date.now() >= this.expiryTime - this.TOKEN_BUFFER_MS;
    }
}