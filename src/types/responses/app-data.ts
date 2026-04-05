interface TimeUnit {
    endTime: number;
    startTime: number;
    unitOfDay: number;
}

interface TimeGrid {
    schoolyearId: number;
    units: TimeUnit[];
}

interface DateRange {
    start: string;
    end: string;
}

interface CurrentSchoolYear {
    dateRange: DateRange;
    id: number;
    name: string;
    timeGrid: TimeGrid;
}

interface OneDriveData {
    hasOneDriveRight: boolean;
    oneDriveClientVersion: string;
    oneDriveClientId: string;
}

interface Tenant {
    displayName: string;
    id: string;
    wuHostName: string | null;
    name: string;
}

interface Person {
    displayName: string;
    id: number;
    imageUrl: string;
}

interface Permissions {
    views: string[];
}

interface User {
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

interface Holiday {
    id: number;
    name: string;
    start: string;
    end: string;
    bookable: boolean;
}

export interface RawAppData {
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