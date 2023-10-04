/* переменные и константы */
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
//кол-во колонок
let cellCountX = 30;
//кол-во строк
let cellCountY = 20;
//размер ячейки
let cellSize = (canvas.width) / cellCountX;
canvas.height = cellCountY * cellSize;
console.log (cellSize);
//цвет линий
ctx.strokeStyle = '#957474';
//ширина линий
// ctx.lineWidth = 1;
//цвет заливки
ctx.fillStyle = '#cb9898';




//рисуем элементы игры
function draw() {
	//закрашиваем весь прямоугольник
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //рисуем ячейки игрового поля
	drawCells();
}
draw()

// рисуем ячейки игрового поля
function drawCells() {
	for (var i = 0; i < cellCountX; i++)
		for (var j = 0; j < cellCountY; j++)
			// рисуем ячейку
      ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
}
