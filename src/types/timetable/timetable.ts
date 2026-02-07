export interface Duration {
    start: string;
    end: string;
}

export interface Resource {
    id: number;
    shortName: string;
    longName: string;
    displayName: string;
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

export interface OwnPosition {
    current: PositionData;
    removed: unknown | null;
}

export interface OwnGridEntry {
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
    position1: OwnPosition[];
    position2: OwnPosition[];
    position3: OwnPosition[];
    position4: OwnPosition[] | null;
    position5: OwnPosition[] | null;
    position6: OwnPosition[];
    position7: OwnPosition[];
    texts: Text[];
    lessonText: string;
    lessonInfo: string | null;
    substitutionText: string;
    userName: string | null;
    moved: unknown | null;
    durationTotal: unknown | null;
    link: unknown | null;
}

export interface OwnDay {
    date: string;
    resourceType: string;
    resource: Resource;
    status: string;
    dayEntries: [];
    gridEntries: OwnGridEntry[];
    backEntries: [];
}

export interface OwnTimetableEntries {
    format: number;
    days: OwnDay[];
    errors: unknown[];
}