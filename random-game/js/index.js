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

//направление движения (зависит от нажатой клавиши)
let dir;

  //закрашиваем игровое поле
  ctx.fillRect (0, 0, canvas.width, canvas.height);


/* функции */

//рисуем элементы игры
function draw () {
  //очистка области перед прорисовкой (стирает предыдущий рисунок)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //рисуем ячейки игрового поля
  drawCells ();

  //еда
  drawFood ();

  //змейка
  drawSnake ();

  //перемещение змейки
  moveSnake ();
}

//вызов функции с указанной периодичностью
let game = setInterval(draw, 150);

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
//определяем какие клавиши нажаты
function direction (event) {
 if (event.keyCode === 37 && dir !== 'ridht') {
  dir = 'left';
 } else if (event.keyCode === 38 && dir !== 'down') {
  dir = 'up';
 } else if (event.keyCode === 39 && dir !== 'left') {
  dir = 'right';
 } else if (event.keyCode === 40 && dir !=='up') {
  dir = 'down';
 }
}
//перемещение змейки
function moveSnake () {
  //положение головы
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //удаляем последний элемент змейки
  snake.pop();

  //меняем координаты головы в зависимости от нажатой клавиши
  if (dir === 'left') {snakeX = snakeX - cellSize};
  if (dir === 'right') {snakeX = snakeX + cellSize};
  if (dir === 'up') {snakeY = snakeY - cellSize};
  if (dir === 'down') {snakeY = snakeY + cellSize};
  //создаем элемент для головы массива с новыми координатами
  let newHead = {
    x : snakeX,
    y : snakeY
  }
  //добавляем новый  элемент в начало массива змейки
  snake.unshift(newHead);
}


/* обработчики событий */
//отслеживает нажатие клавиш на клавиатуре
document.addEventListener('keydown', direction);
