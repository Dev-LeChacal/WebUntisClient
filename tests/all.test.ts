import { afterAll, beforeAll, test } from "bun:test";

import { Credentials, WebUntisClient } from "../src";

let client: WebUntisClient;

beforeAll(async () => {
    const credentials = new Credentials(
        "WebUntisClient",
        process.env.UNTIS_SCHOOL!,
        process.env.UNTIS_USERNAME!,
        process.env.UNTIS_PASSWORD!
    );
    client = new WebUntisClient(credentials);
    await client.login();
});

afterAll(async () => {
    await client.logout();
});

test("get app data", async () => {
    await client.getAppData();
});

test("get profile data", async () => {
    await client.getProfile();
});

test("get own timetable", async () => {
    await client.getOwnTimetable(new Date("2026-02-05"), new Date("2026-02-06"));
});

test("get class timetable", async () => {
    await client.getClassTimetable(new Date("2026-02-05"), new Date("2026-02-06"));
});

test("get homeworks", async () => {
    await client.getHomeworks(new Date("2025"), new Date("2026"));
});

test("get absences", async () => {
    await client.getAbsences(new Date("2025"), new Date("2026"));
});