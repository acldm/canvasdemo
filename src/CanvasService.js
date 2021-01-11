export default class CanvasService {
  constructor(canvas) {
    this._handlers = [];
    this._handlerMaps = {}
    this.elem = canvas;
    this.context = this.elem.getContext("2d");
    this.timer = null;
    this.width = canvas.width;
    this.height = canvas.width;
    this.run();
  }

  run() {
    this.timer = setTimeout(() => {
      this.loop();
      this.run();
    }, 33);
  }

  stop() {
    clearTimeout(this.timer);
  }

  loop() {
    this._handlers.forEach(handler => handler.prevLoop());
    this._handlers.forEach(handler => handler.loop());
  }

  static CreateCanvas(width = 480, height = 360) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return new CanvasService(canvas);
  }

  addHandle(handler) {
    this._handlers.push(handler);
    handler.init(this);
    this._handlerMaps[handler.constructor.name] = handler;
  }

  getHandler(name) {
    return this._handlerMaps[name];
  }
}
