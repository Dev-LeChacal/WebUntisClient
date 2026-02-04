import { after, before, test } from "node:test";

import { Credentials, WebUntisClient } from "../src";

let client: WebUntisClient;

before(async () => {
    const credentials = new Credentials(
        "WebUntisClient",
        "institut-saint-louis",
        process.env.UNTIS_USERNAME!,
        process.env.UNTIS_PASSWORD!,
    );
    client = new WebUntisClient(credentials);
    await client.login();
});

after(async () => {
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