interface Excuse {
    id: number;
    text: string;
    excuseDate: number;
    excuseStatus: string;
    isExcused: boolean;
    userId: number;
    username: string;
}

interface Absence {
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
    excuse: Excuse;
}

export interface AbsencesData {
    absences: Absence[];
    absenceReasons: unknown[];
    excuseStatuses: unknown | null;
    showAbsenceReasonChange: boolean;
    showCreateAbsence: boolean;
}

export interface AbsencesResponse {
    data: AbsencesData;
}
