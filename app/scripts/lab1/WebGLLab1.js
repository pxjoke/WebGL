import WebGLBase from '../WebGLBase';

export default class WebGLLab1 extends WebGLBase {
  constructor(canvasId, vertexShaderText, fragmentVertexText) {
    super(canvasId, vertexShaderText, fragmentVertexText);
    this.aspect = this.canvas.width / this.canvas.height;
    console.log(`Canvas Width: ${this.canvas.width}`);
    console.log(`Canvas Height: ${this.canvas.height}`);
    console.log(`Aspect: ${this.aspect}`);
    this._prepare();
  }


  _prepare() {
    if (this.gl) {
      this.gl.clearColor(0.282, 0.239, 0.545, 1.0);
      this.gl.enable(this.gl.DEPTH_TEST);
      this.gl.depthFunc(this.gl.LEQUAL);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
  }

  drawScene() {
    // Получим местоположение переменных в программе шейдеров
    var vertexBuffer = this.gl.createBuffer();
    var vertices = [
      // Передняя грань
      -1, -1, -1,
      1, -1, -1,
      -1, -1, 1,

      1, -1, 1,
      -1, -1, 1,
      1, -1, -1,

      // Задняя грань
      -1, 1, -1,
      -1, 1, 1,
      1, 1, -1,

      1, 1, 1,
      1, 1, -1,
      -1, 1, 1,

      // Нижняя грань
      -1, -1, -1,
      -1, 1, -1,
      1, -1, -1,

      1, 1, -1,
      1, -1, -1,
      -1, 1, -1,

      // Верхняя грань
      -1, -1, 1,
      1, -1, 1,
      -1, 1, 1,

      1, 1, 1,
      -1, 1, 1,
      1, -1, 1,

      // Левая грань
      -1, -1, -1,
      -1, -1, 1,
      -1, 1, -1,

      -1, 1, 1,
      -1, 1, -1,
      -1, -1, 1,

      // Правая грань
      1, -1, -1,
      1, 1, -1,
      1, -1, 1,

      1, 1, 1,
      1, -1, 1,
      1, 1, -1
    ];
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

    var colorBuffer = this.gl.createBuffer();
    var colors = [
      // Передняя грань
      0, 0.7, 0.9,
      0, 0.7, 0.9,
      0, 0.7, 0.9,
      0, 0.7, 0.9,
      0, 0.7, 0.9,
      0, 0.7, 0.9,

      // Задняя грань
      1, 0.5, 0.5,
      1, 0.5, 0.5,
      1, 0.5, 0.5,
      1, 0.5, 0.5,
      1, 0.5, 0.5,
      1, 0.5, 0.5,

      // Нижняя грань
      0.5, 0.7, 1,
      0.5, 0.7, 1,
      0.5, 0.7, 1,
      0.5, 0.7, 1,
      0.5, 0.7, 1,
      0.5, 0.7, 1,

      // Верхняя грань
      0.5, 0.7, 1,
      0.5, 0.7, 1,
      0.5, 0.7, 1,
      0.5, 0.7, 1,
      0.5, 0.7, 1,
      0.5, 0.7, 1,

      // Левая грань
      0.3, 1, 0.3,
      0.3, 1, 0.3,
      0.3, 1, 0.3,
      0.3, 1, 0.3,
      0.3, 1, 0.3,
      0.3, 1, 0.3,

      // right face
      0.3, 1, 0.3,
      0.3, 1, 0.3,
      0.3, 1, 0.3,
      0.3, 1, 0.3,
      0.3, 1, 0.3,
      0.3, 1, 0.3
    ];
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW);

    mat4.perspective(this.pMatrix, 0.785, this.aspect, 0.1, 1000);
    mat4.translate(this.pMatrix, this.pMatrix, [0, 0, -10]);

    var lastRenderTime = Date.now();
    var that = this;

    function render() {
      // Запрашиваем рендеринг на следующий кадр
      requestAnimationFrame(render);

      // Получаем время прошедшее с прошлого кадра
      var time = Date.now();
      var dt = lastRenderTime - time;

      // Вращаем куб относительно оси Y
      mat4.rotateY(that.mvMatrix, that.mvMatrix, dt / 1000);
      // Вращаем куб относительно оси Z
      mat4.rotateZ(that.mvMatrix, that.mvMatrix, dt / 1000);

      // Очищаем сцену, закрашивая её в белый цвет
      that.gl.clearColor(0.282, 0.239, 0.545, 1.0);
      that.gl.clear(that.gl.COLOR_BUFFER_BIT | that.gl.DEPTH_BUFFER_BIT);

      // Включаем фильтр глубины
      that.gl.enable(that.gl.DEPTH_TEST);

      that.gl.bindBuffer(that.gl.ARRAY_BUFFER, vertexBuffer);
      that.gl.vertexAttribPointer(that.shaderProgram.vertexPositionAttribute, 3, that.gl.FLOAT, false, 0, 0);

      that.gl.bindBuffer(that.gl.ARRAY_BUFFER, colorBuffer);
      that.gl.vertexAttribPointer(that.shaderProgram.vertexColorAttribute, 3, that.gl.FLOAT, false, 0, 0);

      that._applyMatrixUniforms();

      that.gl.drawArrays(that.gl.TRIANGLES, 0, 36);

      lastRenderTime = time;
    }
    render();
  }
}
