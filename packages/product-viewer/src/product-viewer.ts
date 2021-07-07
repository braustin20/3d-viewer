import ProductViewerElementBase from "./product-viewer-base";
import { ARMixin } from "./features/AR";
import { CameraMixin } from "./features/Camera";
import { LightingMixin } from "./features/Lighting";
import { LoaderMixin } from "./features/Loader";

export const ProductViewerElement = LoaderMixin(LightingMixin(CameraMixin(ARMixin(ProductViewerElementBase))));

export type ProductViewerElement = InstanceType<typeof ProductViewerElement>;

customElements.define("product-viewer", ProductViewerElement);

declare global {
    interface HTMLElementTagNameMap {
        'product-viewer': ProductViewerElement;
    }
    namespace JSX {
        interface IntrinsicElements {
            'product-viewer': any;
        }
    }
}
