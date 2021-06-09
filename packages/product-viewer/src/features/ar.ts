import ProductViewerElementBase from "./../product-viewer-base";
import { Constructor } from "../tools/utils";

export const ARMixin = <T extends Constructor<ProductViewerElementBase>>(
    ModelViewerElement: T): Constructor<ARInterface>&T => {
  class ARModelViewerElement extends ModelViewerElement {
}
return ARModelViewerElement;
};