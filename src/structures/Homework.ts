/**
 * Represents a homework assignment.
 */
export class Homework {
  /**
   * @param id - Unique identifier for the homework.
   * @param lessonId - Identifier of the lesson this homework belongs to.
   * @param date - The date the homework was assigned.
   * @param dueDate - The deadline for the homework.
   * @param text - Description of the homework.
   * @param remark - Additional notes or remarks.
   * @param subject - The subject of the homework.
   * @param completed - Whether the homework has been marked as completed.
   */
  constructor(
    public readonly id: string,
    public readonly lessonId: string,
    public readonly date: Date,
    public readonly dueDate: Date,
    public readonly text: string,
    public readonly remark: string,
    public readonly subject: string,
    public readonly completed: boolean
  ) {
  }
}
