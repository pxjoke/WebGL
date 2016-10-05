import WebGLLab1 from './lab1/WebGLLab1';
(function (document) {
  let fragmentShaderText = document.getElementById('shader-fs').text;
  let vertexShaderText = document.getElementById('shader-vs').text;
  console.log(`vertex: ${vertexShaderText}`);
  console.log(`fragment: ${fragmentShaderText}`);
  let webGLLab1 = new WebGLLab1('glcanvas', vertexShaderText, fragmentShaderText);
  webGLLab1.drawScene();
})(document);


