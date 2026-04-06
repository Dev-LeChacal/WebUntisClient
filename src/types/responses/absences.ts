export interface RawExcuse {
    id: number;
    text: string;
    excuseDate: number;
    excuseStatus: string;
    isExcused: boolean;
    userId: number;
    username: string;
}

export interface RawAbsence {
    id: number;
    startDate: number;
    endDate: number;
    startTime: number;
    endTime: number;
    createDate: number;
    lastUpdate: number;
    createdUser: string;
    updatedUser: string;
    reasonId: number;
    reason: string;
    text: string;
    interruptions: unknown[];
    canEdit: boolean;
    studentName: string;
    excuseStatus: string | null;
    isExcused: boolean;
    excuse: RawExcuse;
}

export interface RawAbsenceTime {
    absenceId: number;
    klasseId: number;
    klasseName: string;
    subjectId: number;
    subjectName: string;
    teacherId: number;
    teacherName: string;
    absenceReasonId: number;
    absenceReasonName: string | null;
    excuseStatusId: number;
    excuseStatusName: string;
    excused: boolean;
    date: number;
    startTime: number;
    endTime: number;
    missedDays: number;
    missedHours: number;
    missedMins: number;
    counting: boolean;
    text: string;
}

export interface RawAbsencesData {
    absences: RawAbsence[];
    absenceTimes: RawAbsenceTime[];
    absenceReasons: unknown[];
    excuseStatuses: unknown | null;
    showAbsenceReasonChange: boolean;
    showCreateAbsence: boolean;
}

export interface RawAbsences {
    data: RawAbsencesData;
}
