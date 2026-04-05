import { AuthError } from "../errors/Auth";
import { JsonRpcResponse } from "../types/responses/json-rpc";
import { RawSessionInfo } from "../types/responses/session";
import { RequestManager } from "./RequestManager";

export class JsonRpcClient {
    private readonly CLIENT_ID = "WebUntisClient";
    private readonly endpoint: string;

    constructor(
        private readonly requestManager: RequestManager,
        baseURL: string
    ) {
        this.endpoint = `${baseURL}/WebUntis/jsonrpc.do`;
    }

    async login(username: string, password: string): Promise<RawSessionInfo> {
        const result = await this.call<RawSessionInfo>("authenticate", {
            user: username,
            password: password,
            client: this.CLIENT_ID
        });

        if ( result.sessionId === undefined ) {
            throw new AuthError("Authentication failed");
        }

        return result;
    }

    async logout(cookies: string): Promise<void> {
        await this.call("logout", {}, cookies);
    }

    private async call<T>(method: string, params: Record<string, string>, cookies?: string): Promise<T> {
        const headers: Record<string, string> = {};

        if ( cookies ) {
            headers["Cookie"] = cookies;
        }

        const body = {
            id: this.CLIENT_ID,
            jsonrpc: "2.0",
            method,
            params
        };

        const response = await this.requestManager.post<JsonRpcResponse<T>>(
            this.endpoint,
            body,
            headers
        );

        if ( response.error ) {
            throw new AuthError(`${response.error.message} (${response.error.code})`);
        }

        if ( response.result === null && method !== "logout" ) {
            throw new AuthError("Invalid response");
        }

        return response.result as T;
    }
}