import type { WorkerConnection } from "./connection";
import { BareHeaders } from "./baretypes";
export declare class BareWebSocket extends EventTarget {
    url: string;
    protocols: string | string[] | undefined;
    readyState: number;
    binaryType: string;
    onopen: any;
    onerror: any;
    onmessage: any;
    onclose: any;
    channel: MessageChannel;
    constructor(remote: string | URL, protocols: string | string[] | undefined, worker: WorkerConnection, requestHeaders?: BareHeaders, arrayBufferImpl?: ArrayBuffer);
    send(...args: any[]): void;
    close(code: any, reason: any): void;
    get bufferedAmount(): number;
    get protocol(): string;
    get extensions(): string;
}
