/* переменные и константы */
let body = document.querySelector('.body');
const player = document.querySelector('.player');
let audio = document.getElementById('audio');
let progressBox = document.querySelector('.player__progress');
let time = document.querySelector('.time');

const btnPlay = document.querySelector('.play');
const btnPause = document.querySelector('.pause');
const btnBackward = document.querySelector('.backward');
const btnForvard = document.querySelector('.forward');

let autor = document.querySelector('.autor-song');
let title = document.querySelector('.title-song');
let img = document.querySelector('.player__img');

/* массив с названиями песен */
const playList = [
  'beyonce.mp3',
  'dontstartnow.mp3'
];
const autorList = ['Beyonce', 'Dua Lipa'];

let treck = 0; //индекс трека

/* функции */

function loadTreck () {
  audio.src = 'assets/audio/' + playList[treck];
  autor.innerHTML = autorList[treck];
  img.src = `assets/img/img${treck}.png`;
  body.style.background = `linear-gradient(rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5)), url(assets/img/img${treck}.png), no-repeat`;
  body.style.backgroundSize = 'cover';
}

loadTreck (playList[treck]);

function playTrack () {
  btnPause.classList.remove('hidden');
  btnPlay.classList.add('hidden');
  img.classList.add('active');
  audio.play();
}

function pauseTrack () {
  btnPause.classList.add('hidden');
  btnPlay.classList.remove('hidden');
  img.classList.remove('active');
  audio.pause();
}

// переключение на предыдущий трек

function nextTrack () {
  treck++;
  if (treck > playList.length - 1) {
    treck = 0;
  }
  loadTreck (playList[treck]);
  playTrack ();
}

// переключене на следующий трек

function prevTrack () {
  treck--;
  if (treck < 0) {
    treck = playList.length - 1;
  }
  loadTreck (playList[treck]);
  playTrack ();
}

// шкала прогресса прогрывания трека

function updateProgress (event) {
  //console.log(event.srcElement); //елемент audio, можно посмотреть свойства
  // Получаем значение на какой секунде песня
  let audioTime = audio.currentTime;
  // Получаем всё время песни (длинну трека)
  let audioLength = audio.duration;
  // console.log(audioTime);
  // console.log(audioLength);

  // процент прогресса
  const progressPercent = (audioTime / audioLength) * 100;

  //переменной програсса присвазиваем значение меняя ширину
  time.style.width = `${progressPercent}%`;
}

// перемотка
function rewindProgress (event) {
  //ширина контейнера прогресса
  const widthEvent = this.clientWidth;
  console.log(widthEvent);

  //координаты клика про шкале
  const clickX = event.offsetX;
  console.log(clickX);

  //длинна трека
  const audioLength = audio.duration;

  audio.currentTime = (clickX / widthEvent) * audioLength;

};


/* обработчик событий */

btnPlay.addEventListener('click', () => {
  playTrack ();
})

btnPause.addEventListener('click', () => {
  pauseTrack ();
})

//событие клика по кнопке вправо
btnForvard.addEventListener('click', nextTrack);

//событие клика по кнопке влево
btnBackward.addEventListener('click', prevTrack);

// событие проигрывания аудиотрека
audio.addEventListener('timeupdate', updateProgress);

// событие перемотки трека по клику на шкале прогресса
progressBox.addEventListener ('click', rewindProgress);