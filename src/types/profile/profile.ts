export interface ProfileResponse {
    data: {
        profile: Profile;
        pwChangeAllowed: boolean;
    };
}

interface Profile {
    name: string;
    userGroup: string;
    userRoleId: number;
    department: string;
    languageCode: string;
    email: string;
    effectiveMaxBookings: number;
    openBookings: number;
    forwardMessageToEmail: boolean;
    userTaskNotifications: boolean;
    pwChangeAllowed: boolean;
    systemMailForwarding: boolean;
    gender: Gender;
    itemOnStartPage: number;
    showLessonsOfDay: boolean;
    showNextDayPeriods: boolean;
}

interface Gender {
    id: number;
    longLabel: string;
    shortLabel: string;
    icon: string;
}