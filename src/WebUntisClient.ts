import { AppDataManager } from "./managers/AppData";
import { RequestManager } from "./managers/RequestManager";
import { TokenManager } from "./managers/TokenManager";
import { AuthModule } from "./modules/Auth";
import { TimetableModule } from "./modules/Timetable";
import { JsonRpcClient } from "./network/JsonRpcClient";
import { Credentials } from "./structures/Credentials";
import { Session } from "./structures/Session";

export class WebUntisClient {
    public readonly auth: AuthModule;
    public readonly timetable: TimetableModule;

    constructor(credentials: Credentials) {
        const session = new Session(credentials.SchoolBase64);

        // Managers
        const request = new RequestManager();
        const token = new TokenManager(request, session, credentials.URL);
        const appData = new AppDataManager(request, token, session, credentials.URL);

        // RPC Client
        const rpc = new JsonRpcClient(request, credentials.URL);

        // Modules
        this.auth = new AuthModule(rpc, appData, token, session,);
        this.timetable = new TimetableModule(appData, request, token, session, credentials.URL);
    }
}