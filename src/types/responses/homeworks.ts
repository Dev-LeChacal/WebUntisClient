interface HomeworkRecord {
    homeworkId: number;
    teacherId: number;
    elementIds: number[];
}

export interface RawHomework {
    id: number;
    lessonId: number;
    date: number;
    dueDate: number;
    text: string;
    remark: string;
    completed: boolean;
    attachments: unknown[];
}

interface Teacher {
    id: number;
    name: string;
}

export interface RawLesson {
    id: number;
    subject: string;
    lessonType: string;
}

export interface HomeworksData {
    records: HomeworkRecord[];
    homeworks: RawHomework[];
    teachers: Teacher[];
    lessons: RawLesson[];
}

export interface RawHomeworks {
    data: HomeworksData;
}
