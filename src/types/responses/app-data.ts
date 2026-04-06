interface RawTimeUnit {
    endTime: number;
    startTime: number;
    unitOfDay: number;
}

interface RawTimeGrid {
    schoolyearId: number;
    units: RawTimeUnit[];
}

interface RawDateRange {
    start: string;
    end: string;
}

interface RawCurrentSchoolYear {
    dateRange: RawDateRange;
    id: number;
    name: string;
    timeGrid: RawTimeGrid;
}

interface RawOneDriveData {
    hasOneDriveRight: boolean;
    oneDriveClientVersion: string;
    oneDriveClientId: string;
}

interface RawTenant {
    displayName: string;
    id: string;
    wuHostName: string | null;
    name: string;
}

interface RawPerson {
    displayName: string;
    id: number;
    imageUrl: string;
}

interface RawPermissions {
    views: string[];
}

interface RawUser {
    id: number;
    locale: string;
    name: string;
    email: string;
    permissions: RawPermissions;
    person: RawPerson;
    roles: string[];
    students: unknown[];
    lastLogin: string;
}

interface RawHoliday {
    id: number;
    name: string;
    start: string;
    end: string;
    bookable: boolean;
}

export interface RawAppData {
    currentSchoolYear: RawCurrentSchoolYear;
    departments: unknown[];
    isPlayground: boolean;
    oneDriveData: RawOneDriveData;
    tenant: RawTenant;
    ui2020: boolean;
    user: RawUser;
    permissions: string[];
    settings: string[];
    pollingJobs: unknown[];
    isSupportAccessOpen: boolean;
    licenceExpiresAt: string;
    holidays: RawHoliday[];
}