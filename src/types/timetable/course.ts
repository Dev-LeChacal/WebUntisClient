export type Status = "REGULAR" | string;

export type CourseType = "NORMAL_TEACHING_PERIOD" | string;
export type PositionType = "TEACHER" | "SUBJECT" | "ROOM" | string;

export interface CoursePosition {
    type: PositionType;
    status: Status;

    shortName: string;
    longName: string;
    displayName: string;
}

export interface Course {
    from: Date;
    to: Date;

    status: Status;
    type: CourseType;
    color: string;

    teacher: CoursePosition;
    subject: CoursePosition;
    room: CoursePosition;
}