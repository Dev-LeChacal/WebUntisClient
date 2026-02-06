import { JsonRpcClient } from "../clients/JsonRpc";
import { Credentials } from "../Credentials";
import { AuthenticationError } from "../errors/Authentication";
import { SessionInfo } from "../types/session/session";

/**
 * Manages authentication state and session cookies
 */
export class AuthenticationManager {
    private _session: SessionInfo | null = null;

    constructor(
        private readonly _credentials: Credentials,
        private readonly _rpc: JsonRpcClient
    ) {
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return this._session !== null && !!this._session.sessionId;
    }

    /**
     * Get current session info
     */
    getSession(): SessionInfo | null {
        return this._session;
    }

    /**
     * Get session cookies
     */
    getCookies(): string {
        if (!this._session?.sessionId) {
            throw new AuthenticationError("Not authenticated");
        }

        const { schoolBase64 } = this._credentials;

        return `JSESSIONID=${this._session.sessionId}; schoolname=${schoolBase64}`;
    }

    /**
     * Login
     */
    async login(): Promise<SessionInfo> {
        const { username, password, identity } = this._credentials;

        this._session = await this._rpc.authenticate(
            username,
            password,
            identity
        );

        return this._session;
    }

    /**
     * Logout
     */
    async logout(): Promise<void> {
        const hasSession = this.isAuthenticated();

        if (!hasSession) {
            return;
        }

        try {
            const cookies = this.getCookies();
            await this._rpc.logout(cookies);
        } finally {
            this.clearSession();
        }
    }

    /**
     * Clear session (without calling logout endpoint)
     */
    clearSession(): void {
        this._session = null;
    }
}