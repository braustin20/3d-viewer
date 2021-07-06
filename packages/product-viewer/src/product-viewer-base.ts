import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, SceneLoader } from "@babylonjs/core";
import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

export default class ProductViewerElementBase extends LitElement {
    viewerWrapper: HTMLDivElement;
    renderCanvas: HTMLCanvasElement;
    inspector: HTMLDivElement;
    engine: Engine;
    scene: Scene;
    camera: ArcRotateCamera;
    @property({type: String}) modelUrl: string;

    constructor() {
        super();
    }

    // Lit element styles that get applied to the template in the render() function
    static styles = css`
        .renderCanvas {
            width: 100%;
            height: 100%;
            touch-action: none;
            outline: none;
        }
        .viewerWrapper {
            width: 100%;
            height: 100%;
        }
    `;

    initBabylon() {
        this.viewerWrapper = this.shadowRoot.querySelector(".viewerWrapper");
        this.renderCanvas = this.shadowRoot.querySelector(".renderCanvas");

        // initialize babylon scene and engine
        this.engine = new Engine(this.renderCanvas, true, { preserveDrawingBuffer: true, stencil: true }, true);
        this.scene = new Scene(this.engine);

        this.camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this.scene);
        this.camera.attachControl(this.renderCanvas, true);
        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), this.scene);
        //var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, this.scene);

        if (this.modelUrl) this.loadModel();
        else MeshBuilder.CreateSphere("sphere", { diameter: 1 }, this.scene);

        // hide/show the Inspector
        this.renderCanvas.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.code === "KeyI") {
                if (this.scene.debugLayer.isVisible()) {
                    this.scene.debugLayer.hide();
                } else {
                    this.scene.debugLayer.show({ embedMode: true });
                }
            }
        });
        
        window.addEventListener("resize", (ev) => {
            this.engine.resize();
        });
        
        // run the main render loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    loadModel(): void {
        console.log(this.modelUrl);
		SceneLoader.ImportMesh(
			"",
			this.modelUrl,
			"",
			this.scene,
			(meshes) => {
                // fired when mesh is loaded
                this.camera.setTarget(meshes[0])
			},
			null,
			null,
			".glb",
		);
	}

    // Fired on each property update. changedProperties includes the previous values
    updated(changedProperties: Map<string, any>) {
        super.updated?.(changedProperties);
    
        //if (changedProperties.has('viewerProps') && this.viewerProps != null) {
        this.updateRenderer();
        //}
    }

    render() {
        return html`
            <div class="viewerWrapper">
                <canvas class="renderCanvas" touch-action="none" />
            </div>
        `;
    }

    updateRenderer() {
        if (this.engine) this.engine.resize();
        else this.initBabylon();
    }
};