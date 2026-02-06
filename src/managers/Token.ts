import { HttpClient } from "../clients/Http";
import { AuthenticationError } from "../errors/Authentication";

interface TokenPayload {
    tenant_id: string;
}

/**
 * Manages JWT tokens for API authentication
 */
export class TokenManager {
    private token: string | null = null;
    private tenantId: string | null = null;
    private expiryTime: number = 0;

    private readonly TOKEN_BUFFER_MS = 30000; // 30 sec
    private readonly TOKEN_LIFETIME_MS = 15 * 60 * 1000; // 15 min

    constructor(
        private readonly httpClient: HttpClient,
        private readonly getCookies: () => string
    ) {
    }

    /**
     * Get current valid token (fetches new one if needed)
     */
    async getToken(): Promise<string> {
        if (this._isTokenValid()) {
            return this.token!;
        }

        return this._fetchNewToken();
    }

    /**
     * Get tenant ID from current token
     */
    getTenantId(): string | null {
        return this.tenantId;
    }

    /**
     * Clear cached token
     */
    clearToken(): void {
        this.token = null;
        this.tenantId = null;
        this.expiryTime = 0;
    }

    /**
     * Check if current token is still valid
     */
    private _isTokenValid(): boolean {
        if (!this.token) {
            return false;
        }

        const now = Date.now();

        return now < this.expiryTime - this.TOKEN_BUFFER_MS;
    }

    /**
     * Fetch a new token from the API
     */
    private async _fetchNewToken(): Promise<string> {
        try {
            const cookies = this.getCookies();

            const token = await this.httpClient.getText(
                "/WebUntis/api/token/new",
                { Cookie: cookies }
            );

            this._storeToken(token);

            return token;

        } catch (error) {
            throw new AuthenticationError(
                `Failed to fetch token: ${error instanceof Error ? error.message : "Unknown error"}`
            );
        }
    }

    /**
     * Store token and tenant id
     */
    private _storeToken(token: string): void {
        this.token = token;
        this.expiryTime = Date.now() + this.TOKEN_LIFETIME_MS;

        try {
            const payload = this._decodeJwt(token);
            this.tenantId = payload.tenant_id;

        } catch {
            throw new AuthenticationError("Failed to decode JWT token");
        }
    }

    /**
     * Decode JWT token payload
     */
    private _decodeJwt(token: string): TokenPayload {
        const parts = token.split(".");

        if (parts.length !== 3) {
            throw new Error("Invalid JWT format");
        }

        const payload = parts[1];
        const json = Buffer.from(payload, "base64").toString("utf8");

        return JSON.parse(json);
    }
}