import { SessionInfo } from "../types/session";

export class JsonRpcClient {
    private url: string;

    private headers: Record<string, string> = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36",
        "Cache-Control": "no-cache",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        Pragma: "no-cache",
    };

    constructor(private identity: string, url: string) {
        this.url = `${url}/WebUntis/jsonrpc.do`;
    }

    //#region Login/Logout

    async authenticate(user: string, password: string, client: string): Promise<SessionInfo> {
        return this._post("authenticate", { user: user, password: password, client: client });
    }

    async logout(cookies: string): Promise<void> {
        await this._post("logout", {}, cookies);
    }

    //#endregion

    //#region Privates Methods

    private async _post<T>(method: string, params: Record<string, unknown>, cookies?: string): Promise<T> {
        const response = await fetch(
            this.url,
            {
                method: "POST",
                redirect: "manual",

                headers: {
                    ...this.headers,
                    ...(cookies ? { Cookie: cookies } : {}),
                },

                body: JSON.stringify({
                    id: this.identity,
                    jsonrpc: "2.0",
                    method,
                    params,
                }),
            }
        );

        if (response.status < 200 || response.status >= 303) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(
                `${data.error.message} (${data.error.code})`
            );
        }

        return data.result as T;
    }

    //#endregion
}