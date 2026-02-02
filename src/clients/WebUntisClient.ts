import { Authenticator } from "../services/Authenticator";
import { Fetcher } from "../services/Fetcher";
import { TokenProvider } from "../services/TokenProvider";
import { Credentials } from "../types/credentials";
import { SessionInfo } from "../types/session";
import { SchoolYear } from "../types/year";
import { JsonRpcClient } from "./JsonRpcClient";

export class WebUntisClient {
    private credentials: Credentials;

    private url: string;
    private schoolBase64: string;

    private rpc: JsonRpcClient;
    private authenticator: Authenticator;
    private tokenProvider: TokenProvider;
    private fetcher: Fetcher;

    private schoolYearId: number | null = null;

    constructor(credentials: Credentials) {
        this.credentials = credentials;

        const { school, identity, url } = credentials;

        this.url = url || `https://${school}.webuntis.com`;
        this.schoolBase64 = "_" + Buffer.from(school).toString("base64");

        this.rpc = new JsonRpcClient(identity, this.url);
        this.authenticator = new Authenticator(this.credentials, this.schoolBase64, this.rpc);
        this.fetcher = new Fetcher(this.authenticator, this.url);
        this.tokenProvider = new TokenProvider(this.authenticator, this.fetcher, this.url);
    }

    //#region Login/Logout

    async login(): Promise<SessionInfo> {
        const session = await this.authenticator.login();

        await this.getToken();
        await this._loadSchoolYear();

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


    //#region En cours de refactor

    private async _loadSchoolYear() {
        const token = await this.getToken();
        const tenantId = this.getTenantId();
        const cookies = this.getCookies();

        const result = await fetch(
            `${this.url}/WebUntis/api/rest/view/v1/schoolyears`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "tenant-id": tenantId!,
                    Cookie: cookies
                }
            }
        );

        if (!result.ok)
            throw new Error(`School year request failed with status ${result.status}`);

        const schoolYears: SchoolYear[] = await result.json();

        if (!Array.isArray(schoolYears) || schoolYears.length === 0)
            throw new Error("No school year data returned");

        const currentYear = schoolYears[0];

        this.schoolYearId = currentYear.id;
    }

    async getTimetable(start: Date, end: Date): Promise<any> {
        const token = await this.getToken();
        const tenantId = this.getTenantId();
        const session = this.getSession();
        const cookies = this.getCookies();

        const startDate = start.toISOString().split("T")[0];
        const endDate = end.toISOString().split("T")[0];

        const params = new URLSearchParams({
            start: startDate,
            end: endDate,
            format: "4",
            resourceType: "STUDENT",
            resources: session!.personId!.toString(),
            periodTypes: "",
            timetableType: "MY_TIMETABLE",
            layout: "START_TIME",
        });

        const result = await fetch(
            `${this.url}/WebUntis/api/rest/view/v1/timetable/entries?${params}`,
            {
                headers: {
                    Cookie: cookies,
                    Authorization: `Bearer ${token}`,
                    "tenant-id": tenantId!,
                    "x-webuntis-api-school-year-id": this.schoolYearId!.toString(),
                },
            }
        );

        if (!result.ok)
            throw new Error(`Timetable request failed with status ${result.status}`);

        return await result.json();
    }

    //#endregion
}