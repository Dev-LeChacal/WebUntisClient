import { Course } from "./course";
import { TimetableStatus } from "./status";

export class TimetableDay {
    readonly status: TimetableStatus;
    readonly date: Date;

    readonly dayEntries: unknown[];
    readonly gridEntries: Course[];
    readonly backEntries: unknown[];

    constructor(
        status: TimetableStatus,
        date: Date,
        dayEntries: unknown[],
        gridEntries: Course[],
        backEntries: unknown[]
    ) {
        this.status = status;
        this.date = date;
        this.dayEntries = dayEntries;
        this.gridEntries = gridEntries;
        this.backEntries = backEntries;
    }
}