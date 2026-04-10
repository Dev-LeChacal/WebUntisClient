import { JsonRpcClient } from "../clients/JsonRpc";
import { AuthError } from "../errors/Auth";
import { AppDataManager } from "../managers/AppData";
import { TokenManager } from "../managers/Token";
import { Session } from "../structures/Session";
import { CurrentSession } from "../types/current-session";
import { SessionInfo } from "../types/session";

/**
 * Handles authentication
 */
export class AuthModule {
  constructor(
    private readonly rpc: JsonRpcClient,
    private readonly appData: AppDataManager,
    private readonly token: TokenManager,
    private readonly session: Session,
  ) {
  }

  /**
   * Login with credentials
   * @param username
   * @param password
   */
  public async login(username: string, password: string): Promise<SessionInfo> {
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

  /**
   * Logout the current session
   */
  public async logout(): Promise<void> {
    try {
      const cookies = this.session.getCookies();
      await this.rpc.logout(cookies);

    } finally {
      this.session.clear();
      this.token.clear();
      this.appData.clear();
    }
  }

  /**
   * Check if the current session is valid
   */
  public isAuthenticated(): boolean {
    return this.session.isAuthenticated();
  }

  /**
   * Returns the current session information
   */
  public getSession(): CurrentSession {
    return this.session.get();
  }
}