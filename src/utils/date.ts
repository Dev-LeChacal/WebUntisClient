/** Converts a Date to compact WebUntis format: 20260405 */
export function toCompact(date: Date): string {
    return date.toISOString().split("T")[0].replace(/-/g, "");
}

/** Converts a Date to ISO format: 2026-04-05 */
export function toISO(date: Date): string {
    return date.toISOString().split("T")[0];
}

/** Parses a compact WebUntis date string (20260405) to a Date object */
export function fromCompact(date: string): Date {
    return new Date(`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`);
}

/** Parses an ISO date string (2026-04-05) to a Date object */
export function fromISO(date: string): Date {
    return new Date(date);
}