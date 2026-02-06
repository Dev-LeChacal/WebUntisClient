import { ApiClient } from "../clients/Api";
import { AuthenticationError } from "../errors/Authentication";
import { SessionInfo } from "../types/session/session";
import { ClassTimetableEntries, OwnTimetableEntries, OwnTimetableGrid } from "../types/timetable/timetable";
import { UtilsDate } from "../utils/date";

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
    async getOwnTimetable(start: Date, end: Date): Promise<OwnTimetableEntries> {
        const session = this._getSession();

        if (!session?.personId) {
            throw new AuthenticationError("No active session or person Id");
        }

        const entriesParams = this._buildTimetableEntriesParams(start, end, true, session.personId);
        const gridParams = this._buildTimetableGridParams(true);

        const entries = await this._apiClient.fetchTimetableEntries<OwnTimetableEntries>(entriesParams);
        const grid = await this._apiClient.fetchTimetableGrid<OwnTimetableGrid>(gridParams);

        const timeGridSlots = grid.formatDefinitions[0].timeGridSlots;
        const firstDayOfWeek = entries.days[0];

        console.log(firstDayOfWeek);

        return entries;
    }

    /**
     * Get class timetable for date range
     */
    async getClassTimetable(start: Date, end: Date): Promise<ClassTimetableEntries> {
        const session = this._getSession();

        if (!session?.klasseId) {
            throw new AuthenticationError("No active session or klasse Id");
        }

        const entriesParams = this._buildTimetableEntriesParams(start, end, false, session.klasseId);
        const gridParams = this._buildTimetableGridParams(false);

        const response = await this._apiClient.fetchTimetableEntries<ClassTimetableEntries>(entriesParams);

        return response;
    }

    /**
     * Build query parameters for timetable entries request
     */
    private _buildTimetableEntriesParams(
        start: Date,
        end: Date,
        isStudent: boolean,
        id: number
    ): URLSearchParams {
        const startDate = UtilsDate.toUntisDate(start);
        const endDate = UtilsDate.toUntisDate(end);

        const timetableType = isStudent ? "MY_TIMETABLE" : "STANDARD";
        const resourceType = isStudent ? "STUDENT" : "CLASS";

        return new URLSearchParams({
            start: startDate,
            end: endDate,
            format: "4",
            resourceType: resourceType,
            resources: id.toString(),
            periodTypes: "",
            timetableType: timetableType,
            layout: "START_TIME"
        });
    }

    /**
     * Build query parameters for timetable grid request
     */
    private _buildTimetableGridParams(isStudent: boolean): URLSearchParams {
        const timetableType = isStudent ? "MY_TIMETABLE" : "STANDARD";

        return new URLSearchParams({
            timetableType: timetableType
        });
    }
}