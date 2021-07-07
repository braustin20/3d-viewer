import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
import { property } from "lit/decorators.js";
import { Vector3, ArcRotateCamera } from "@babylonjs/core";

export declare interface CameraInterface {
    alpha: Number;
    beta: Number;
}

export const CameraMixin = <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T): Constructor<CameraInterface> & T => {
    class CameraModelViewerElement extends BaseViewerElement {
        @property({type: Number, attribute: 'alpha'}) alpha: Number = 0;
        @property({type: Number, attribute: 'beta'}) beta: Number = 0;

        updated(changedProperties: Map<string, any>) {
            super.updated?.(changedProperties);
        
            this.updateCamera();
        }

        updateCamera(): void {
            this.camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this.scene);
            this.camera.attachControl(this.renderCanvas, true);
        }
    }
    return CameraModelViewerElement as Constructor<CameraInterface> & T;
};