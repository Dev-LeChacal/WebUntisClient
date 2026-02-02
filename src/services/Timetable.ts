import { Authenticator } from "../auth/Authenticator";
import { TokenProvider } from "../auth/TokenProvider";
import { TimetableResponse } from "../types/timetable";
import { SchoolYearService } from "./SchoolYear";

export class TimetableService {
    constructor(
        private tokenProvider: TokenProvider,
        private authenticator: Authenticator,
        private schoolYearService: SchoolYearService,
        private url: string,
    ) { }

    async getTimetable(start: Date, end: Date): Promise<TimetableResponse> {
        const token = await this.tokenProvider.getToken();
        const tenantId = this.tokenProvider.getTenantId();
        const session = this.authenticator.getSession();
        const cookies = this.authenticator.getCookies();
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

        const result = await fetch(
            `${this.url}/WebUntis/api/rest/view/v1/timetable/entries?${params}`,
            {
                headers: {
                    Cookie: cookies,
                    Authorization: `Bearer ${token}`,
                    "tenant-id": tenantId!,
                    "x-webuntis-api-school-year-id": schoolYearId,
                },
            }
        );

        if (!result.ok)
            throw new Error(`Timetable request failed with status ${result.status}`);

        return await result.json();
    }
}