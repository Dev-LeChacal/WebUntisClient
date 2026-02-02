import { Authenticator } from "../auth/Authenticator";
import { Profile, ProfileResponse } from "../types/profile";
import { SessionInfo } from "../types/session";
import { TimetableResponse } from "../types/timetable";
import { SchoolYear } from "../types/year";

export class Fetcher {
    constructor(
        private authenticator: Authenticator,
        private url: string,
    ) { }

    async newToken(): Promise<string> {
        const cookies = this.authenticator.getCookies();

        const response = await fetch(
            `${this.url}/WebUntis/api/token/new`,
            { headers: { Cookie: cookies } }
        );

        if (!response.ok)
            throw new Error(`Token failed: ${response.status}`);

        return await response.text();
    }

    async schoolYears(token: string, tenantId: string): Promise<SchoolYear[]> {
        const cookies = this.authenticator.getCookies();

        const response = await fetch(
            `${this.url}/WebUntis/api/rest/view/v1/schoolyears`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "tenant-id": tenantId,
                    Cookie: cookies
                }
            }
        );

        if (!response.ok)
            throw new Error(`School year request failed with status ${response.status}`);

        return await response.json();
    }

    async timetable(token: string, tenantId: string, schoolYearId: string, params: URLSearchParams): Promise<TimetableResponse> {
        const cookies = this.authenticator.getCookies();

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

    async profile(): Promise<Profile> {
        const cookies = this.authenticator.getCookies();

        const response = await fetch(
            `${this.url}/WebUntis/api/profile/general`,
            {
                headers: { Cookie: cookies }
            }
        );

        if (!response.ok)
            throw new Error(`Profile data request failed with status ${response.status}`);

        const profileResponse: ProfileResponse = await response.json();

        return await profileResponse.data.profile;
    }
}