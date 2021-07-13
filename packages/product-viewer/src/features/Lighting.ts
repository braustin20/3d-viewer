import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
import { property } from "lit/decorators.js";
import { Vector3, HemisphericLight, CubeTexture, ImageProcessingConfiguration } from "@babylonjs/core";
//import neutralEnv from "../../viewer-assets/environments/neutral.env";

export declare interface LightingInterface {
    lightIntensity: Number;
}

export const LightingMixin = <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T): Constructor<LightingInterface> & T => {
    class LightingModelViewerElement extends BaseViewerElement {
        hemisphericLight1: HemisphericLight;
        hemisphericLight2: HemisphericLight;
        @property({type: Number, attribute: 'light-intensity'}) lightIntensity = 0.6;

        updated(changedProperties: Map<string, any>): void {
            super.updated?.(changedProperties);
        
            this.updateLighting();
        }

        updateLighting(): void {
            // Lights
            this.hemisphericLight1 = new HemisphericLight("HemisphericLight1", new Vector3(0, 1, 0), this.scene);
            this.hemisphericLight1.intensity = this.lightIntensity;

            this.hemisphericLight2 = new HemisphericLight("HemisphericLight2", new Vector3(0, -1, 0), this.scene);
            this.hemisphericLight2.intensity = this.lightIntensity;
            const neutralEnv = new URL("../../viewer-assets/environments/neutral.env", import.meta.url)
            const hdrTexture = CubeTexture.CreateFromPrefilteredData(neutralEnv.href, this.scene);
		    this.scene.environmentTexture = hdrTexture;

            // Enable tonemapping to prevent white blowout
            this.scene.imageProcessingConfiguration.toneMappingEnabled = true;
            this.scene.imageProcessingConfiguration.toneMappingType = ImageProcessingConfiguration.TONEMAPPING_ACES;
        }
    }
    return LightingModelViewerElement as Constructor<LightingInterface> & T;
};