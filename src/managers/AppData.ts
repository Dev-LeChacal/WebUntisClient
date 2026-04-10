import { Session } from "../structures/Session";
import { AppData } from "../types/app-data";
import { RequestManager } from "./Request";
import { TokenManager } from "./Token";

export class AppDataManager {
  private cache!: AppData;

  constructor(
    private readonly request: RequestManager,
    private readonly token: TokenManager,
    private readonly session: Session,
  ) {
  }

  public async get(): Promise<AppData> {
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

  public getSchoolYearId(): number {
    return this.cache.currentSchoolYear.id;
  }

  public getStudentId(): number {
    return this.cache.user.person.id;
  }
}