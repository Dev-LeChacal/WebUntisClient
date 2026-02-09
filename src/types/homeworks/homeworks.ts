interface HomeworkRecord {
    homeworkId: number;
    teacherId: number;
    elementIds: number[];
}

interface Homework {
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

interface Lesson {
    id: number;
    subject: string;
    lessonType: string;
}

export interface HomeworksData {
    records: HomeworkRecord[];
    homeworks: Homework[];
    teachers: Teacher[];
    lessons: Lesson[];
}

export interface HomeworksResponse {
    data: HomeworksData;
}
