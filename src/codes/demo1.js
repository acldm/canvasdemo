import CanvasUtils from "../CanvasUtils";

/**
 * 
 * @param {CanvasUtils} canvasUtils 
 */
export default function () {
    const canvas = CanvasUtils.CreateCanvas();
    const miniCanvas = CanvasUtils.CreateCanvas(200, 200);
    document.documentElement.appendChild(canvas.elem);
    document.documentElement.appendChild(miniCanvas.elem);
    const { context } = canvas;
} 