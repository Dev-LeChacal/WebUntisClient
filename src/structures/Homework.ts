export class Homework {
    constructor(
        public readonly id: string,
        public readonly lessonId: string,
        public readonly date: Date,
        public readonly dueDate: Date,
        public readonly text: string,
        public readonly remark: string,
        public readonly subject: string,
        public readonly completed: boolean,
    ) {
    }
}
