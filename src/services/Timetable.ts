import { ApiClient } from "../clients/Api";
import { AuthenticationError } from "../errors/Authentication";
import { SessionInfo } from "../types/session/session";
import { Course, CoursePosition } from "../types/timetable/course";
import { TimetableDay } from "../types/timetable/day";
import { TimetableEntries } from "../types/timetable/timetable";
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
    async getOwnTimetable(start: Date, end: Date): Promise<TimetableDay[]> {
        const session = this._getSession();

        if (!session?.personId) {
            throw new AuthenticationError("No active session or person Id");
        }

        const entriesParams = this._buildTimetableEntriesParams(start, end, true, session.personId);

        const entries = await this._apiClient.fetchTimetableEntries<TimetableEntries>(entriesParams);
        const days = entries.days;

        const timetableDays: TimetableDay[] = [];

        for (const day of days) {
            const date = UtilsDate.fromUntisDate(day.date, "YYYY-MM-DD");
            const courses: Course[] = [];

            for (const entry of day.gridEntries) {
                const from = new Date(entry.duration.start);
                const to = new Date(entry.duration.end);

                const status = entry.status;
                const type = entry.type;
                const color = entry.color;

                let teacher: CoursePosition | null = null;
                let subject: CoursePosition | null = null;
                let room: CoursePosition | null = null;

                if (entry.position1) {
                    teacher = new CoursePosition(
                        entry.position1[0].current.type,
                        entry.position1[0].current.status,
                        entry.position1[0].current.shortName,
                        entry.position1[0].current.longName,
                        entry.position1[0].current.displayName
                    );
                }

                if (entry.position2) {
                    subject = new CoursePosition(
                        entry.position2[0].current.type,
                        entry.position2[0].current.status,
                        entry.position2[0].current.shortName,
                        entry.position2[0].current.longName,
                        entry.position2[0].current.displayName
                    );
                }

                if (entry.position3) {
                    room = new CoursePosition(
                        entry.position3[0].current.type,
                        entry.position3[0].current.status,
                        entry.position3[0].current.shortName,
                        entry.position3[0].current.longName,
                        entry.position3[0].current.displayName
                    );
                }

                const course = new Course(
                    from,
                    to,
                    status,
                    type,
                    color,
                    teacher,
                    subject,
                    room
                );

                courses.push(course);
            }

            const timetableDay = new TimetableDay(
                day.status,
                date,
                [],
                courses,
                []
            );

            timetableDays.push(timetableDay);
        }

        return timetableDays;
    }

    /**
     * Get class timetable for date range
     */
    async getClassTimetable(start: Date, end: Date): Promise<TimetableEntries> {
        const session = this._getSession();

        if (!session?.klasseId) {
            throw new AuthenticationError("No active session or klasse Id");
        }

        const entriesParams = this._buildTimetableEntriesParams(start, end, false, session.klasseId);

        const entries = await this._apiClient.fetchTimetableEntries<TimetableEntries>(entriesParams);

        return entries;
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
}