export class Homework {
    constructor(
        readonly id: string,
        readonly lessonId: string,
        readonly date: string,
        readonly dueDate: string,
        readonly text: string,
        readonly remark: string,
        readonly subject: string,
        readonly completed: boolean,
        readonly attachments: unknown[]
    ) {
    }
}
