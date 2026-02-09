import { ApiClient } from "../clients/Api";
import { Homework } from "../types/homeworks/homework";
import { HomeworksData } from "../types/homeworks/homeworks";
import { UtilsDate } from "../utils/date";

/**
 * Service for managing homeworks
 */
export class HomeworksService {
    constructor(private readonly _apiClient: ApiClient) {
    }

    /**
     * Get homeworks
     */
    async getHomeworks(start: Date, end: Date): Promise<Homework[]> {
        const params = this._buildHomeworksParams(start, end);
        const response = await this._apiClient.fetchHomeworks(params);
        return this._convertToListOfHomework(response.data);
    }

    /**
     * Build query parameters for homeworks request
     */
    private _buildHomeworksParams(
        start: Date,
        end: Date
    ): URLSearchParams {
        const startDate = UtilsDate.toUntisDate(start, "YYYYMMDD");
        const endDate = UtilsDate.toUntisDate(end, "YYYYMMDD");

        return new URLSearchParams({
            startDate: startDate,
            endDate: endDate
        });
    }

    /**
     * Convert to a list of homework
     */
    private _convertToListOfHomework(data: HomeworksData): Homework[] {
        const result: Homework[] = [];

        const homeworks = data.homeworks;
        const lessons = data.lessons;

        for (const homework of homeworks) {
            const lesson = lessons.find(l => l.id === homework.lessonId);

            const date = UtilsDate.fromUntisDate(homework.date.toString(), "YYYYMMDD");
            const dueDate = UtilsDate.fromUntisDate(homework.dueDate.toString(), "YYYYMMDD");

            result.push({
                id: homework.id.toString(),
                lessonId: homework.lessonId.toString(),
                date: date,
                dueDate: dueDate,
                text: homework.text,
                remark: homework.remark,
                subject: lesson?.subject || "Unknown",
                completed: homework.completed,
                attachments: homework.attachments
            });
        }

        return result;
    }
}