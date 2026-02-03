import { HttpClient } from "../clients/Http";
import { AuthenticationError } from "../errors/Authentication";

interface TokenPayload {
    tenant_id: string;
    exp?: number;
}

/**
 * Manages JWT tokens for API authentication
 */
export class TokenManager {
    private _token: string | null = null;
    private _tenantId: string | null = null;
    private _expiryTime: number = 0;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    private readonly TOKEN_BUFFER_MS = 30000; // 30 sec

    // eslint-disable-next-line @typescript-eslint/naming-convention
    private readonly TOKEN_LIFETIME_MS = 15 * 60 * 1000; // 15 min

    constructor(
        private readonly _httpClient: HttpClient,
        private readonly getCookies: () => string,
    ) { }

    /**
     * Get current valid token (fetches new one if needed)
     */
    async getToken(): Promise<string> {
        if (this._isTokenValid()) {
            return this._token!;
        }

        return this._fetchNewToken();
    }

    /**
     * Get tenant ID from current token
     */
    getTenantId(): string | null {
        return this._tenantId;
    }

    /**
     * Clear cached token
     */
    clearToken(): void {
        this._token = null;
        this._tenantId = null;
        this._expiryTime = 0;
    }

    /**
     * Check if current token is still valid
     */
    private _isTokenValid(): boolean {
        if (!this._token) {
            return false;
        }

        const now = Date.now();

        return now < this._expiryTime - this.TOKEN_BUFFER_MS;
    }

    /**
     * Fetch a new token from the API
     */
    private async _fetchNewToken(): Promise<string> {
        try {
            const cookies = this.getCookies();

            const token = await this._httpClient.getText(
                '/WebUntis/api/token/new',
                { Cookie: cookies },
            );

            this._storeToken(token);

            return token;

        } catch (error) {
            throw new AuthenticationError(
                `Failed to fetch token: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    /**
     * Store token and tenant id
     */
    private _storeToken(token: string): void {
        this._token = token;
        this._expiryTime = Date.now() + this.TOKEN_LIFETIME_MS;

        try {
            const payload = this._decodeJwt(token);
            this._tenantId = payload.tenant_id;

        } catch {
            throw new AuthenticationError('Failed to decode JWT token');
        }
    }

    /**
     * Decode JWT token payload
     */
    private _decodeJwt(token: string): TokenPayload {
        const parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('Invalid JWT format');
        }

        const payload = parts[1];
        const json = Buffer.from(payload, 'base64').toString('utf8');

        return JSON.parse(json);
    }
}