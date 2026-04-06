import { AppDataManager } from "../managers/AppData";
import { RequestManager } from "../managers/RequestManager";
import { Absence, AbsenceTime, Excuse } from "../structures/Absence";
import { Session } from "../structures/Session";
import { DateRange } from "../types/date-range";
import { RawAbsences, RawAbsenceTime, RawExcuse } from "../types/responses/absences";
import { fromCompactDateTime, fromTimestamp, toCompact } from "../utils/date";

export class AbsencesModule {
    constructor(
        private readonly appData: AppDataManager,
        private readonly request: RequestManager,
        private readonly session: Session,
    ) {
    }

    public async get(range: DateRange): Promise<Absence[]> {
        const params = await this.buildParams(range);
        const headers = this.buildHeaders();

        const url = `${this.session.url}/WebUntis/api/classreg/absencetimes/student?${params}`;
        const raw = await this.request.get<RawAbsences>(url, headers);

        return this.convert(raw);
    }

    private async buildParams(range: DateRange): Promise<URLSearchParams> {
        const start = toCompact(range.start);
        const end = toCompact(range.end);
        const studentId = await this.appData.getStudentId();
        const excuseStatusId = "-1";

        return new URLSearchParams({
            startDate: start,
            endDate: end,
            studentId: studentId.toString(),
            excuseStatusId: excuseStatusId,
            excludeAbsences: "false",
            excludeLateness: "true",
        });
    }

    private buildHeaders(): Record<string, string> {
        const cookies = this.session.getCookies();

        return {
            Cookie: cookies
        }
    }

    private convert(raw: RawAbsences): Absence[] {
        const absences: Absence[] = [];

        for ( const a of raw.data.absences ) {
            const start = fromCompactDateTime(a.startDate, a.startTime);
            const end = fromCompactDateTime(a.endDate, a.endTime);
            const createdAt = fromTimestamp(a.createDate);
            const updatedAt = fromTimestamp(a.lastUpdate);

            const times = raw.data.absenceTimes.filter(t => t.absenceId === a.id).map(t => this.convertAbsenceTime(t));

            absences.push({
                id: a.id.toString(),
                start, end, createdAt, updatedAt,
                createdBy: a.createdUser,
                updatedBy: a.updatedUser,
                reasonId: a.reasonId.toString(),
                reason: a.reason,
                text: a.text,
                isExcused: a.isExcused,
                excuse: this.convertExcuse(a.excuse),
                times,
            });
        }

        return absences;
    }

    private convertAbsenceTime(raw: RawAbsenceTime): AbsenceTime {
        return new AbsenceTime(
            raw.subjectName,
            raw.teacherName,
            fromCompactDateTime(raw.date, raw.startTime),
            fromCompactDateTime(raw.date, raw.endTime),
            raw.counting,
            raw.excused,
        );
    }

    private convertExcuse(raw: RawExcuse): Excuse | null {
        const { id, text, excuseStatus, isExcused, userId, username } = raw;

        if ( id === -1 ) {
            return null;
        }

        return new Excuse(id.toString(), text, excuseStatus, isExcused, userId.toString(), username);
    }
}