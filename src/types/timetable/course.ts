import { TimetableStatus } from "./status";

export type CourseType = "NORMAL_TEACHING_PERIOD" | "EXAM" | string;
export type PositionType = "TEACHER" | "SUBJECT" | "ROOM" | string;

export class CoursePosition {
    constructor(
        readonly type: PositionType,
        readonly status: TimetableStatus,
        readonly shortName: string,
        readonly longName: string,
        readonly displayName: string
    ) {
    }
}

export class Course {
    constructor(
        readonly from: Date,
        readonly to: Date,
        readonly status: TimetableStatus,
        readonly type: CourseType,
        readonly color: string,
        readonly teacher: CoursePosition | null = null,
        readonly subject: CoursePosition | null = null,
        readonly room: CoursePosition | null = null
    ) {
    }
}