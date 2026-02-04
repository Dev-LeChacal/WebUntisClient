import { ApiClient } from '../clients/Api';
import { AuthenticationError } from '../errors/Authentication';
import { SessionInfo } from '../types/session';
import { ClassTimetableResponse, OwnTimetableResponse } from '../types/timetable';
import { UtilsDate } from '../utils/date';

/**
 * Service for fetching timetable data
 */
export class TimetableService {
    constructor(
        private readonly _apiClient: ApiClient,
        private readonly _getSession: () => SessionInfo | null
    ) {
    }

    /**
     * Get own timetable for date range
     */
    async getOwnTimetable(start: Date, end: Date): Promise<OwnTimetableResponse> {
        const session = this._getSession();

        if (!session?.personId) {
            throw new AuthenticationError('No active session or person ID');
        }

        const params = this._buildTimetableParams(start, end, 'STUDENT', session.personId);

        return await this._apiClient.fetchTimetable<OwnTimetableResponse>(params);
    }

    /**
     * Get timetable for date range
     */
    async getClassTimetable(start: Date, end: Date): Promise<ClassTimetableResponse> {
        const session = this._getSession();

        if (!session?.klasseId) {
            throw new AuthenticationError('No active session or person ID');
        }

        const params = this._buildTimetableParams(start, end, 'CLASS', session.klasseId);

        return await this._apiClient.fetchTimetable<ClassTimetableResponse>(params);
    }

    /**
     * Build query parameters for timetable request
     */
    private _buildTimetableParams(
        start: Date,
        end: Date,
        resourceType: 'STUDENT' | 'CLASS',
        personId: number
    ): URLSearchParams {
        const startDate = UtilsDate.toUntisDate(start);
        const endDate = UtilsDate.toUntisDate(end);
        const timetableType = resourceType === 'STUDENT' ? 'MY_TIMETABLE' : 'STANDARD';

        return new URLSearchParams({
            start: startDate,
            end: endDate,
            format: '4',
            resourceType: resourceType,
            resources: personId.toString(),
            periodTypes: '',
            timetableType: timetableType,
            layout: 'START_TIME'
        });
    }
}