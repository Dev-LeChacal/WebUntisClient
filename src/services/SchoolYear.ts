import { TokenProvider } from "../auth/TokenProvider";
import { Fetcher } from "../infrastructure/Fetcher";

export class SchoolYearService {
    private id: number | null = null;

    constructor(
        private tokenProvider: TokenProvider,
        private fetcher: Fetcher,
    ) { }

    getYearId(): number | null {
        return this.id;
    }

    getYearIdString(): string {
        return this.id!.toString();
    }

    async loadSchoolYearId(): Promise<number> {
        const token = await this.tokenProvider.getToken();
        const tenantId = this.tokenProvider.getTenantId()!;

        const schoolYears = await this.fetcher.schoolYears(token, tenantId);

        if (!Array.isArray(schoolYears) || schoolYears.length === 0)
            throw new Error("No school year data returned");

        const currentYear = schoolYears[0];

        this.id = currentYear.id;

        return this.id;
    }
}