import WebGLBase from '../WebGLBase';

export default class WebGLLab1 extends WebGLBase {
  start() {
    if (this.gl) {
      this.gl.clearColor(0.282, 0.239, 0.545, 1.0);
      this.gl.enable(this.gl.DEPTH_TEST);
      this.gl.depthFunc(this.gl.LEQUAL);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
  }
}
