import './variable.js';

/* переменные и константы */
const apiKey = window.env.API_KEY;
let searchUser = document.querySelector('.input__search'); //строка поиска
const btn = document.querySelector('.btn'); //кнопка
const mainContainer = document.querySelector('.main__container');
const form = document.querySelector('.form__search');

//начальные значения
let search = 'cats';
let url = `https://api.unsplash.com/search/photos?query=${search}&per_page=8&orientation=landscape&client_id=${apiKey}`;


/* функции */

// получаем данные с сервера
async function getData(url) {
  mainContainer.innerHTML = '';
    const response = await fetch(url);
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    showData(data);
}

getData(url);


//отображение данных на странице
function showData(data) {
  let data1;
  let src;
  let alt;
  data1 = data.results.map(function(item, index, data) {
      src = item.urls.regular;
      // console.log (src);
      alt = item.alt_description;
      // console.log (alt);
      createCard(src, alt);
  })
  return data1;
}
//оздать карточку для галереи
function createCard(src, alt) {
  const card = document.createElement('div');
  card.classList.add('card');
  const img = document.createElement('img');
  img.classList.add('card__img');
  img.src = `${src}`;
  img.alt = `${alt}`;
  card.append(img);
  mainContainer.append(card);
}
//заменяем кнопку поиска на кнопку закрыть
function showCloseButton() {
  btn.classList.remove('btn__search');
  btn.classList.add('btn__close');
}

/* обработчик событий */

form.addEventListener('submit', (event) => {
  event.preventDefault();
  search = searchUser.value;
  const apiUrl = `https://api.unsplash.com/search/photos?query=${search}&per_page=8&orientation=landscape&client_id=${apiKey}`;
  if (search) {
    getData(apiUrl);
    showCloseButton();
  }
})


btn.addEventListener('click', (e) => {
  search = searchUser.value;
  const apiUrl = `https://api.unsplash.com/search/photos?query=${search}&per_page=8&orientation=landscape&client_id=${apiKey}`;
  if (btn.classList.contains('btn__close')) {
    btn.classList.add('btn__search');
    btn.classList.remove('btn__close');
    searchUser.value = '';
  } else  if (search) {
    getData(apiUrl);
    showCloseButton();
  }
});