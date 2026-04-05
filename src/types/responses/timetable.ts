interface Duration {
    start: string;
    end: string;
}

interface Resource {
    id: number;
    shortName: string;
    longName: string;
    displayName: string;
}

interface PositionData {
    type: string;
    status: string;
    shortName: string;
    longName: string;
    displayName: string;
    displayNameLabel: string;
}

interface Text {
    type: string;
    text: string;
}

export interface RawPosition {
    current: PositionData;
    removed: unknown | null;
}

export interface RawGridEntry {
    ids: number[];
    duration: Duration;
    type: string;
    status: string;
    statusDetail: string | null;
    name: string | null;
    layoutStartPosition: number;
    layoutWidth: number;
    layoutGroup: number;
    color: string;
    notesAll: string;
    icons: string[];
    position1: RawPosition[];
    position2: RawPosition[];
    position3: RawPosition[];
    position4: RawPosition[] | null;
    position5: RawPosition[] | null;
    position6: RawPosition[];
    position7: RawPosition[];
    texts: Text[];
    lessonText: string;
    lessonInfo: string | null;
    substitutionText: string;
    userName: string | null;
    moved: unknown | null;
    durationTotal: unknown | null;
    link: unknown | null;
}

export interface RawDay {
    date: string;
    resourceType: string;
    resource: Resource;
    status: string;
    dayEntries: [];
    gridEntries: RawGridEntry[];
    backEntries: [];
}

export interface RawTimetable {
    format: number;
    days: RawDay[];
    errors: unknown[];
}