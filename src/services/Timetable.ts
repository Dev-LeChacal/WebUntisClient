import { Authenticator } from "../auth/Authenticator";
import { TokenProvider } from "../auth/TokenProvider";
import { Fetcher } from "../infrastructure/Fetcher";
import { TimetableResponse } from "../types/timetable";
import { SchoolYearService } from "./SchoolYear";

export class TimetableService {
    constructor(
        private fetcher: Fetcher,
        private tokenProvider: TokenProvider,
        private authenticator: Authenticator,
        private schoolYearService: SchoolYearService,
        private url: string,
    ) { }

    async getTimetable(start: Date, end: Date): Promise<TimetableResponse> {
        const token = await this.tokenProvider.getToken();
        const tenantId = this.tokenProvider.getTenantId();
        const session = this.authenticator.getSession();
        const schoolYearId = this.schoolYearService.getYearIdString();

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

        return await this.fetcher.timetable(token, tenantId!, schoolYearId, params);
    }
}