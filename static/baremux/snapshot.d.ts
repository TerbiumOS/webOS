export declare const fetch: typeof globalThis.fetch;
export declare const WebSocket: {
    new (url: string | URL, protocols?: string | string[] | undefined): WebSocket;
    prototype: WebSocket;
    readonly CONNECTING: 0;
    readonly OPEN: 1;
    readonly CLOSING: 2;
    readonly CLOSED: 3;
};
export declare const Request: {
    new (input: URL | RequestInfo, init?: RequestInit | undefined): Request;
    prototype: Request;
};
export declare const Response: {
    new (body?: BodyInit | null | undefined, init?: ResponseInit | undefined): Response;
    prototype: Response;
    error(): Response;
    json(data: any, init?: ResponseInit | undefined): Response;
    redirect(url: string | URL, status?: number | undefined): Response;
};
export declare const XMLHttpRequest: {
    new (): XMLHttpRequest;
    prototype: XMLHttpRequest;
    readonly UNSENT: 0;
    readonly OPENED: 1;
    readonly HEADERS_RECEIVED: 2;
    readonly LOADING: 3;
    readonly DONE: 4;
};
export declare const WebSocketFields: {
    prototype: {
        send: {
            (data: string | Blob | ArrayBufferView | ArrayBufferLike): void;
            (data: string | Blob | ArrayBufferView | ArrayBufferLike): void;
        };
    };
    CLOSED: 3;
    CLOSING: 2;
    CONNECTING: 0;
    OPEN: 1;
};
