import { ApiClient } from "../clients/Api";
import { AuthenticationError } from "../errors/Authentication";
import { AuthenticationManager } from "../managers/Authentication";
import { TimetableResponse } from "../types/timetable";

/**
 * Service for fetching timetable data
 */
export class TimetableService {
    constructor(
        private readonly _apiClient: ApiClient,
        private readonly _authManager: AuthenticationManager,
    ) { }

    /**
     * Get timetable for date range
     */
    async getOwnTimetable(start: Date, end: Date): Promise<TimetableResponse> {
        const session = this._authManager.getSession();

        if (!session?.personId) {
            throw new AuthenticationError('No active session or person ID');
        }

        const params = this._buildTimetableParams(start, end, session.personId);

        return await this._apiClient.fetchOwnTimetable(params);
    }

    /**
     * Build query parameters for timetable request
     */
    private _buildTimetableParams(
        start: Date,
        end: Date,
        personId: number
    ): URLSearchParams {
        const startDate = this._formatDate(start);
        const endDate = this._formatDate(end);

        return new URLSearchParams({
            start: startDate,
            end: endDate,
            format: '4',
            resourceType: 'STUDENT',
            resources: personId.toString(),
            periodTypes: '',
            timetableType: 'MY_TIMETABLE',
            layout: 'START_TIME',
        });
    }

    /**
     * Format date to YYYY-MM-DD
     */
    private _formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }
}