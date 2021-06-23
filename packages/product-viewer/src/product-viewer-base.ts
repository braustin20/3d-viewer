import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from "@babylonjs/core";

const templateString = `
    <style>
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
    </style>
    <div class="viewerWrapper">
        <canvas class="renderCanvas" touch-action="none" />
    </div>
`;
const template = document.createElement("template");
template.innerHTML = templateString;

export default class ProductViewerElementBase extends HTMLElement {
    viewerWrapper: HTMLDivElement;
    renderCanvas: HTMLCanvasElement;
    inspector: HTMLDivElement;
    engine: Engine;

    constructor () {
        super();
        const shadowRoot = this.attachShadow({mode: "open"});
        this.shadowRoot.isConnected
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.viewerWrapper = shadowRoot.querySelector(".viewerWrapper");
        this.renderCanvas = shadowRoot.querySelector(".renderCanvas");

        // initialize babylon scene and engine
        this.engine = new Engine(this.renderCanvas, true, { preserveDrawingBuffer: true, stencil: true }, true);
        var scene = new Scene(this.engine);

        var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        camera.attachControl(this.renderCanvas, true);
        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

        // hide/show the Inspector
        this.renderCanvas.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.code === "KeyI") {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show({ embedMode: true });
                }
            }
        });
        
        window.addEventListener("resize", (ev) => {
            this.engine.resize();
        });
        
        // run the main render loop
        this.engine.runRenderLoop(() => {
            scene.render();
        });
    }

    // Called when the element has been added to the page
    connectedCallback() {
        // Make sure the engine canvas is properly resized 
        this.engine.resize();
    }

    // Called when an attribute is changed
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
    }
};