export default class CanvasUtils {
  constructor(canvas) {
    this._handlers = [];
    this.elem = canvas;
    this.context = this.elem.getContext("2d");
    this.timer = null;
    this.run();
  }

  run() {
    this.timer = setTimeout(() => this.loop(), 33);
  }

  stop() {
    clearTimeout(this.timer);
  }

  loop() {
    this._handlers.forEach(handler => handler.loop());
  }

  callback() {

  }

  static CreateCanvas(width = 480, height = 360) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return new CanvasUtils(canvas);
  }

  addHandle(handler) {
    this._handlers.push(handler);
    handler.init(this);
  }
}

class Handler {
  init() {

  }

  loop() {

  }
}