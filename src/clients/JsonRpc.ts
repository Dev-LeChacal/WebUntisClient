import { AuthenticationError } from "../errors/Authentication";
import { JsonRpcResponse } from "../types/json-rpc/json-rpc";
import { SessionInfo } from "../types/session/session";
import { HttpClient } from "./Http";

/**
 * JSON-RPC client for WebUntis API
 */
export class JsonRpcClient {
    private readonly _httpClient: HttpClient;
    private readonly _endpoint = "/WebUntis/jsonrpc.do";

    constructor(
        private readonly _identity: string,
        url: string
    ) {
        this._httpClient = new HttpClient(url);
    }

    /**
     * Authenticate user and get session
     */
    async authenticate(
        username: string,
        password: string,
        client: string
    ): Promise<SessionInfo> {
        try {
            const result = await this._call<SessionInfo>("authenticate", {
                user: username,
                password: password,
                client: client
            });

            if (!result.sessionId) {
                throw new AuthenticationError("Authentication failed: No session ID returned");
            }

            return result;

        } catch (error) {
            if (error instanceof AuthenticationError) {
                throw error;
            }

            throw new AuthenticationError(
                `Authentication failed: ${error instanceof Error ? error.message : "Unknown error"}`
            );
        }
    }

    /**
     * Logout and end session
     */
    async logout(cookies: string): Promise<void> {
        await this._call("logout", {}, cookies);
    }

    /**
     * Make a JSON-RPC call
     */
    private async _call<Result>(
        method: string,
        params: Record<string, unknown>,
        cookies?: string
    ): Promise<Result> {
        const headers: Record<string, string> = {};

        if (cookies) {
            headers.Cookie = cookies;
        }

        const body = {
            id: this._identity,
            jsonrpc: "2.0",
            method,
            params
        };

        const response = await this._httpClient.post<JsonRpcResponse<Result>>(
            this._endpoint,
            body,
            headers
        );

        if (response.error) {
            throw new AuthenticationError(
                `${response.error.message} (${response.error.code})`,
                response.error.code.toString()
            );
        }

        return response.result!;
    }
}