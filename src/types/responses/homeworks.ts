interface RawHomeworkRecord {
    homeworkId: number;
    teacherId: number;
    elementIds: number[];
}

interface RawTeacher {
    id: number;
    name: string;
}

interface RawHomework {
    id: number;
    lessonId: number;
    date: number;
    dueDate: number;
    text: string;
    remark: string;
    completed: boolean;
    attachments: unknown[];
}

interface RawLesson {
    id: number;
    subject: string;
    lessonType: string;
}

interface RawHomeworksData {
    records: RawHomeworkRecord[];
    homeworks: RawHomework[];
    teachers: RawTeacher[];
    lessons: RawLesson[];
}

export interface RawHomeworks {
    data: RawHomeworksData;
}
