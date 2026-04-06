import { Course } from "./Course";

export type DayStatus = "REGULAR" | string;

export class Day {
    constructor(
        public readonly courses: Course[],
        public readonly status: DayStatus,
        public readonly date: Date,
    ) {
    }
}