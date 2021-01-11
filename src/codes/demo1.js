import CanvasService from "../CanvasService";
import Handler from "../core/Handler";
import ClearScreenHandler from "../handlers/ClearScreenHandler";

/**
 * 
 * @param {CanvasService} CanvasService 
 */
export default function () {
    const canvas = CanvasService.CreateCanvas();
    const miniCanvas = CanvasService.CreateCanvas(200, 200);
    document.documentElement.appendChild(canvas.elem);
    document.documentElement.appendChild(miniCanvas.elem);
    canvas.addHandle(new ClearScreenHandler());
    canvas.addHandle(new Demo1Handler());
    canvas.addHandle(new MouseHandler());
    let dynamicRect = new DrawDynamicRectHandler();
    canvas.addHandle(dynamicRect);
    miniCanvas.addHandle(new ClearScreenHandler());
    let miniHandler = new MiniCanvasHandler();
    miniCanvas.addHandle(miniHandler);
    dynamicRect.setSelectRegionFinished((x1, y1, x2, y2) => {
        let selectedImgData = canvas.context.getImageData(
            x1,
            y1,
            x2 - x1,
            y2 - y1
        );
        miniHandler.setImgData(selectedImgData)
    })

} 

class Demo1Handler extends Handler {
    start() {
        this.enable = false;
        this.image = new Image();
        this.image.src = '../res/images/bg.jpg';
        this.image.onload = () => this.enable = true;
    }

    loop() {
        if (this.enable) {
            this.canvas.context.drawImage(this.image, 0, 0);
        }
    }
}

class MouseHandler extends Handler {
    start() {
        this.x = 0;
        this.y = 0;
        this.enable = false;

        window.addEventListener('mousemove', e => {
            const { offsetX, offsetY } = e;
            this.x = offsetX; 
            this.y = offsetY; 
        })

        window.addEventListener('mousedown', () => {
            this.enable = true;
        })

        window.addEventListener('mouseup', () => {
            this.enable = false;
        })
    }
}

class DrawDynamicRectHandler extends Handler {
    start() {
        this.callback = () => {};
        this.mouse = this.canvas.getHandler("MouseHandler");
        this.selectRegionX = 0; 
        this.selectRegionY = 0; 
        this.waitStartEnable = true;
    }

    resetRegion() {
        this.selectRegionX = 0;
        this.selectRegionY = 0;
    }

    loop() {
        const { context } = this.canvas;
        if (this.mouse.enable === false) {
            if (this.waitStartEnable === false) {
                this.callback(
                    this.selectRegionX,
                    this.selectRegionY,
                    this.mouse.x,
                    this.mouse.y
                );
            }
            this.waitStartEnable = true;
        } else {
            if (this.waitStartEnable) {
                this.waitStartEnable = false;
                this.selectRegionX = this.mouse.x;
                this.selectRegionY = this.mouse.y;
            }

            context.strokeRect(this.selectRegionX, 
                this.selectRegionY, 
                this.mouse.x - this.selectRegionX, 
                this.mouse.y - this.selectRegionY);
        }

    }

    setSelectRegionFinished(callback) {
        this.callback = callback;
    }
}

class MiniCanvasHandler extends Handler {
    start() {
        this.imgData = null;
    }

    loop() {
        if (this.imgData) {
            this.canvas.context.putImageData(this.imgData, 0, 0);
        }
    }

    setImgData(imgData) {
        this.imgData = imgData;
    }
}