import Handler from "../core/Handler";

export default class ClearScreenHandler extends Handler {
  prevLoop() {
    this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}