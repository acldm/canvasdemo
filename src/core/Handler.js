export default class Handler {

  constructor() {
    this.canvas = null;
  }

  init(canvas) {
    this.canvas = canvas;
    this.start();
  }

  start() {}

  loop() {}

  prevLoop() {}
}