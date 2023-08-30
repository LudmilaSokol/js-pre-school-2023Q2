/* burger handler */
  const burgerItem = document.querySelector('.header-burger');
  const menu = document.querySelector('.header-list');
  const triggerItem = document.querySelector('.header-trigger');
  const linkHeaderItem = document.querySelectorAll('.header-items .link');

  /* профиль, авторизация */
  const iconUser = document.querySelector('.header-icon');
  // 2 элемента
  const dropMenu = document.querySelectorAll('.drop-menu');



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

    //адаптивное меню
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

    //меню авторизации
    const clickDropMenu = event.composedPath().includes(dropMenu[0]);
    const clicIconUser = event.composedPath().includes(iconUser);
    if (!clickDropMenu && !clicIconUser) {
      dropMenu[0].classList.add('profile-no-aut');
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
    for(let i = 1; i <= 5; i++) {
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
      item.classList.add('hidden')
  };
  /* показываем текущую категорию карточек */
  booksBoxs[index].classList.remove('hidden');
 })
})





/* авторизация, регистрация */

/* открытие меню до авторизации при клике на иконку с профилем пользователя */
iconUser.addEventListener('click', () => {
  dropMenu[0].classList.remove('profile-no-aut');
})

  /* кнопки для вызова окна регистрации (массив из 3х кнопок) */
  const regWindows = document.querySelectorAll('.reg');
  /* массив из 2х элементов: log-in - 0, register - 1*/
  const modalWindows = document.querySelectorAll('.pop-up');

/* открытие окна регистрации */
regWindows.forEach((item) => {
  item.addEventListener('click', () => {
    modalWindows[1].classList.remove('hidden');
    modalWindows[1].firstElementChild.classList.remove('hidden');
    modalWindows[0].classList.add('hidden');
    modalWindows[0].firstElementChild.classList.add('hidden');
    dropMenu[0].classList.add('profile-no-aut');
  })
})

/* открытие окна авторизации */
//находим все кнопки вызова окна авторизации
const loginWindows = document.querySelectorAll('.login-btn');

loginWindows.forEach((item) => {
  item.addEventListener('click', () => {
    modalWindows[0].classList.remove('hidden');
    modalWindows[0].firstElementChild.classList.remove('hidden');
    modalWindows[1].classList.add('hidden');
    modalWindows[1].firstElementChild.classList.add('hidden');
    dropMenu[0].classList.add('profile-no-aut');
  })
})


  // определяем все кнопки Закрыть (4 кнопки - 4 окна)
  const closeBtn = document.querySelectorAll('.modal-close');

  /* закрытие pop-up */
  modalWindows.forEach((event, index) => {
    modalWindows[index].addEventListener('click', (event) => {
      const clickModal = event.composedPath().includes(modalWindows[index].firstElementChild);
      if (!clickModal) {
        modalWindows[index].classList.add('hidden');
        modalWindows[index].firstElementChild.classList.add('hidden');
      }
    })
    closeBtn[index].addEventListener('click', () => {
      modalWindows[index].classList.add('hidden');
      modalWindows[index].firstElementChild.classList.add('hidden');
    })
  })



/* проверка валидации */
/* форма регистрации */
let modalForm = document.querySelector('.modal-form');
/* форма авторизации */
let modalForm1 = document.querySelector('.modal-form1');

function validation(form, event){
  let result = true;
  let allInput = form.querySelectorAll('.modal-input');
  let emailInput = form.querySelector('[type = "email"]');

  /* вывод ошибки (реакция на ошибку) */
  function createError (event, text) {
    event.classList.add('error');
    event.setAttribute('placeholder', text);
  }
 /* отмена вывода ошибки (реакции на ошибку) */
  function removeError (event) {
    if (event.classList.contains('error')){
      event.classList.remove('error');
      event.removeAttribute('placeholder');
    }
  }

    /* обработчик событий для инпутов */

  allInput.forEach((event) => {
    removeError(event);
    if (event.value === '') {
      removeError(event);
      createError(event, 'заполните поле');
      result = false;
    } else {
      if(event.dataset.minLength){
        if (event.value.length < event.dataset.minLength) {
          removeError(event);
          createError(event, `минимум ${event.dataset.minLength} символов`);
          event.value = '';
          result = false;
        }
      }
      // if(emailInput){
      //   if (emailInput.){
      //     /* проверка поля на валидацию */
      //   }
      //     console.log(event);
      // }

    }
 })

  return result;
}

/* submit для регистрации */
modalForm.addEventListener('submit', (event) => {
  //отмена стандартного поведения (перезагрузки?)
  event.preventDefault();
  const form = modalForm;

  if (validation(form) === true){
    console.log('проверка успешна');

    /* вызываем функцию создания массива из элементов формы */
    let object = objectForForm(form);

    /* первые символы имени и фамилии */
    let firstLetterName = object['first-name'].charAt(0) + object['last-name'].charAt(0);
    console.log(firstLetterName);
    object['icon'] = firstLetterName;

    /* меняем статус на пользователь активен */
    object['active'] = true;

    /* запись объекта в localStorage */
    localStorage.setItem(cardNumber(), JSON.stringify(object));

    /* очистка формы */
    clearForm ();

    /* закрыть форму */
    modalWindows[1].classList.add('hidden');
    modalWindows[1].firstElementChild.classList.add('hidden');

    /* перейти к режиму авторизации */
    authorizedUser(cardNumber(), object);
  }
})

/* submit для авторизации */
modalForm1.addEventListener('submit', (event) => {
  //отмена стандартного поведения (перезагрузки?)
  event.preventDefault();
  const form = modalForm1;

  if (validation(form) === true){
    console.log('проверка успешна');
    /* создаем объект для данных, введенных в форме авторизации */
    const objectA = objectForForm(form);

    //console.log(objectA);

    /* загружаем объекты из localStorage */
    //const arrInLocalStorage = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let object = JSON.parse(localStorage.getItem(key));

      //console.log(object);

      if ((object['email'] === objectA['email-or-card'] || key === objectA['emailOrCard']) && (object['password'] === objectA['password'])){
        /* если данные введенные в окне авторизации есть в localStorage */
        /* меняем статус на пользователь активен */
        object['active'] = true;
        /* сохраняем измененное значение в localStoreg (со значением true) */
        localStorage.setItem(key, JSON.stringify(object));

        /* перейти к режиму авторизации */
        authorizedUser(key, object);
      } else {
        alert('Введите данные, заданные при регистрации. Или перейдите к окну регистрации');
      }
      //console.log(object);
    }

    /* очистка формы */
    clearForm ();
  }
})

/* генерация Card Number */
function cardNumber () {
  let result;

  result = (Math.round(Math.random()*1e11)).toString(16);
  if (result.length > 9) {
    result = result.slice(0, -1);
  }
  return result;
}

/* формирование объекта из элемента формы */
function objectForForm (form){
    let allInput = form.querySelectorAll('.modal-input');
    //создаем пустой объект
    let object = {};

    // перебираем поля формы
    allInput.forEach((event) => {
    // создаем классический объект
    object[event.name] = event.value;
    });
    /* отмечаем активного пользователя */
    object['active'] = false;

    return object;
}

/* очистка формы */
function clearForm () {
  let allInput = modalForm.querySelectorAll('.modal-input');
  allInput.forEach((event) => {
    event.value = '';
  })
}

/* клик по buy */
const bookItems = document.querySelectorAll('.book-item');

bookItems.forEach((event) => {
  const btnBuy = event.querySelectorAll('.button');
  btnBuy.forEach((event) => {
    event.addEventListener('click', () => {
      /* открытие окна авторизации */
      modalWindows[0].classList.remove('hidden');
      modalWindows[0].firstElementChild.classList.remove('hidden');
    })
  })
})

/* состояние при авторизации */
function authorizedUser(key, object) {
  //смена иконки пользователя
  /* находим иконку пользователя в header */
  const iconProfile = document.querySelector('.header-icon').firstElementChild;
  /* аббревиатура из первых букв ФИ */
  const iconUser = object.icon;

  /* заменяем iconProfile на object.icon.value */
  iconProfile.outerHTML = '<div class="header-icon-name">' + iconUser + '</div>';

  console.log(iconUser);

  console.log(key, object);
}

console.log('Task: Library#2 - Адаптивная вёрстка 50/50');
console.log('1. Вёрстка соответствует макету. Ширина экрана 768px 26/26');