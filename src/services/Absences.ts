import { ApiClient } from '../clients/Api';
import { AbsencesStudentsData } from '../types/absences';
import { UtilsDate } from '../utils/date';

/**
 * Service for managing absences
 */
export class AbsencesService {
    constructor(
        private readonly _apiClient: ApiClient,
        private readonly _getStudentId: () => string
    ) {
    }

    /**
     * Get absences
     */
    async getAbsences(start: Date, end: Date): Promise<AbsencesStudentsData> {
        const params = this._buildAbsencesParams(start, end);
        const response = await this._apiClient.fetchAbsences(params);
        return response.data;
    }

    /**
     * Build query parameters for absences request
     */
    private _buildAbsencesParams(
        start: Date,
        end: Date
    ): URLSearchParams {
        const startDate = UtilsDate.toUntisDate(start, 'YYYYMMDD');
        const endDate = UtilsDate.toUntisDate(end, 'YYYYMMDD');
        const studentId = this._getStudentId();
        const excuseStatusId = '-1';

        return new URLSearchParams({
            startDate: startDate,
            endDate: endDate,
            studentId: studentId,
            excuseStatusId: excuseStatusId
        });
    }
}