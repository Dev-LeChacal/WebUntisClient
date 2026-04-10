import { RequestManager } from "../managers/Request";
import { Homework } from "../structures";
import { Session } from "../structures/Session";
import { DateRange } from "../types/date-range";
import { RawHomeworks } from "../types/responses/homeworks";
import { fromCompact, toCompact } from "../utils/date";

/**
 * Provides access to homework assignments
 */
export class HomeworksModule {
  constructor(
    private readonly request: RequestManager,
    private readonly session: Session,
  ) {
  }

  /**
   * Get homeworks for a given range
   * @param range
   */
  public async get(range: DateRange): Promise<Homework[]> {
    const params = this.buildParams(range);
    const headers = this.buildHeaders();

    const url = `${this.session.url}/WebUntis/api/homeworks/lessons?${params}`;
    const raw = await this.request.get<RawHomeworks>(url, headers);

    return this.convert(raw);
  }

  private buildParams(range: DateRange): URLSearchParams {
    const start = toCompact(range.start);
    const end = toCompact(range.end);

    return new URLSearchParams({
      startDate: start,
      endDate: end
    });
  }

  private buildHeaders(): Record<string, string> {
    const cookies = this.session.getCookies();

    return {
      Cookie: cookies,
    }
  }

  private convert(raw: RawHomeworks): Homework[] {
    const result: Homework[] = [];

    const homeworks = raw.data.homeworks;
    const lessons = raw.data.lessons;

    for ( const homework of homeworks ) {
      const lesson = lessons.find(l => l.id === homework.lessonId);

      if ( lesson === undefined ) {
        throw new Error("Lesson not found");
      }

      const date = fromCompact(homework.date.toString());
      const dueDate = fromCompact(homework.dueDate.toString());

      result.push({
        id: homework.id.toString(),
        lessonId: homework.lessonId.toString(),
        date: date,
        dueDate: dueDate,
        text: homework.text,
        remark: homework.remark,
        subject: lesson.subject,
        completed: homework.completed,
      });
    }

    return result;
  }
}