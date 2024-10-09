import { BareHeaders, BareTransport } from './baretypes';
import { WorkerConnection } from './connection';
export declare function validProtocol(protocol: string): boolean;
export type WebSocketImpl = {
    new (...args: ConstructorParameters<typeof WebSocket>): WebSocket;
};
/**
 * A Response with additional properties.
 */
export interface BareResponse extends Response {
    rawResponse: Response;
    rawHeaders: BareHeaders;
}
/**
 * A BareResponse with additional properties.
 */
export interface BareResponseFetch extends BareResponse {
    finalURL: string;
}
export declare class BareMuxConnection {
    worker: WorkerConnection;
    constructor(worker?: string | Promise<MessagePort> | MessagePort);
    getTransport(): Promise<string>;
    setTransport(path: string, options: any[], transferables?: Transferable[]): Promise<void>;
    setManualTransport(functionBody: string, options: any[], transferables?: Transferable[]): Promise<void>;
    setRemoteTransport(transport: BareTransport, name: string): Promise<void>;
    getInnerPort(): MessagePort | Promise<MessagePort>;
}
export declare class BareClient {
    worker: WorkerConnection;
    /**
     * Create a BareClient. Calls to fetch and connect will wait for an implementation to be ready.
     */
    constructor(worker?: string | Promise<MessagePort> | MessagePort);
    createWebSocket(remote: string | URL, protocols?: string | string[] | undefined, webSocketImpl?: WebSocketImpl, requestHeaders?: BareHeaders, arrayBufferImpl?: ArrayBuffer): WebSocket;
    fetch(url: string | URL, init?: RequestInit): Promise<BareResponseFetch>;
}
