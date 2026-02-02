import { WebUntisClient } from "../src";

test("get profile data", async () => {

    const credentials = {
        identity: "WebUntisClient",
        school: "institut-saint-louis",
        username: process.env.UNTIS_USERNAME!,
        password: process.env.UNTIS_PASSWORD!,
    };

    const client = new WebUntisClient(credentials);

    await client.login();

    const profile = await client.getProfile();
    console.log(profile);

    await client.logout();
});
