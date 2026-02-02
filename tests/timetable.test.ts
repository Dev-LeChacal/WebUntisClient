import { WebUntisClient } from "../src";

test("get own timetable", async () => {

    const credentials = {
        identity: "WebUntisClient",
        school: "institut-saint-louis",
        username: process.env.UNTIS_USERNAME!,
        password: process.env.UNTIS_PASSWORD!,
    };

    const client = new WebUntisClient(credentials);

    await client.login();

    const timetable = await client.getTimetable(new Date("2026-02-05"), new Date("2026-02-06"));

    await client.logout();
});
