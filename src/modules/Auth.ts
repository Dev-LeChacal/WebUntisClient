import { AuthError } from "../errors/Auth";
import { AppDataManager } from "../managers/AppData";
import { TokenManager } from "../managers/TokenManager";
import { JsonRpcClient } from "../network/JsonRpcClient";
import { Session } from "../structures/Session";
import { SessionInfo } from "../types/session";

export class AuthModule {
    constructor(
        private readonly rpc: JsonRpcClient,
        private readonly appData: AppDataManager,
        private readonly token: TokenManager,
        private readonly session: Session,
    ) {
    }

    async login(username: string, password: string): Promise<SessionInfo> {
        const raw = await this.rpc.login(username, password);
        this.session.set(raw);
        await this.token.fetchToken();

        const session = this.session.get();

        if ( session === null ) {
            throw new AuthError("Logged in but the session is null");
        }

        await this.appData.get();

        return session;
    }

    async logout(): Promise<void> {
        try {
            const cookies = this.session.getCookies();
            await this.rpc.logout(cookies);

        } finally {
            this.session.clear();
            this.token.clear();
            this.appData.clear();
        }
    }

    isAuthenticated(): boolean {
        return this.session.isAuthenticated();
    }

    getSession(): SessionInfo | null {
        return this.session.get();
    }
}