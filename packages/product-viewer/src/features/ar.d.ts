import ProductViewerElementBase from "./../product-viewer-base";
import { Constructor } from "../tools/utils";
export declare interface ARInterface {
    ar: boolean;
    arModes: string;
    arScale: string;
    iosSrc: string | null;
    readonly canActivateAR: boolean;
    activateAR(): Promise<void>;
}
export declare const ARMixin: <T extends Constructor<ProductViewerElementBase, object>>(ModelViewerElement: T) => {
    new (...args: any[]): ARInterface;
    prototype: ARInterface;
} & object & T;
