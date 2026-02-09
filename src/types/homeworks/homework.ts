export class Homework {
    constructor(
        readonly id: string,
        readonly lessonId: string,
        readonly date: Date,
        readonly dueDate: Date,
        readonly text: string,
        readonly remark: string,
        readonly subject: string,
        readonly completed: boolean,
        readonly attachments: unknown[]
    ) {
    }
}
