import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from "@babylonjs/core";

const templateString = `
    <style>
        .renderCanvas {
            width: 100%;
            height: 100%;
            touch-action: none;
        }
        .viewerWrapper {
            width: 100%;
            height: 100%;
        }
    </style>
    <div class="viewerWrapper">
        <canvas class="renderCanvas"/>
    </div>
`;
const template = document.createElement('template');
template.innerHTML = templateString;

export default class ProductViewerElementBase extends HTMLElement {
    viewerWrapper: HTMLDivElement;
    renderCanvas: HTMLCanvasElement;
    inspector: HTMLDivElement;

    constructor () {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.viewerWrapper = shadowRoot.querySelector('.viewerWrapper');
        this.renderCanvas = shadowRoot.querySelector('.renderCanvas');
        this.inspector = shadowRoot.querySelector('#inspector');

        // initialize babylon scene and engine
        var engine = new Engine(this.renderCanvas, true, { preserveDrawingBuffer: true, stencil: true }, true);
        var scene = new Scene(engine);

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

        this.renderCanvas.addEventListener("resize", (ev) => {
            engine.resize();
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }
};