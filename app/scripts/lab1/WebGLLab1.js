import WebGLBase from '../WebGLBase';

export default class WebGLLab1 extends WebGLBase {
  constructor(canvasId, vertexShaderText, fragmentVertexText) {
    super(canvasId, vertexShaderText, fragmentVertexText);

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
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Инициализация данных
    let vertexBuffer = this.gl.createBuffer();
    let vertices = [0, 0, 0, 0.5, 1, 0, 1, 0, 0];

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

    let colorBuffer = this.gl.createBuffer();
    let colors = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW);

// Получим местоположение переменных в программе шейдеров
    let uPosition = this.gl.getUniformLocation(this.shaderProgram, 'u_position');
    let aPosition = this.gl.getAttribLocation(this.shaderProgram, 'a_position');
    let aColor = this.gl.getAttribLocation(this.shaderProgram, 'a_color');

// Укажем какую шейдерную программу мы намерены далее использовать
    this.gl.useProgram(this.shaderProgram);

// Передаем в uniform-переменную положение треугольника
    this.gl.uniform3fv(uPosition, [0, 0, 0]);

// Связываем данные цветов
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
    this.gl.enableVertexAttribArray(aColor);
// Вторым аргументом передаём размерность, RGB имеет 3 компоненты
    this.gl.vertexAttribPointer(aColor, 3, this.gl.FLOAT, false, 0, 0);

// И вершин
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.enableVertexAttribArray(aPosition);
    this.gl.vertexAttribPointer(aPosition, 3, this.gl.FLOAT, false, 0, 0);

// Очищаем сцену, закрашивая её в белый цвет
    this.gl.clearColor(0.282, 0.239, 0.545, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

// Рисуем треугольник
// Третьим аргументом передаём количество вершин геометрии
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
  }
}
