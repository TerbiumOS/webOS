export declare const fetch: typeof globalThis.fetch;
export declare const WebSocket: {
    new (url: string | URL, protocols?: string | string[]): WebSocket;
    prototype: WebSocket;
    readonly CONNECTING: 0;
    readonly OPEN: 1;
    readonly CLOSING: 2;
    readonly CLOSED: 3;
};
export declare const Request: {
    new (input: RequestInfo | URL, init?: RequestInit): Request;
    prototype: Request;
};
export declare const Response: {
    new (body?: BodyInit | null, init?: ResponseInit): Response;
    prototype: Response;
    error(): Response;
    json(data: any, init?: ResponseInit): Response;
    redirect(url: string | URL, status?: number): Response;
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
export declare const SharedWorker: {
    new (scriptURL: string | URL, options?: string | WorkerOptions): SharedWorker;
    prototype: SharedWorker;
};
export declare const localStorage: Storage;
export declare const serviceWorker: ServiceWorkerContainer;
export declare const WebSocketFields: {
    prototype: {
        send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void;
    };
    CLOSED: 3;
    CLOSING: 2;
    CONNECTING: 0;
    OPEN: 1;
};
