/**
 * Represents an excuse for an absence.
 */
export class Excuse {
  /**
   * @param id - The unique identifier of the excuse.
   * @param text - The excuse text.
   * @param status - The status of the excuse.
   * @param isExcused - Whether the absence is officially excused.
   * @param userId - The ID of the user who submitted the excuse.
   * @param userName - The name of the user who submitted the excuse.
   */
  constructor(
    public id: string,
    public text: string,
    public status: string,
    public isExcused: boolean,
    public userId: string,
    public userName: string
  ) {
  }
}

/**
 * Represents a specific time period within an absence.
 */
export class AbsenceTime {
  /**
   * @param subject - The subject related to this absence time.
   * @param teacher - The teacher related to this absence time.
   * @param start - The start date and time of the absence.
   * @param end - The end date and time of the absence.
   * @param counting - Whether this period counts towards total absence time.
   * @param excused - Whether this period is excused.
   */
  constructor(
    public subject: string,
    public teacher: string,
    public start: Date,
    public end: Date,
    public counting: boolean,
    public excused: boolean
  ) {
  }
}

/**
 * Represents a student's absence.
 */
export class Absence {
  /**
   * @param id - The unique identifier of the absence.
   * @param start - The start date and time of the absence.
   * @param end - The end date and time of the absence.
   * @param createdAt - The timestamp when the absence was created.
   * @param updatedAt - The timestamp when the absence was last updated.
   * @param createdBy - The user who created the absence record.
   * @param updatedBy - The user who last updated the absence record.
   * @param reasonId - The ID of the absence reason.
   * @param reason - The descriptive reason for the absence.
   * @param text - Additional notes or text regarding the absence.
   * @param isExcused - Whether the absence is overall excused.
   * @param excuse - The formal excuse object, if any.
   * @param times - Array of specific time periods for this absence.
   */
  constructor(
    public id: string,
    public start: Date,
    public end: Date,
    public createdAt: Date,
    public updatedAt: Date,
    public createdBy: string,
    public updatedBy: string,
    public reasonId: string,
    public reason: string,
    public text: string,
    public isExcused: boolean,
    public excuse: Excuse | null,
    public times: AbsenceTime[]
  ) {
  }
}