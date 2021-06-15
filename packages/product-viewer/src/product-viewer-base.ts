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
        .canvasWrapper {
            width: 100%;
            height: 100%;
            top: 0;
            right: 0;
            position:absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
          }
    </style>
    <div class="canvasWrapper">
        <canvas class="renderCanvas"></canvas>
    </div>
`;
const template = document.createElement('template');
template.innerHTML = templateString;

export default class ProductViewerElementBase extends HTMLElement {
    canvasWrapper: HTMLDivElement;
    renderCanvas: HTMLCanvasElement;

    constructor () {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.canvasWrapper = shadowRoot.querySelector('.canvasWrapper');
        this.renderCanvas = shadowRoot.querySelector('.renderCanvas');
        console.log(this.renderCanvas);

        // initialize babylon scene and engine
        var engine = new Engine(this.renderCanvas, true);
        var scene = new Scene(engine);

        var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        camera.attachControl(this.renderCanvas, true);
        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }
};