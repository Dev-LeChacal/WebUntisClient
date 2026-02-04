
import { NetworkError } from "../errors/Network";

export class HttpClient {
    private readonly _defaultHeaders: Record<string, string> = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36',
        'Cache-Control': 'no-cache',
        'X-Requested-With': 'XMLHttpRequest',
        Pragma: 'no-cache',
    };

    constructor(private readonly _url: string) { }

    /**
     * Make a GET request
     */
    async get<T>(
        endpoint: string,
        headers?: Record<string, string>
    ): Promise<T> {
        const response = await fetch(
            `${this._url}${endpoint}`,
            {
                method: 'GET',
                headers: {
                    ...this._defaultHeaders,
                    ...headers,
                },
            }
        );

        return this._handleResponse<T>(response);
    }

    /**
     * Make a POST request
     */
    async post<T>(
        endpoint: string,
        body?: Record<string, unknown>,
        headers?: Record<string, string>
    ): Promise<T> {
        const response = await fetch(
            `${this._url}${endpoint}`,
            {
                method: 'POST',
                headers: {
                    ...this._defaultHeaders,
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: body ? JSON.stringify(body) : undefined,
                redirect: 'manual',
            }
        );

        return this._handleResponse<T>(response);
    }

    /**
     * Make a GET request that returns text
     */
    async getText(
        endpoint: string,
        headers?: Record<string, string>
    ): Promise<string> {
        const response = await fetch(
            `${this._url}${endpoint}`,
            {
                method: 'GET',
                headers: {
                    ...this._defaultHeaders,
                    ...headers,
                },
            }
        );

        if (!response.ok) {
            throw new NetworkError(
                `HTTP ${response.status}: ${response.statusText}`,
                response.status
            );
        }

        return response.text();
    }

    /**
     * Handle HTTP response and errors
     */
    private async _handleResponse<T>(response: Response): Promise<T> {
        if (response.status < 200 || response.status >= 303) {
            throw new NetworkError(
                `HTTP ${response.status}: ${response.statusText}`,
                response.status
            );
        }

        const contentType = response.headers.get('content-type');

        if (contentType?.includes('application/json')) {
            return await response.json();
        }

        return await response.text() as T;
    }
}