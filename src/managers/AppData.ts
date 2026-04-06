import { Session } from "../structures/Session";
import { AppData } from "../types/app-data";
import { RequestManager } from "./RequestManager";
import { TokenManager } from "./TokenManager";

type CurrentAppData = AppData | null;

export class AppDataManager {
    private cache: CurrentAppData = null;

    constructor(
        private readonly request: RequestManager,
        private readonly token: TokenManager,
        private readonly session: Session,
    ) {
    }

    public async get(): Promise<AppData> {
        if ( this.cache !== null ) {
            return this.cache;
        }

        const token = `Bearer ${await this.token.getToken()}`;
        const tenantId = this.token.getTenantId();
        const cookies = this.session.getCookies();

        const url = `${this.session.url}/WebUntis/api/rest/view/v1/app/data`;
        this.cache = await this.request.get<AppData>(url, {
            Authorization: token,
            "tenant-id": tenantId,
            Cookie: cookies
        });

        return this.cache;
    }

    public clear() {
        this.cache = null;
    }

    public async getSchoolYearId(): Promise<number> {
        await this.getIfNull();
        return this.cache!.currentSchoolYear.id;
    }

    public async getStudentId(): Promise<number> {
        await this.getIfNull();
        return this.cache!.user.person.id;
    }

    private async getIfNull() {
        if ( this.cache === null ) {
            await this.get();
        }
    }
}