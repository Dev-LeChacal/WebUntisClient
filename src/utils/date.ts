export type Format = "YYYY-MM-DD" | "YYYYMMDD";

export class UtilsDate {
    /**
     * Format date to YYYY-MM-DD or YYYYMMDD
     */
    static formatDate(date: Date, format: Format): string {
        const isoDate = date.toISOString().split('T')[0];

        if (format === "YYYYMMDD") {
            return isoDate.replace(/-/g, '');
        }

        return isoDate;
    }
}