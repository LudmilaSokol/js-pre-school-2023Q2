/* переменные и константы */
let countScore = document.querySelector('.count-score');
const btnStart = document.querySelector('.start');

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

// счетчик еды/баллов
let countFood = 0;

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

  //перемещение змейки
  moveSnake ();

  //змейка
  drawSnake ();
}

//вызов изображения до старта игры
let game = setTimeout(draw, 230);

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
    ctx.fillStyle = i === 0 ? '#4e2424' : '#b01919';
    //закрашиваем звенья змейки
    ctx.fillRect(snake[i].x, snake[i].y, cellSize, cellSize);
  }
}
//определяем какие клавиши нажаты
function direction (event) {
 if (event.keyCode === 37 && dir !== 'right') {
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
  // положение головы
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX === food.x && snakeY === food.y) {
    //увеличиваем счетчик еды
    countFood = countFood + 1;
    countScore.textContent = countFood;
    console.log (countFood);
    //поясляется новая еда
    food = {
      x : Math.floor((Math.random() * cellCountX)) * cellSize,
      y : Math.floor((Math.random() * cellCountY)) * cellSize
    }
  } else {
      //удаляем последний элемент змейки
      snake.pop();
  }
  // перемещаем змейку

  //меняем координаты головы в зависимости от нажатой клавиши
  if (dir === 'left') {snakeX = snakeX - cellSize};
  if (dir === 'right') {snakeX = snakeX + cellSize};
  if (dir === 'up') {snakeY = snakeY - cellSize};
  if (dir === 'down') {snakeY = snakeY + cellSize};

  //проверка положения головы змейки (не должна выходить за границу поля, иначе конец игры)
  if (snakeX < 0 || snakeX > (cellCountX-1) * cellSize || snakeY < 0 || snakeY > (cellCountY-1) * cellSize) {
    clearInterval (game);
    alert(' конец игры ');
  }

  //создаем элемент для головы массива с новыми координатами
  let newHead = {
    x : snakeX,
    y : snakeY
  }

  //проверяем не пытается ли змейка съесть себя
  eatYourself (newHead, snake);

  //добавляем новый  элемент в начало массива змейки
  snake.unshift(newHead);
}

//проверка на поедение змейки самой себя
function eatYourself (head, arrSnake) {
  for (let i = 1; i < arrSnake.length; i++) {
    if (head.x === arrSnake[i].x && head.y === arrSnake[i].y) {
      console.log (' съела себя');
      clearInterval (game);
      alert(' конец игры ');
    }
  }
}

/* обработчики событий */

//запуск игры при клике на кнопку start
btnStart.addEventListener('click', () => {
  if (btnStart.innerHTML === 'Start') {
    game = setInterval(draw, 230);
    //отслеживает нажатие клавиш на клавиатуре после старта игры
    document.addEventListener('keydown', direction);
    //кнопка start меняется на pause
    btnStart.textContent = 'Pause';
  } else {
    clearInterval (game);
    btnStart.textContent = "Start";
  }
})
