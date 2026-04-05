import { afterAll, beforeAll, expect, test } from "bun:test";

import { Credentials, WebUntisClient } from "../src";

let client: WebUntisClient;

beforeAll(async () => {
    const credentials = new Credentials(
        process.env.UNTIS_SCHOOL!,
        process.env.UNTIS_USERNAME!,
        process.env.UNTIS_PASSWORD!
    );

    client = new WebUntisClient(credentials);
    await client.auth.login(credentials.Username, credentials.Password);
});

test("login", () => {
    expect(client.auth.isAuthenticated()).toBe(true);
});

test("get own timetable", async () => {
    const range = { start: new Date("2026-02-05"), end: new Date("2026-02-06") };
    await client.timetable.getOwn(range);
});

test("get class timetable", async () => {
    const range = { start: new Date("2026-02-05"), end: new Date("2026-02-06") };
    await client.timetable.getClass(range);
});

afterAll(async () => {
    await client.auth.logout();
});

// test("get app data", async () => {
//     await client.getAppData();
// });
//
// test("get profile data", async () => {
//     await client.getProfile();
// });
//
//
// test("get homeworks", async () => {
//     await client.getHomeworks(new Date("2025"), new Date("2026"));
// });
//
// test("get absences", async () => {
//     await client.getAbsences(new Date("2025"), new Date("2026"));
// });