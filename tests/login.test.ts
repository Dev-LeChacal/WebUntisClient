import { WebUntisClient } from "../src";

test("login", async () => {
    const credentials = {
        identity: "WebUntisClient",
        school: "institut-saint-louis",
        username: process.env.UNTIS_USERNAME!,
        password: process.env.UNTIS_PASSWORD!,
    };

    const client = new WebUntisClient(credentials);

    await client.login();
    await client.logout();
});
