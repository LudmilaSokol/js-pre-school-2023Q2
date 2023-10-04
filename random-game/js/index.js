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
//переменная для изображения еды
let foodImg = new Image();
foodImg.src = "assets/svg/food_1.svg";
//координаты еды
let food = {
  x : Math.floor((Math.random() * cellCountX)) * cellSize,
  y : Math.floor((Math.random() * cellCountY)) * cellSize
}
//массив для элемента змея
let snake = [];
//голова змейки
snake[0] = {
  x : Math.floor((cellCountX * cellSize) / 2),
  y : Math.floor((cellCountY * cellSize) / 2)
}

//закрашиваем игровое поле
ctx.fillRect (0, 0, canvas.width, canvas.height);
//рисуем ячейки игрового поля
drawCells ();


//рисуем элементы игры
function draw () {
  //еда
  drawFood ();

  //змейка
  drawSnake ();
}

//вызов функции с указанной периодичностью
let game = setInterval(draw, 100);

// рисуем ячейки игрового поля
function drawCells () {
	for (var i = 0; i < cellCountX; i++)
		for (var j = 0; j < cellCountY; j++)
			// рисуем ячейку
      ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
}
// рисуем еду
function drawFood () {
  //разместить изображение в клетке случайным образом
    ctx.drawImage(foodImg, food.x + 2, food.y + 3);
}

//рисуем змейку
function drawSnake () {
  for (let i = 0; i < snake.length; i++) {
    //цвет заливки
    ctx.fillStyle = 'red';
    //закрашиваем звенья змейки
    ctx.fillRect(snake[i].x, snake[i].y, cellSize, cellSize);
  }
}

