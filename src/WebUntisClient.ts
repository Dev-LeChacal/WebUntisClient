import { AuthModule } from "./modules/Auth";
import { TimetableModule } from "./modules/Timetable";
import { JsonRpcClient } from "./network/JsonRpcClient";
import { RequestManager } from "./network/RequestManager";
import { TokenManager } from "./network/TokenManager";
import { Credentials } from "./structures/Credentials";
import { Session } from "./structures/Session";

export class WebUntisClient {
    public readonly auth: AuthModule;
    public readonly timetable: TimetableModule;

    constructor(credentials: Credentials) {
        const session = new Session(credentials.SchoolBase64);

        // Managers
        const requestManager = new RequestManager();
        const tokenManager = new TokenManager(requestManager, session, credentials.URL);

        // RPC Client
        const rpc = new JsonRpcClient(requestManager, credentials.URL);

        // Modules
        this.auth = new AuthModule(rpc, tokenManager, session,);
        this.timetable = new TimetableModule(requestManager, tokenManager, session, credentials.URL);
    }
}