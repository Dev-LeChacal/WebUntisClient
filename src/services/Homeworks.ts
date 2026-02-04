import { ApiClient } from '../clients/Api';
import { HomeworksLessonsData } from '../types/homework';
import { UtilsDate } from '../utils/date';

/**
 * Service for managing homeworks
 */
export class HomeworksService {
    constructor(private readonly _apiClient: ApiClient) { }

    /**
     * Get homeworks and lessons
     */
    async getHomeworksLessons(start: Date, end: Date): Promise<HomeworksLessonsData> {
        const params = this._buildHomeworksLessonsParams(start, end);
        const response = await this._apiClient.fetchHomeworksLessons(params);
        return response.data;
    }

    /**
     * Build query parameters for homeworks and lessons request
     */
    private _buildHomeworksLessonsParams(
        start: Date,
        end: Date,
    ): URLSearchParams {
        const startDate = UtilsDate.formatDate(start, "YYYYMMDD");
        const endDate = UtilsDate.formatDate(end, "YYYYMMDD");

        return new URLSearchParams({
            startDate: startDate,
            endDate: endDate,
        });
    }
}