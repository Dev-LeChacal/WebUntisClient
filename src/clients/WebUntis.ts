import { AppDataManager } from "../managers/AppData";
import { RequestManager } from "../managers/Request";
import { TokenManager } from "../managers/Token";
import { AbsencesModule } from "../modules/Absences";
import { AuthModule } from "../modules/Auth";
import { DataModule } from "../modules/Data";
import { HomeworksModule } from "../modules/Homeworks";
import { TimetableModule } from "../modules/Timetable";
import { Credentials } from "../structures";
import { Session } from "../structures/Session";
import { JsonRpcClient } from "./JsonRpc";

export class WebUntisClient {
  public readonly auth: AuthModule;
  public readonly timetable: TimetableModule;
  public readonly homeworks: HomeworksModule;
  public readonly absences: AbsencesModule;
  public readonly data: DataModule;

  constructor(credentials: Credentials) {
    const session = new Session(credentials.schoolBase64, credentials.url);

    // Managers
    const request = new RequestManager();
    const token = new TokenManager(request, session);
    const appData = new AppDataManager(request, token, session);

    // RPC Client
    const rpc = new JsonRpcClient(request, credentials.url);

    // Modules
    this.auth = new AuthModule(rpc, appData, token, session,);
    this.timetable = new TimetableModule(appData, request, token, session);
    this.homeworks = new HomeworksModule(request, session);
    this.absences = new AbsencesModule(appData, request, session);
    this.data = new DataModule(appData);
  }
}