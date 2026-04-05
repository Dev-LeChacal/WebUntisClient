import { AuthError } from "../errors/Auth";
import { JsonRpcClient } from "../network/JsonRpcClient";
import { TokenManager } from "../network/TokenManager";
import { Session } from "../structures/Session";
import { SessionInfo } from "../types/session";

export class AuthModule {
    constructor(
        private readonly rpc: JsonRpcClient,
        private readonly tokenManager: TokenManager,
        private readonly session: Session,
    ) {
    }

    async login(username: string, password: string): Promise<SessionInfo> {
        const raw = await this.rpc.login(username, password);
        this.session.set(raw);
        await this.tokenManager.fetchToken();

        const session = this.session.get();

        if ( session === null ) {
            throw new AuthError("Logged in but the session is null");
        }

        return session;
    }

    async logout(): Promise<void> {
        try {
            const cookies = this.session.getCookies();
            await this.rpc.logout(cookies);

        } finally {
            this.session.clear();
            this.tokenManager.clear();
        }
    }

    isAuthenticated(): boolean {
        return this.session.isAuthenticated();
    }

    getSession(): SessionInfo | null {
        return this.session.get();
    }
}