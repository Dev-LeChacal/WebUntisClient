export class Excuse {
    constructor(
        public id: string,
        public text: string,
        public status: string,
        public isExcused: boolean,
        public userId: string,
        public userName: string,
    ) {
    }
}

export class AbsenceTime {
    constructor(
        public subject: string,
        public teacher: string,
        public start: Date,
        public end: Date,
        public counting: boolean,
        public excused: boolean,
    ) {
    }
}

export class Absence {
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
        public times: AbsenceTime[],
    ) {
    }
}