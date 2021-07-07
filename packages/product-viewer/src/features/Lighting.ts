import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
import { property } from "lit/decorators.js";
import { Vector3, HemisphericLight } from "@babylonjs/core";

export declare interface LightingInterface {
    lightIntensity: Number;
}

export const LightingMixin = <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T): Constructor<LightingInterface> & T => {
    class LightingModelViewerElement extends BaseViewerElement {
        hemiLight: HemisphericLight;
        @property({type: Number, attribute: 'light-intensity'}) lightIntensity: Number = 1;

        updated(changedProperties: Map<string, any>): void {
            super.updated?.(changedProperties);
        
            this.updateLighting();
        }

        updateLighting(): void {
            this.hemiLight = new HemisphericLight("light1", new Vector3(1, 1, 0), this.scene);
        }
    }
    return LightingModelViewerElement as Constructor<LightingInterface> & T;
};