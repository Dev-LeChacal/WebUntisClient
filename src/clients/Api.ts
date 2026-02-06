import { AbsencesStudentsResponse } from "../types/absences/absences";
import { AppData } from "../types/app-data/app-data";
import { HomeworksLessonsResponse } from "../types/homeworks/homeworks";
import { ProfileResponse } from "../types/profile/profile";
import { HttpClient } from "./Http";

/**
 * Client for WebUntis REST API endpoints
 */
export class ApiClient {
    constructor(
        private readonly _httpClient: HttpClient,
        private readonly _getCookies: () => string,
        private readonly _getToken: () => Promise<string>,
        private readonly _getTenantId: () => string | null,
        private readonly _getSchoolYearId: () => string
    ) {
    }

    /**
     * Fetch app data
     */
    async fetchAppData(): Promise<AppData> {
        const token = await this._getToken();
        const tenantId = this._getTenantId();
        const cookies = this._getCookies();

        if (!tenantId) {
            throw new Error("Tenant ID not available");
        }

        return this._httpClient.get<AppData>(
            "/WebUntis/api/rest/view/v1/app/data",
            {
                Authorization: `Bearer ${token}`,
                "tenant-id": tenantId,
                Cookie: cookies
            }
        );
    }

    /**
     * Fetch user profile data
     */
    async fetchProfile(): Promise<ProfileResponse> {
        const cookies = this._getCookies();

        return this._httpClient.get<ProfileResponse>(
            "/WebUntis/api/profile/general",
            { Cookie: cookies }
        );
    }

    /**
     * Fetch timetable entries
     */
    async fetchTimetableEntries<T>(params: URLSearchParams): Promise<T> {
        const token = await this._getToken();
        const tenantId = this._getTenantId();
        const cookies = this._getCookies();
        const schoolYearId = this._getSchoolYearId();

        if (!tenantId) {
            throw new Error("Tenant ID not available");
        }

        return await this._httpClient.get<T>(
            `/WebUntis/api/rest/view/v1/timetable/entries?${params}`,
            {
                Authorization: `Bearer ${token}`,
                "tenant-id": tenantId,
                "x-webuntis-api-school-year-id": schoolYearId,
                Cookie: cookies
            }
        );
    }

    /**
     * Fetch homeworks and lessons
     */
    async fetchHomeworksLessons(params: URLSearchParams): Promise<HomeworksLessonsResponse> {
        const cookies = this._getCookies();

        return await this._httpClient.get<HomeworksLessonsResponse>(
            `/WebUntis/api/homeworks/lessons?${params}`,
            { Cookie: cookies }
        );
    }

    /**
     * Fetch absences
     */
    async fetchAbsences(params: URLSearchParams): Promise<AbsencesStudentsResponse> {
        const cookies = this._getCookies();

        return await this._httpClient.get<AbsencesStudentsResponse>(
            `/WebUntis/api/classreg/absences/students?${params}`,
            { Cookie: cookies }
        );
    }
}