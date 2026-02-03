export interface TimeUnit {
    endTime: number;
    startTime: number;
    unitOfDay: number;
}

export interface TimeGrid {
    schoolyearId: number;
    units: TimeUnit[];
}

export interface DateRange {
    start: string;
    end: string;
}

export interface CurrentSchoolYear {
    dateRange: DateRange;
    id: number;
    name: string;
    timeGrid: TimeGrid;
}

export interface OneDriveData {
    hasOneDriveRight: boolean;
    oneDriveClientVersion: string;
    oneDriveClientId: string;
}

export interface Tenant {
    displayName: string;
    id: string;
    wuHostName: string | null;
    name: string;
}

export interface Person {
    displayName: string;
    id: number;
    imageUrl: string;
}

export interface Permissions {
    views: string[];
}

export interface User {
    id: number;
    locale: string;
    name: string;
    email: string;
    permissions: Permissions;
    person: Person;
    roles: string[];
    students: unknown[];
    lastLogin: string;
}

export interface Holiday {
    id: number;
    name: string;
    start: string;
    end: string;
    bookable: boolean;
}

export interface AppData {
    currentSchoolYear: CurrentSchoolYear;
    departments: unknown[];
    isPlayground: boolean;
    oneDriveData: OneDriveData;
    tenant: Tenant;
    ui2020: boolean;
    user: User;
    permissions: string[];
    settings: string[];
    pollingJobs: unknown[];
    isSupportAccessOpen: boolean;
    licenceExpiresAt: string;
    holidays: Holiday[];
}