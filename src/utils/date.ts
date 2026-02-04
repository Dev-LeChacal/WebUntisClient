export class UtilsDate {
    /**
     * Format date to YYYY-MM-DD
     */
    static formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }
}