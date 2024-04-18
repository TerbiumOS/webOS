import { BareHeaders } from './BareTypes';
export type WebSocketImpl = {
    new (...args: ConstructorParameters<typeof WebSocket>): WebSocket;
};
export declare namespace BareWebSocket {
    type GetReadyStateCallback = () => number;
    type GetSendErrorCallback = () => Error | undefined;
    type GetProtocolCallback = () => string;
    type HeadersType = BareHeaders | Headers | undefined;
    type HeadersProvider = BareHeaders | (() => BareHeaders | Promise<BareHeaders>);
    interface Options {
        /**
         * A provider of request headers to pass to the remote.
         * Usually one of `User-Agent`, `Origin`, and `Cookie`
         * Can be just the headers object or an synchronous/asynchronous function that returns the headers object
         */
        headers?: BareWebSocket.HeadersProvider;
        /**
         * A hook executed by this function with helper arguments for hooking the readyState property. If a hook isn't provided, bare-client will hook the property on the instance. Hooking it on an instance basis is good for small projects, but ideally the class should be hooked by the user of bare-client.
         */
        readyStateHook?: ((socket: WebSocket, getReadyState: BareWebSocket.GetReadyStateCallback) => void) | undefined;
        /**
         * A hook executed by this function with helper arguments for determining if the send function should throw an error. If a hook isn't provided, bare-client will hook the function on the instance.
         */
        sendErrorHook?: ((socket: WebSocket, getSendError: BareWebSocket.GetSendErrorCallback) => void) | undefined;
        /**
         * A hook executed by this function with the URL. If a hook isn't provided, bare-client will hook the URL.
         */
        urlHook?: ((socket: WebSocket, url: URL) => void) | undefined;
        /**
         * A hook executed by this function with a helper for getting the current fake protocol. If a hook isn't provided, bare-client will hook the protocol.
         */
        protocolHook?: ((socket: WebSocket, getProtocol: BareWebSocket.GetProtocolCallback) => void) | undefined;
        /**
         * A callback executed by this function with an array of cookies. This is called once the metadata from the server is received.
         */
        setCookiesCallback?: ((setCookies: string[]) => void) | undefined;
        webSocketImpl?: WebSocket;
    }
}
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
export declare class BareClient {
    /**
     * Create a BareClient. Calls to fetch and connect will wait for an implementation to be ready.
     */
    constructor();
    createWebSocket(remote: string | URL, protocols: string | string[] | undefined, webSocketImpl: WebSocketImpl, requestHeaders: BareHeaders, arrayBufferImpl: typeof ArrayBuffer): WebSocket;
    fetch(url: string | URL, init?: RequestInit): Promise<BareResponseFetch>;
}
