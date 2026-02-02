
import { Authenticator } from "../auth/Authenticator";
import { TokenProvider } from "../auth/TokenProvider";
import { Fetcher } from "../infrastructure/Fetcher";
import { SchoolYearService } from "../services/SchoolYear";
import { TimetableService } from "../services/Timetable";
import { Credentials } from "../types/credentials";
import { SessionInfo } from "../types/session";
import { TimetableResponse } from "../types/timetable";
import { JsonRpcClient } from "./JsonRpcClient";

export class WebUntisClient {
    private credentials: Credentials;

    private url: string;
    private schoolBase64: string;

    private rpc: JsonRpcClient;
    private authenticator: Authenticator;
    private tokenProvider: TokenProvider;
    private fetcher: Fetcher;

    private schoolYearService: SchoolYearService;
    private timetableService: TimetableService;

    constructor(credentials: Credentials) {
        this.credentials = credentials;

        const { school, identity, url } = credentials;

        this.url = url || `https://${school}.webuntis.com`;
        this.schoolBase64 = "_" + Buffer.from(school).toString("base64");

        this.rpc = new JsonRpcClient(identity, this.url);
        this.authenticator = new Authenticator(this.credentials, this.schoolBase64, this.rpc);
        this.fetcher = new Fetcher(this.authenticator, this.url);
        this.tokenProvider = new TokenProvider(this.authenticator, this.fetcher, this.url);

        this.schoolYearService = new SchoolYearService(this.tokenProvider, this.fetcher);
        this.timetableService = new TimetableService(this.tokenProvider, this.authenticator, this.schoolYearService, this.url);
    }

    //#region Login/Logout

    async login(): Promise<SessionInfo> {
        const session = await this.authenticator.login();

        await this.getToken();
        await this.loadSchoolYearId();

        return session;
    }

    async logout(): Promise<boolean> {
        return await this.authenticator.logout();
    }

    //#endregion


    //#region Authenticator

    getSession(): SessionInfo | null {
        return this.authenticator.getSession();
    }

    getCookies(): string {
        return this.authenticator.getCookies();
    }

    //#endregion

    //#region TokenProvider

    async getToken(): Promise<string> {
        return await this.tokenProvider.getToken();
    }

    getTenantId(): string | null {
        return this.tokenProvider.getTenantId();
    }

    //#endregion

    //#region SchoolYear

    async loadSchoolYearId(): Promise<number> {
        return await this.schoolYearService.loadSchoolYearId();
    }

    getSchoolYearId(): number | null {
        return this.schoolYearService.getYearId();
    }

    getSchoolYearIdString(): string {
        return this.schoolYearService.getYearIdString();
    }

    //#endregion

    //#region Timetable

    async getTimetable(start: Date, end: Date): Promise<TimetableResponse> {
        return await this.timetableService.getTimetable(start, end);
    }

    //#endregion
}