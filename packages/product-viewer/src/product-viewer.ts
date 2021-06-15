import ProductViewerElementBase from "./product-viewer-base";
import { ARMixin } from "./features/ar";

export const ProductViewerElement = ARMixin(ProductViewerElementBase);

export type ProductViewerElement = InstanceType<typeof ProductViewerElement>;

customElements.define("product-viewer", ProductViewerElement);

export { ARMixin } from "./features/ar";

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
