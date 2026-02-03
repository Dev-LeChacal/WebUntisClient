export interface SessionResponse {
    jsonrpc: string;
    id: string;
    result: SessionInfo;
}

export interface SessionInfo {
    sessionId?: string;
    personType?: number;
    personId?: number;
    klasseId?: number;
}