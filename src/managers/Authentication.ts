import { JsonRpcClient } from "../clients/JsonRpc";
import { Credentials } from "../Credentials";
import { AuthenticationError } from "../errors/Authentication";
import { SessionInfo } from "../types/session/session";

/**
 * Manages authentication state and session cookies
 */
export class AuthenticationManager {
    private session: SessionInfo | null = null;

    constructor(
        private readonly credentials: Credentials,
        private readonly rpcClient: JsonRpcClient
    ) {
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return this.session !== null && !!this.session.sessionId;
    }

    /**
     * Get current session info
     */
    getSession(): SessionInfo | null {
        return this.session;
    }

    /**
     * Get session cookies
     */
    getCookies(): string {
        if (!this.session?.sessionId) {
            throw new AuthenticationError("Not authenticated");
        }

        const { SchoolBase64 } = this.credentials;

        return `JSESSIONID=${this.session.sessionId}; schoolname=${SchoolBase64}`;
    }

    /**
     * Login
     */
    async login(): Promise<SessionInfo> {
        const { Username, Password, Identity } = this.credentials;

        this.session = await this.rpcClient.authenticate(
            Username,
            Password,
            Identity
        );

        return this.session;
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
            await this.rpcClient.logout(cookies);
        } finally {
            this.clearSession();
        }
    }

    /**
     * Clear session (without calling logout endpoint)
     */
    clearSession(): void {
        this.session = null;
    }
}