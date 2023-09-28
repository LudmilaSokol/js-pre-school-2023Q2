/* переменные */
let search = 'cats';
const mainContainer = document.querySelector('.main__container');


const url = `https://api.unsplash.com/search/photos?query=${search}&per_page=8&orientation=landscape&client_id=wwbO_U0CdwVsuxSoLyZ0-93ZEdx134rB_mwV4RoiPec`;

/* функции */

// получаем данные с сервера
async function getData() {
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
    showData(data);
  }
  getData();


  //отображение данных на странице
  function showData(data) {
    let data1;
    let src;
    let alt;
    data1 = data.results.map(function(item, index, data) {
        src = item.urls.regular;
        console.log (src);
        alt = item.alt_description;
        console.log (alt);
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

//   showData(data);