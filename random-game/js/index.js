/* переменные и константы */
let countScore = document.querySelector('.count-score');
const btnStart = document.querySelector('.start');
const btnRules = document.querySelector('.rules');
const btnClose = document.querySelector('.btn-close');
const popupRules = document.querySelector('.pop-up__rules');
const countTimeGame = document.querySelector('.time__game');
const countFoods = document.querySelector('.count-food');
const gameOver = document.querySelector('.pop-up__game-over');
const btnCloseGameOver = document.querySelector('.btn-close__game-over');
const modalGameOver = document.querySelector('.game-over');
const table = document.querySelector('.table__results')

// const results = {};
let key;

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

//время игры
let startTime,
  endTime,
  timeGameMs = 0,
  timeGame;

//закрашиваем игровое поле
ctx.fillRect (0, 0, canvas.width, canvas.height);

//вызов изображения до старта игры
let game = setTimeout(draw, 230);

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
  }  else if (event.keyCode === 38 && dir !== 'down') {
    dir = 'up';
  }  else if (event.keyCode === 39 && dir !== 'left') {
    dir = 'right';
  }  else if (event.keyCode === 40 && dir !=='up') {
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
    //появляется новая еда
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
    finishGame ();
    // console.log('за пределами')
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
      finishGame ();
    }
  }
}

//завершение игры и вывод результатов
function finishGame () {
  clearInterval (game);

  // alert(' конец игры ');
  endTime = new Date();
  // console.log (endTime);
  timeGameMs = timeGameMs + (endTime - startTime);
  // console.log(timeGameMs)
  let hours = Math.floor(timeGameMs / 60000 / 60);
  let minutes = Math.floor(timeGameMs / 60000);
  let sec = Math.floor((timeGameMs / 1000) % 60);

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (sec < 10) {
    sec = `0${sec}`;
  }

  timeGame = `${hours} : ${minutes} : ${sec}`;
  // console.log (timeGame);
  // console.log (countFood)

  //выводим значения в модальном окне завершения игры
  countTimeGame.textContent = timeGame;
  countFoods.textContent = countFood;

  //сохраняем значения в массиве
  key = endTime
  // lengthResults = localStorage.length + 1;
  // console.log(lengthResults);
  // results[lengthResults] = {
  //   'Time Game' : `${timeGame}`,
  //   'Score' : `${countFood}`
  // }

  //передать данные в локал сторадж
  localStorage.setItem(endTime, JSON.stringify({
    'Time Game' : `${timeGame}`,
    'Score' : `${countFood}`
  }));

  //выгрузить результирующие данные из Локал сторадж
  creatingTable ();

  //показать модальное окно завершения игры
  gameOver.classList.remove('close');
}

//рестарт игры после закрытия модального окна game over
function startGame () {
//очищаем массив змейки
snake = [];
//голова змейки
snake[0] = {
  x : Math.floor((cellCountX * cellSize) / 2),
  y : Math.floor((cellCountY * cellSize) / 2)
}

// обнуляем значение направления движения
dir = '';
// счетчик еды/баллов
countFood = 0;

countScore.textContent = countFood;

//время игры
timeGameMs = 0;
// timeGame = 0;
btnStart.textContent = "Start";
}

//выгрузка массива из local storage
function getTable (){
  //выгружаем массив из локал стородж
  let res = {};
  let key1;
  let min;
  //удаляем из локал сторадж самую старую запись, если количество элементов больше 10
  //запомнить min key и удалить
  if (localStorage.length > 11) {
    min = localStorage.key(0);
    for (let i = 1; i < localStorage.length; i++) {
      if (localStorage.key(i) < min) {
        min = localStorage.key(i);
      }
    console.log(min);
    }
    // Удаляем элемент из локал сторадж
    delete localStorage[min];
  }

  for (let i = 0; i < localStorage.length; i++) {
    key1 = localStorage.key(i);
    // console.log(key1);
    res[key1] = JSON.parse(localStorage.getItem(key1));
    // console.log(res[key1]);
  }
  return res;
}
//создаем таблицу
function creatingTable () {
  //получаем массив из локал сторадж
  let results = getTable ();
  //создаем таблицу результатов

  //заголовок таблицы
  let tr = document.createElement('tr');
  let th1 = document.createElement('th');
  let th2 = document.createElement('th');

  th1.textContent = 'Time Game';
  th2.textContent = 'Score';
  th1.style.width = '150px';
  th2.style.width = '150px';

  tr.appendChild(th1);
  tr.appendChild(th2);
  table.appendChild(tr);

  for (let j = 1; j < localStorage.length; j++) {
    let key = localStorage.key(j);

    tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');

    td1.style.width = '150px';
    td2.style.width = '150px';
    td1.style.textAlign = 'center';
    td2.style.textAlign = 'center';

    td1.textContent = results[key]['Time Game'];
    // console.log (results[key]['Time Game']);

    td2.textContent = results[key]['Score'];

    tr.appendChild(td1);
    tr.appendChild(td2);

    table.appendChild(tr);
  }
}

/* обработчики событий */

//запуск игры при клике на кнопку start
btnStart.addEventListener('click', () => {
  if (btnStart.innerHTML === 'Start') {
    game = setInterval(draw, 230);

    //старт времени игры
    startTime = new Date();
    // console.log (startTime)
    //отслеживает нажатие клавиш на клавиатуре после старта игры
    document.addEventListener('keydown', direction);
    //кнопка start меняется на pause
    btnStart.textContent = 'Pause';
  } else  if (btnStart.innerHTML === 'Pause') {
    clearInterval (game);
    btnStart.textContent = "Start";
    //останавливаем время на период паузы и запоминаем значение
    endTime = new Date();
    timeGameMs = timeGameMs + (endTime - startTime);
    }
})
//открыть окно с правилами игры
btnRules.addEventListener('click', () => {
  popupRules.classList.remove('close');
})

//закрыть модальное окно кнопкой close
btnClose.addEventListener('click', () => {
    popupRules.classList.add('close');
  })

//закрытваем окно результатов окончания игры и restart игры
btnCloseGameOver.addEventListener('click', () => {
  gameOver.classList.add('close');
  //перерисовать стартовое поле
  startGame();
  //очистить таблицу результатов в модальном окне
  while (table.firstChild) {
    table.removeChild(table.firstChild);
}
})