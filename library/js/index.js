/* burger handler */
  const burgerItem = document.querySelector('.header-burger');
  const menu = document.querySelector('.header-list');
  const triggerItem = document.querySelector('.header-trigger');
  const linkHeaderItem = document.querySelectorAll('.header-items .link');

  /*отслеживет клик по .header-trigger, добавляются\удаляются классы
  для отображения адаптивного меню*/
  triggerItem.addEventListener('click', () => {
    menu.classList.toggle('header-list-active');
    burgerItem.classList.toggle('open');
  })

  /*перебирает все пункты адаптивного меню,  отслеживает клик по пункту адаптивного меню и при переходе
  по ссылке закрывает адаптивное меню*/
  for (let i = 0, length = linkHeaderItem.length; i < length; i++) {
      linkHeaderItem[i].addEventListener('click', () => {
        menu.classList.remove('header-list-active');
        burgerItem.classList.remove('open');
    })
  }

 /*отслеживает событие клика в документе*/
  document.addEventListener('click', (event) => {
    /*массив объектов, на которых произойдет событие (отразится Клик),
     проверка наличия в этом массиве элемента menu, если значение true,
     то клик выполнен по меню*/
    const clickMenu = event.composedPath().includes(menu);
    //если клик выполнент по trigger, то значение true
    const clickToggle = event.composedPath().includes(triggerItem);
    /* если клик вне триггера и меню (оба значения false),
     то классы отображения адаптивного меню удаляются*/
    if (!clickMenu && !clickToggle) {
      menu.classList.remove('header-list-active');
      burgerItem.classList.remove('open');
    }
  })

  /*при увеличении размера экрана больше 1110px закрывается
   открытое адаптивное меню*/
  window.addEventListener('resize', (event) => {
    const width= document.body.clientWidth;

    if (width > 1110) {
      menu.classList.remove('header-list-active');
      burgerItem.classList.remove('open');
    }
  })

  /* кэширование изображений слайдера */
  function preloadSummerImages() {
    for(let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/about/image-${i}.jpg`;
    }
  }
  preloadSummerImages();



/* карусель в about */

/* поиск стрелок навигации */
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
/* массив кнопок пагинации */
const btmsPagination = document.querySelectorAll('.about-pagination-inner-item');
/* контейнер для карусели */
const carouselBox = document.querySelector(".about-carousel-box");
/* значение left  для carouselBox */
let position = 0;
/* индекс текущего слайда (для сопоставления с кнопками) */
let indexItem = 0;

/* переход на след. слайд (сдвиг справа налево) */
const nextItem = () => {
  arrowLeft.classList.remove('disabled');
  if (position < (btmsPagination.length - 2) * 475) {
    position = position + 475;
    indexItem ++;
    carouselBox.style.left = -position + 'px';
  } else if (position < (btmsPagination.length - 1) * 475) {
    position = position + 475;
    indexItem ++;
    carouselBox.style.left = -position + 'px';
    arrowRight.classList.add('disabled');
  }
  activeBtn(indexItem);
}

/* слушаем клик по стрелке вправо и применяем функцию сдвига вправо*/
arrowRight.addEventListener('click', nextItem);

/* переход на предыдущий слайд (сдвиг слева направо) */
const prevItem = () => {
  arrowRight.classList.remove('disabled');
  if (position > 475) {
    position = position - 475;
    indexItem --;
    carouselBox.style.left = -position + 'px';
  } else if (position > 0){
    position = position - 475;
    indexItem --;
    carouselBox.style.left = -position + 'px';
    arrowLeft.classList.add('disabled');
  }
  activeBtn(indexItem);
}

/* слушаем клик по стрелке влево и применяем функцию сдвига влево*/
arrowLeft.addEventListener('click', prevItem);


/* перелистываем слайды по кнопкам */
btmsPagination.forEach((btnItem, indexItem) => {
  btnItem.addEventListener('click', () => {
    if (indexItem > 0) {
      if (btmsPagination[indexItem - 1].classList.contains('active') || btmsPagination[indexItem + 1].classList.contains('active')) {
        position = 475 * indexItem;
        carouselBox.style.left = -position + 'px';
        activeBtn(indexItem);
      }
    } else {
      if (btmsPagination[indexItem + 1].classList.contains('active')) {
        position = 475 * indexItem;
        carouselBox.style.left = -position + 'px';
        activeBtn(indexItem);
      }
    }
  })
})

/* выделяем активную кнопку по номеру */
const activeBtn = (indexItem) => {
  /* для всех элементов кнопок удаляем класс active, если такой есть */
  for (let btnItem of btmsPagination) {
    btnItem.classList.remove('active');
  }
  /* текущей кнопке добавить класс active */
  btmsPagination[indexItem].classList.add('active');
}

console.log('Task: Library#2 - Адаптивная вёрстка 50/50');
console.log('1. Вёрстка соответствует макету. Ширина экрана 768px 26/26');
console.log(' - блок <header> 2/2. \n - секция Welcome 2/2 \n - секция About 2/2. Обратите внимание на появление новых элементов в виде стрелок. \n - секция About. Если под картинкой находится 5 точек: 2/2. \n Не нужно менять расстояние от картинки до точек, нужно оставить 40px. Оценку не снижаем, если сделано по макету (25px). \n - секция Favorites 2/2. \n Сделать кнопку own, вместо buy для последней книги. Здесь важно будет соблюсти условие, что, какие кнопки находились в состояние "own" на Desktop, те же кнопки в том же состоянии будут и на Tablet. Если условие соблюдено: 2/2 \n - секция CoffeShop 4/4 \n Оценка снижаться не будет, если при наложении текста, не будет совпадать расположение букв, расстояние между символами, начало и конец строки, а так же орфография. Будут оцениваться межстрочный интервал, шрифт и центрирование блока с текстом по общим правилам. \n - секция Contacts 4/4 \n - секция LibraryCard 4/4 \n - блок <footer> 2/2');

console.log('2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется 12/12');
console.log(' - нет полосы прокрутки при ширине страницы от 1440рх до 640рх 4/4. \n - элементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх 4/4. \n - элементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх 4/4. Например, меню в хедере должно преобразоваться в бургер-меню до того, как элементы начнут наезжать друг на друга. \n - все что будет происходить на ширине свыше 1440px - не оценивается. Поэтому можно либо растягивать на весь экран, либо оставить центральной колонкой');

console.log('3. На ширине экрана 768рх реализовано адаптивное меню 12/12');
console.log('Если при ширине страницы в 768рх панель навигации не скрыта, а бургер-иконка не появилась (при этом учитывайте "Особенности проверки адаптивности в DevTools"), то ставим 0 за данный пункт, и дальше его не проверяем. Иначе: \n - Версия Tablet, отступ иконки юзера от правого края - 105px. Такое же расстояние надо сделать и у открытого меню (сейчас там 92px). Сам крест желательно отцентрировать по поцентральной позиции бургер-иконки. Чтобы при переходе из одного состояния в другое ничего не прыгало. Само меню нужно прижать к правому краю целиком. Если иконка юзера не прыгает (не меняет позиции при открытии меню), независимо от величины отступа: 2/2 \n - Цвет выпавшего меню должен совпадать с цветом полоски навигации. Оценка снижаться не будет, если сделано по первому макету (#000000). \n - при нажатии на бургер-иконку плавно появляется адаптивное меню 4/4 \n - при нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран 4/4 \n - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям при нажатии, а само адаптивное меню при этом плавно скрывается 2/2 \n - размеры открытого бургер-меню соответствуют макету, так же открытое бургер-меню проверяется на PixelPerfect 2/2');
