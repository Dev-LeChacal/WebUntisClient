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

interface Position {
    current: PositionData;
    removed: unknown | null;
}

interface GridEntry {
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

interface Day {
    date: string;
    resourceType: string;
    resource: Resource;
    status: string;
    dayEntries: [];
    gridEntries: GridEntry[];
    backEntries: [];
}

export interface TimetableEntries {
    format: number;
    days: Day[];
    errors: unknown[];
}