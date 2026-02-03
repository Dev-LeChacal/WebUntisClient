import { test } from "node:test";

import { Credentials, WebUntisClient } from "../src";

test("get own timetable", async () => {
    const credentials = new Credentials(
        "WebUntisClient",
        "institut-saint-louis",
        process.env.UNTIS_USERNAME!,
        process.env.UNTIS_PASSWORD!,
    );
    const client = new WebUntisClient(credentials);

    await client.login();

    await client.getTimetable(new Date("2026-02-05"), new Date("2026-02-06"));

    await client.logout();
});
