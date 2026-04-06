import { AppDataManager } from "../managers/AppData";
import { RequestManager } from "../managers/RequestManager";
import { TokenManager } from "../managers/TokenManager";
import { Course, CoursePosition } from "../structures/Course";
import { Day } from "../structures/Day";
import { Session } from "../structures/Session";
import { DateRange } from "../types/date-range";
import { RawDay, RawGridEntry, RawPosition, RawTimetable } from "../types/responses/timetable";
import { fromISO, toISO } from "../utils/date";

export class TimetableModule {
    constructor(
        private readonly appData: AppDataManager,
        private readonly request: RequestManager,
        private readonly token: TokenManager,
        private readonly session: Session,
    ) {
    }

    async getOwn(range: DateRange): Promise<Day[]> {
        return this.fetch(range, true, this.session.getPersonId());
    }

    async getClass(range: DateRange): Promise<Day[]> {
        return this.fetch(range, false, this.session.getClassId());
    }

    private async fetch(range: DateRange, isStudent: boolean, id: number): Promise<Day[]> {
        const params = this.buildParams(range, isStudent, id);
        const headers = await this.buildHeaders();

        const url = `${this.session.url}/WebUntis/api/rest/view/v1/timetable/entries?${params}`;
        const raw = await this.request.get<RawTimetable>(url, headers);

        return this.convert(raw);
    }

    private buildParams(range: DateRange, isStudent: boolean, id: number): URLSearchParams {
        const start = toISO(range.start);
        const end = toISO(range.end);

        const timetableType = isStudent ? "MY_TIMETABLE" : "STANDARD";
        const resourceType = isStudent ? "STUDENT" : "CLASS";

        return new URLSearchParams({
            start: start,
            end: end,
            format: "4",
            timetableType: timetableType,
            resourceType: resourceType,
            resources: id.toString(),
            layout: "START_TIME",
            periodTypes: "",
        });
    }

    private async buildHeaders(): Promise<Record<string, string>> {
        const schoolYearId = await this.appData.getSchoolYearId();
        const token = `Bearer ${await this.token.getToken()}`;
        const tenantId = this.token.getTenantId();
        const cookies = this.session.getCookies();

        return {
            Authorization: token,
            "tenant-id": tenantId,
            "x-webuntis-api-school-year-id": schoolYearId.toString(),
            Cookie: cookies
        };
    }

    private convert(raw: RawTimetable): Day[] {
        return raw.days.map(day => this.convertDay(day));
    }

    private convertDay(rawDay: RawDay): Day {
        const courses = rawDay.gridEntries.map(entry => this.convertCourse(entry));
        const date = fromISO(rawDay.date);

        return new Day(courses, rawDay.status, date);
    }

    private convertCourse(entry: RawGridEntry): Course {
        return new Course(
            entry.ids[0],

            new Date(entry.duration.start),
            new Date(entry.duration.end),

            entry.status,
            entry.type,
            entry.color,

            this.convertPosition(entry.position1),
            this.convertPosition(entry.position2),
            this.convertPosition(entry.position3)
        );
    }

    private convertPosition(positions: RawPosition[] | null): CoursePosition | null {
        if ( !positions ) {
            return null;
        }

        const { type, status, shortName, longName, displayName } = positions[0].current;
        return new CoursePosition(type, status, shortName, longName, displayName);
    }
}