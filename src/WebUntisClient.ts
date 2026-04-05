import { AuthModule } from "./modules/Auth";
import { JsonRpcClient } from "./network/JsonRpcClient";
import { RequestManager } from "./network/RequestManager";
import { TokenManager } from "./network/TokenManager";
import { Credentials } from "./structures/Credentials";
import { Session } from "./structures/Session";

export class WebUntisClient {
    public readonly auth: AuthModule;

    constructor(credentials: Credentials) {
        const session = new Session();

        // Managers
        const requestManager = new RequestManager();
        const tokenManager = new TokenManager(requestManager, session, credentials.URL, credentials.School);

        // RPC Client
        const rpc = new JsonRpcClient(requestManager, credentials.URL);

        // Modules
        this.auth = new AuthModule(rpc, session, tokenManager, credentials.SchoolBase64);
    }
}