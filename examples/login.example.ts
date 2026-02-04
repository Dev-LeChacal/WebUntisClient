import { Credentials, WebUntisClient } from '../src';

/**
 * Login Example
 */
async function loginExample() {
    // Create credentials
    const credentials = new Credentials(
        "WebUntisClient",
        "school-name",
        "username",
        "password",
    );

    // Create client
    const client = new WebUntisClient(credentials);

    // Then login
    await client.login();

    // Don't forget to end the session
    await client.logout();
}

await loginExample();