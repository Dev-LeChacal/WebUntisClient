import { TimetableStatus } from "./status";

export type CourseType = "NORMAL_TEACHING_PERIOD" | string;
export type PositionType = "TEACHER" | "SUBJECT" | "ROOM" | string;

export class CoursePosition {
    readonly type: PositionType;
    readonly status: TimetableStatus;

    readonly shortName: string;
    readonly longName: string;
    readonly displayName: string;

    constructor(
        type: PositionType,
        status: TimetableStatus,
        shortName: string,
        longName: string,
        displayName: string
    ) {
        this.type = type;
        this.status = status;

        this.shortName = shortName;
        this.longName = longName;
        this.displayName = displayName;
    }
}

export class Course {
    readonly from: Date;
    readonly to: Date;

    readonly status: TimetableStatus;
    readonly type: CourseType;
    readonly color: string;

    readonly teacher: CoursePosition;
    readonly subject: CoursePosition;
    readonly room: CoursePosition;

    constructor(
        from: Date,
        to: Date,
        status: TimetableStatus,
        type: CourseType,
        color: string,
        teacher: CoursePosition,
        subject: CoursePosition,
        room: CoursePosition
    ) {
        this.from = from;
        this.to = to;

        this.status = status;
        this.type = type;
        this.color = color;

        this.teacher = teacher;
        this.subject = subject;
        this.room = room;
    }
}