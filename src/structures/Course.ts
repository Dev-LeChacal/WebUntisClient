export type CourseStatus = "REGULAR" | "CHANGED" | string;
export type CourseType = "NORMAL_TEACHING_PERIOD" | "EXAM" | string;

export type PositionStatus = "REGULAR" | "ADDED" | "NO_DATA" | string;
export type PositionType = "TEACHER" | "SUBJECT" | "ROOM" | string;

export class CoursePosition {
    constructor(
        public readonly type: PositionType,
        public readonly status: PositionStatus,
        public readonly shortName: string,
        public readonly longName: string,
        public readonly displayName: string
    ) {
    }
}

export class Course {
    constructor(
        public readonly id: number,
        public readonly from: Date,
        public readonly to: Date,
        public readonly status: CourseStatus,
        public readonly type: CourseType,
        public readonly color: string,
        public readonly teacher: CoursePosition | null = null,
        public readonly subject: CoursePosition | null = null,
        public readonly room: CoursePosition | null = null
    ) {
    }
}