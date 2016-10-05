export default class WebGLBase {
  constructor(canvasId, vertexShaderText, fragmentVertexText) {
    this.gl = null;
    this.canvas = document.getElementById(canvasId);
    this.vertexShader = null;
    this.fragmentShader = null;
    this.shaderProgram = null;
    this.vertexShaderSource = vertexShaderText ||
      `
      attribute vec3 aVertexPosition;
      
       uniform mat4 uMVMatrix;
       uniform mat4 uPMatrix;
  
       void main(void) {
          gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        }`;
    this.fragmentShaderSource = fragmentVertexText ||
      `
      void main(void) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      }`;

    this._initWebGL();
    this._initShaders();
  }

  _initVertexShader() {
    this.vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(this.vertexShader, this.vertexShaderSource);
    this.gl.compileShader(this.vertexShader);

    if (!this.gl.getShaderParameter(this.vertexShader, this.gl.COMPILE_STATUS)) {
      console.error('Vertex shader hasn\'t been initialized');
    }
  }

  _initFragmentShader() {
    this.fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(this.fragmentShader, this.fragmentShaderSource);
    this.gl.compileShader(this.fragmentShader);

    if (!this.gl.getShaderParameter(this.fragmentShader, this.gl.COMPILE_STATUS)) {
      console.error('Fragment shader hasn\'t been initialized');
    }
  }

  _initWebGL() {
    if (!this.gl && this.canvas) {
      this.gl = this.canvas.getContext('webgl') ||
        this.canvas.getContext('experimental-webgl');
    }
  }

  _initShaders() {
    this._initFragmentShader();
    this._initVertexShader();

    this.shaderProgram = this.gl.createProgram();
    this.gl.attachShader(this.shaderProgram, this.vertexShader);
    this.gl.attachShader(this.shaderProgram, this.fragmentShader);
    this.gl.linkProgram(this.shaderProgram);

    if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
      console.error("Unable to initialize the shader program.");
    }

  }
}

