import { Credentials, WebUntisClient } from "../src";

const credentials = new Credentials(
    "WebUntisClient",
    process.env.UNTIS_SCHOOL!,
    process.env.UNTIS_USERNAME!,
    process.env.UNTIS_PASSWORD!
);

const client = new WebUntisClient(credentials);
await client.login();

const currentDate = new Date("2025");
let found = false;
let attempts = 0;

while (!found) {
    console.log(`Current date: ${currentDate.toDateString()} | Attempts: ${attempts}`);

    const timetable = await client.getOwnTimetable(currentDate, currentDate);

    for (const day of timetable) {
        for (const course of day.gridEntries) {
            if (course.status !== "REGULAR" && course.status !== "NO_DATA") {
                found = true;
                console.log(`Found a not discovered status: ${course.status} on ${currentDate.toDateString()}`);
            }
        }
    }

    if (!found) {
        currentDate.setDate(currentDate.getDate() + 1);
        attempts++;
    }
}

await client.logout();