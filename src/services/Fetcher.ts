import { Authenticator } from "./Authenticator";

export class Fetcher {
    constructor(
        private authenticator: Authenticator,
        private url: string,
    ) { }

    async newToken(): Promise<string> {
        const cookies = this.authenticator.getCookies();

        const response = await fetch(
            `${this.url}/WebUntis/api/token/new`,
            { headers: { Cookie: cookies } }
        );

        if (!response.ok)
            throw new Error(`Token failed: ${response.status}`);

        return await response.text();
    }
}