import { BareTransport } from "./BareTypes";
declare global {
    interface ServiceWorkerGlobalScope {
        gSwitcher: Switcher;
        BCC_VERSION: string;
        BCC_DEBUG: boolean;
    }
    interface WorkerGlobalScope {
        gSwitcher: Switcher;
        BCC_VERSION: string;
        BCC_DEBUG: boolean;
    }
    interface Window {
        gSwitcher: Switcher;
        BCC_VERSION: string;
        BCC_DEBUG: boolean;
    }
}
declare class Switcher {
    active: BareTransport | null;
    channel: BroadcastChannel;
    constructor();
}
export declare function findSwitcher(): Switcher;
export declare function SetTransport(name: string, ...config: any[]): void;
export declare function SetSingletonTransport(client: BareTransport): Promise<void>;
export {};
