import { Authenticator } from "../auth/Authenticator";
import { SchoolYear } from "../types/year";

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

    async schoolYears(token: string, tenantId: string): Promise<SchoolYear[]> {
        const cookies = this.authenticator.getCookies();

        const response = await fetch(
            `${this.url}/WebUntis/api/rest/view/v1/schoolyears`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "tenant-id": tenantId,
                    Cookie: cookies
                }
            }
        );

        if (!response.ok)
            throw new Error(`School year request failed with status ${response.status}`);

        return await response.json();
    }

        return await result.json();
    }
}