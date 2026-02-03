import { AppData } from '../types/app-data';
import { ProfileResponse } from '../types/profile';
import { TimetableResponse } from '../types/timetable';
import { HttpClient } from './Http';

/**
 * Client for WebUntis REST API endpoints
 */
export class ApiClient {
    constructor(
        private readonly _httpClient: HttpClient,
        private readonly _getCookies: () => string,
        private readonly _getToken: () => Promise<string>,
        private readonly _getTenantId: () => string | null,
        private readonly _getSchoolYearId: () => string,
    ) { }

    /**
     * Fetch app data
     */
    async fetchAppData(): Promise<AppData> {
        const token = await this._getToken();
        const tenantId = this._getTenantId();
        const cookies = this._getCookies();

        if (!tenantId) {
            throw new Error('Tenant ID not available');
        }

        return this._httpClient.get<AppData>(
            '/WebUntis/api/rest/view/v1/app/data',
            {
                Authorization: `Bearer ${token}`,
                'tenant-id': tenantId,
                Cookie: cookies,
            }
        );
    }

    /**
     * Fetch user profile data
     */
    async fetchProfile(): Promise<ProfileResponse> {
        const cookies = this._getCookies();

        return this._httpClient.get<ProfileResponse>(
            '/WebUntis/api/profile/general',
            { Cookie: cookies }
        );
    }

    /**
     * Fetch timetable entries
     */
    async fetchTimetable(
        params: URLSearchParams,
    ): Promise<TimetableResponse> {
        const token = await this._getToken();
        const tenantId = this._getTenantId();
        const cookies = this._getCookies();
        const schoolYearId = this._getSchoolYearId();

        if (!tenantId) {
            throw new Error('Tenant ID not available');
        }

        return await this._httpClient.get<TimetableResponse>(
            `/WebUntis/api/rest/view/v1/timetable/entries?${params}`,
            {
                Authorization: `Bearer ${token}`,
                'tenant-id': tenantId,
                'x-webuntis-api-school-year-id': schoolYearId,
                Cookie: cookies,
            }
        );
    }
}