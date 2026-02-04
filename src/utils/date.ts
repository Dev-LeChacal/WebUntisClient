export type Format = 'YYYY-MM-DD' | 'YYYYMMDD';

export class UtilsDate {
    /**
     * Format date to YYYY-MM-DD or YYYYMMDD
     */
    static toUntisDate(date: Date, format: Format = 'YYYY-MM-DD'): string {
        const isoDate = date.toISOString().split('T')[0];

        if (format === 'YYYYMMDD') {
            return isoDate.replace(/-/g, '');
        }

        return isoDate;
    }

    /**
     * Parse date from YYYY-MM-DD or YYYYMMDD format
     */
    static fromUntisDate(date: string, format: Format = 'YYYY-MM-DD'): Date {
        let normalizedDate: string;

        if (format === 'YYYYMMDD') {
            // Convert YYYYMMDD to YYYY-MM-DD
            normalizedDate = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
        } else {
            normalizedDate = date;
        }

        return new Date(normalizedDate);
    }
}