import { Course } from "./course";

export type DayStatus = "REGULAR" | string;

export class TimetableDay {
    constructor(
        readonly status: DayStatus,
        readonly date: Date,
        readonly dayEntries: unknown[],
        readonly gridEntries: Course[],
        readonly backEntries: unknown[]
    ) {
    }
}