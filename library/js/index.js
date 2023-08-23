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

/* слайдер в favorites */
const radioBtns = document.querySelectorAll('.form-radio-text');
const booksBoxs = document.querySelectorAll('.favorites-items-box');

radioBtns.forEach((item, index) => {
 item.addEventListener('click', () => {
  /* для всех элементов категорий карточек устанавливаем класс (не показывать) */
  for (let item of booksBoxs) {
    item.classList.add('hidden');
  }
  /* показываем текущую категорию карточек */
  booksBoxs[index].classList.remove('hidden');
 })
})


console.log('Task: Library#2 - Адаптивная вёрстка 50/50');
console.log('1. Вёрстка соответствует макету. Ширина экрана 768px 26/26');