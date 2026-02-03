export interface TimetableResponse {
    format: number;
    days: Day[];
    errors: unknown[];
}

export interface Day {
    date: string;
    resourceType: string;
    resource: Resource;
    status: string;
    dayEntries: unknown[];
    gridEntries: GridEntry[];
    backEntries: BackEntry[];
}

export interface Resource {
    id: number;
    shortName: string;
    longName: string;
    displayName: string;
}

export interface GridEntry {
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
    position1: Position[];
    position2: Position[];
    position3: Position[];
    position4: Position[] | null;
    position5: Position[] | null;
    position6: Position[];
    position7: Position[];
    texts: Text[];
    lessonText: string;
    lessonInfo: string | null;
    substitutionText: string;
    userName: string | null;
    moved: unknown | null;
    durationTotal: unknown | null;
    link: unknown | null;
}

export interface BackEntry {
    id: number;
    type: string;
    status: string;
    statusDetail: string;
    duration: Duration;
    isFullDay: boolean;
    durationTotal: Duration;
    layoutStartPosition: number;
    layoutWidth: number;
    color: string;
    resource: unknown | null;
    shortName: string;
    longName: string;
    notesAll: unknown | null;
}

export interface Duration {
    start: string;
    end: string;
}

export interface Position {
    current: PositionData;
    removed: unknown | null;
}

export interface PositionData {
    type: string;
    status: string;
    shortName: string;
    longName: string;
    displayName: string;
    displayNameLabel: string;
}

export interface Text {
    type: string;
    text: string;
}