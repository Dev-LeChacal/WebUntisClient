import { Course } from "./Course";

export type DayStatus = "REGULAR" | string;

export class Day {
    constructor(
        readonly courses: Course[],
        readonly status: DayStatus,
        readonly date: Date,
    ) {
    }
}