export default class WebGLBase {
  constructor(document, canvasId) {
    this.gl = null;
    this.canvas = document.getElementById(canvasId);

    this._initWebGL();
  }

  _initWebGL() {
    if (!this.gl && this.canvas) {
      this.gl = this.canvas.getContext('webgl') ||
        this.canvas.getContext('experimental-webgl');
    }
  }
}

