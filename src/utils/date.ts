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

/**
 * Combines a compact WebUntis date (20260107) and time (815 or 1150) into a single Date object.
 */
export function fromCompactDateTime(date: number | string, time: number | string): Date {
    const dateStr = String(date);
    const timeStr = String(time).padStart(4, "0");

    const iso = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}T${timeStr.slice(0, 2)}:${timeStr.slice(2, 4)}:00`;

    return new Date(iso);
}

/** Converts a WebUntis Unix timestamp (ms) to a Date object */
export function fromTimestamp(ts: number): Date {
    return new Date(ts);
}