type CourseStatus = "REGULAR" | "CHANGED" | string;
type CourseType = "NORMAL_TEACHING_PERIOD" | "EXAM" | string;

type PositionStatus = "REGULAR" | "ADDED" | "NO_DATA" | string;
type PositionType = "TEACHER" | "SUBJECT" | "ROOM" | string;

/**
 * Represents a specific position or role in a course (e.g., teacher, room).
 */
export class CoursePosition {
  /**
   * @param type - The type of position (e.g., TEACHER, ROOM).
   * @param status - The status of the position (e.g., REGULAR, ADDED).
   * @param shortName - The short code or abbreviation.
   * @param longName - The full descriptive name.
   * @param displayName - The name as it should be displayed.
   */
  constructor(
    public readonly type: PositionType,
    public readonly status: PositionStatus,
    public readonly shortName: string,
    public readonly longName: string,
    public readonly displayName: string
  ) {
  }
}

/**
 * Represents a single course or lesson in a schedule.
 */
export class Course {
  /**
   * @param id - The unique identifier of the course.
   * @param from - The start date and time of the course.
   * @param to - The end date and time of the course.
   * @param status - The status of the course (e.g., REGULAR, CHANGED).
   * @param type - The type of teaching period (e.g., NORMAL_TEACHING_PERIOD, EXAM).
   * @param color - The background color associated with the course (HEX).
   * @param teacher - The teacher assigned to this course.
   * @param subject - The subject of this course.
   * @param room - The room where this course takes place.
   */
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