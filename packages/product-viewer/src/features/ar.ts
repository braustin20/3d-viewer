import ProductViewerElementBase from "./../product-viewer-base";
import { Constructor } from "../tools/utils";

export declare interface ARInterface {
  ar: boolean;
  arModes: string;
  arScale: string;
  iosSrc: string|null;
  readonly canActivateAR: boolean;
  activateAR(): Promise<void>;
}

export const ARMixin = <T extends Constructor<ProductViewerElementBase>>(
    ModelViewerElement: T): Constructor<ARInterface>&T => {
  class ARModelViewerElement extends ModelViewerElement {
    ar: boolean = false;
    arModes: string = "";
    arScale: string = "auto";
    iosSrc: string|null = null;
    canActivateAR: boolean = true;
    
    async activateAR() {

    };
}
return ARModelViewerElement;
};