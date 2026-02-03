import test from "node:test";

import { Credentials, WebUntisClient } from "../src";

test("login", async () => {
    const credentials = new Credentials(
        "WebUntisClient",
        "institut-saint-louis",
        process.env.UNTIS_USERNAME!,
        process.env.UNTIS_PASSWORD!,
    );

    const client = new WebUntisClient(credentials);

    await client.login();
    await client.logout();
});
