/* переменные и константы */
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
//кол-во колонок
let cellCountX = 20;
//кол-во строк
let cellCountY = 14;
//размер ячейки
let cellSize = (canvas.width) / cellCountX;
//высота изображения
canvas.height = cellCountY * cellSize;
//цвет линий
ctx.strokeStyle = '#957474';
//ширина линий
// ctx.lineWidth = 1;
//цвет заливки
ctx.fillStyle = '#cb9898';
//создаем объект еды
let foodImg = new Image();
foodImg.src = "assets/svg/food_1.svg";


//рисуем элементы игры
function draw() {
	//закрашиваем весь прямоугольник
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //рисуем ячейки игрового поля
	drawCells();
  drawFood();
}
//вызов функции с указанной периодичностью
let game = setInterval(draw, 100);

// рисуем ячейки игрового поля
function drawCells() {
	for (var i = 0; i < cellCountX; i++)
		for (var j = 0; j < cellCountY; j++)
			// рисуем ячейку
      ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
}
// рисуем еду
function drawFood() {
  //разместить изображение в клетке случайным образом
    ctx.drawImage(foodImg, 2, 2);
}

