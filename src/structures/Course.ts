export type CourseStatus = "REGULAR" | "CHANGED" | string;
export type CourseType = "NORMAL_TEACHING_PERIOD" | "EXAM" | string;

export type PositionStatus = "REGULAR" | "ADDED" | "NO_DATA" | string;
export type PositionType = "TEACHER" | "SUBJECT" | "ROOM" | string;

export class CoursePosition {
    constructor(
        readonly type: PositionType,
        readonly status: PositionStatus,
        readonly shortName: string,
        readonly longName: string,
        readonly displayName: string
    ) {
    }
}

export class Course {
    constructor(
        readonly id: number,
        readonly from: Date,
        readonly to: Date,
        readonly status: CourseStatus,
        readonly type: CourseType,
        readonly color: string,
        readonly teacher: CoursePosition | null = null,
        readonly subject: CoursePosition | null = null,
        readonly room: CoursePosition | null = null
    ) {
    }
}