interface JsonRpcError {
    code: number;
    message: string;
}

export interface JsonRpcResponse<T> {
    id: string;
    jsonrpc: string;
    result: T | null;
    error?: JsonRpcError;
}