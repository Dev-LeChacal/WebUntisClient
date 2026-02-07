import chalk from "chalk";

import { Credentials, WebUntisClient } from "../src";

const credentials = new Credentials(
    "WebUntisClient",
    process.env.UNTIS_SCHOOL!,
    process.env.UNTIS_USERNAME!,
    process.env.UNTIS_PASSWORD!
);

const client = new WebUntisClient(credentials);
await client.login();

const startDate = new Date("2024");
const endDate = new Date("2027");

const all = new Set<string>();
const currentDate = new Date(startDate);

while (currentDate <= endDate) {
    const monthStart = new Date(currentDate);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    console.log(`Fetching ${chalk.green(monthStart.toDateString())} to ${chalk.blue(monthEnd.toDateString())}`);

    const timetable = await client.getOwnTimetable(monthStart, monthEnd);

    for (const day of timetable) {
        for (const course of day.gridEntries) {
            if (course.teacher?.status) {
                all.add(course.teacher.status);

                if (course.teacher.status !== "REGULAR" && course.teacher.status !== "NO_DATA") {
                    console.log(chalk.red.bold(`Found teacher status: ${course.teacher.status} on ${day.date.toDateString()}`));
                }
            }

            if (course.subject?.status) {
                all.add(course.subject.status);

                if (course.subject.status !== "REGULAR" && course.subject.status !== "NO_DATA") {
                    console.log(chalk.yellow.bold(`Found subject status: ${course.subject.status} on ${day.date.toDateString()}`));
                }
            }

            if (course.room?.status) {
                all.add(course.room.status);

                if (course.room.status !== "REGULAR" && course.room.status !== "NO_DATA") {
                    console.log(chalk.blue.bold(`Found room status: ${course.room.status} on ${day.date.toDateString()}`));
                }
            }
        }
    }

    currentDate.setMonth(currentDate.getMonth() + 1);
}

console.log(chalk.yellow(`\nAll unique statuses found:`), chalk.cyan(Array.from(all).join(", ")));

await client.logout();