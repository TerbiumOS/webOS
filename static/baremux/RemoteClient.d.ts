/// <reference lib="webworker" />
import { BareHeaders, BareTransport, TransferrableResponse } from './BareTypes';
export declare function registerRemoteListener(channel: ServiceWorker): void;
export default class RemoteTransport implements BareTransport {
    canstart: boolean;
    ready: boolean;
    promises: Map<string, (data: any) => void>;
    constructor();
    init(): Promise<void>;
    meta(): Promise<void>;
    request(remote: URL, method: string, body: BodyInit | null, headers: BareHeaders, signal: AbortSignal | undefined): Promise<TransferrableResponse>;
    connect(url: URL, origin: string, protocols: string[], requestHeaders: BareHeaders, onopen: (protocol: string) => void, onmessage: (data: Blob | ArrayBuffer | string) => void, onclose: (code: number, reason: string) => void, onerror: (error: string) => void): (data: Blob | ArrayBuffer | string) => void;
}
