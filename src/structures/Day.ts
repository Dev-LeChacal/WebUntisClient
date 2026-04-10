import { Course } from "./Course";

type DayStatus = "REGULAR" | string;

/**
 * Represents a full day in a timetable.
 */
export class Day {
  /**
   * @param courses - List of courses scheduled for this day.
   * @param status - The status of the day (e.g., REGULAR).
   * @param date - The specific date for this day.
   */
  constructor(
    public readonly courses: Course[],
    public readonly status: DayStatus,
    public readonly date: Date
  ) {
  }
}