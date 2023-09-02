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
  document.addEventListener('click', (event, index) => {

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

    //меню пользователя при авторизации и регистрации
    const clickDropMenu = event.composedPath().includes(dropMenu[index]);
      const clicIconUser = event.composedPath().includes(iconUser);

    if (!clickDropMenu && !clicIconUser) {
      if (!iconUser.firstElementChild.classList.contains('header-icon-name')) {
        dropMenu[0].classList.add('profile-no-aut');
      } else {
        dropMenu[1].classList.add('profile-with-aut');
      }
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

  // поиск стрелок навигации
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
  // массив кнопок пагинации
const btmsPagination = document.querySelectorAll('.about-pagination-inner-item');
  // контейнер для карусели
const carouselBox = document.querySelector(".about-carousel-box");
  // значение left  для carouselBox
let position = 0;
  // индекс текущего слайда (для сопоставления с кнопками)
let indexItem = 0;

  // переход на след. слайд (сдвиг справа налево)
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

  // слушаем клик по стрелке вправо и применяем функцию сдвига вправо
arrowRight.addEventListener('click', nextItem);

    // переход на предыдущий слайд (сдвиг слева направо)
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

  // слушаем клик по стрелке влево и применяем функцию сдвига влево
arrowLeft.addEventListener('click', prevItem);

  // перелистываем слайды по кнопкам
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

  // выделяем активную кнопку по номеру
const activeBtn = (indexItem) => {
  // для всех элементов кнопок удаляем класс active, если такой есть
  for (let btnItem of btmsPagination) {
    btnItem.classList.remove('active');
  }
  // текущей кнопке добавить класс active
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

/* проверка local Storage на активного пользователя */
for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  let object = JSON.parse(localStorage.getItem(key));

  // если есть активный пользователь
  if (object['active'] === true){
    /* перейти к режиму авторизации */
    authorizedUser(key, object);
   } //else {
  //   alert('Введите данные, заданные при регистрации. Или перейдите к окну регистрации');
  // }
}

/* открытие меню до авторизации при клике на иконку с профилем пользователя */
dropMenu.forEach((index) => {
  iconUser.addEventListener('click', () => {
    if (!iconUser.firstElementChild.classList.contains('header-icon-name')) {
      dropMenu[0].classList.remove('profile-no-aut');
    } else {
      dropMenu[1].classList.remove('profile-with-aut');
    }
  })
})

  /* кнопки для вызова окна регистрации (массив из 3х кнопок) */
  const regWindows = document.querySelectorAll('.reg');
  /* массив из 3х элементов: log-in - 0, register - 1, my-profile - 2*/
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

    /* проверяем на совпадение введенной почты с имеющейся базой
     (если такая почта уже есть, то пользователь зарегистрирован) */
      // если email уникален, то flag = false
      let flag = false;
      if (localStorage.length !== 0) {

      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let objectA = JSON.parse(localStorage.getItem(key));
        console.log(key, objectA);
        /* если данные email введенные в окне регистрации совпадают
         с email в localStorage то меняем флаг*/
        if (object['email'] === objectA['email']){
          flag = true;
        }
      }
    }
    if (flag === true){
      alert(`Пользователь с email ${object['email']} уже зарегистрирован`)
    } else {
          /* первые символы имени и фамилии */
    let firstLetterName = object['first-name'].charAt(0) + object['last-name'].charAt(0);
    //console.log(firstLetterName);
    object['icon'] = firstLetterName;

    /* меняем статус на пользователь активен */
    object['active'] = true;

    let key = cardNumber();
    /* запись объекта в localStorage */
    localStorage.setItem(key, JSON.stringify(object));

    /* очистка формы */
    clearForm ();

    /* закрыть форму */
    modalWindows[1].classList.add('hidden');
    modalWindows[1].firstElementChild.classList.add('hidden');

    /* перейти в режим авторизации */
    authorizedUser(key, object);
    }
  }
})

/* submit для авторизации */
modalForm1.addEventListener('submit', (event) => {
  //отмена стандартного поведения (перезагрузки?)
  event.preventDefault();
  const form = modalForm1;

  if (validation(form) === true){
    console.log('проверка успешна');
    // создаем объект для данных, введенных в форме авторизации
    const objectA = objectForForm(form);
    console.log(objectA);

    // загружаем объекты из localStorage
    // если введенные данные совпадают с имеющимися в localStorage, то flag = true
    let flag = false;
    // проверяем что localStorage не пустой
    if (localStorage.length !== 0) {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let object = JSON.parse(localStorage.getItem(key));

        if ((object['email'] === objectA['email-or-card'] || key === objectA['email-or-card']) && (object['password'] === objectA['password'])){
          flag = true;
        // если данные введенные в окне авторизации есть в localStorage
        // меняем статус на пользователь активен
        object['active'] = true;
        // сохраняем измененное значение в localStoreg (со значением true)
        localStorage.setItem(key, JSON.stringify(object));

        // закрыть окно авторизации
        modalWindows[0].classList.add('hidden');
        modalWindows[0].firstElementChild.classList.add('hidden');

        // перейти к режиму авторизации
        authorizedUser(key, object);
        }
      }
    } else {
      alert('Перейдите к окну регистрации');
    }
    // если пользователя нет в базе localStorage
    if (flag !== true) {
      alert('Введите данные, заданные при регистрации. Или перейдите к окну регистрации');
    }
    /* очистка формы */
    clearForm ();
  }
})

/* генерация Card Number */
function cardNumber() {
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

  const contentTitle = `${object['first-name']} ${object['last-name']}`;

  /* заменяем iconProfile на object.icon.value */
  iconProfile.outerHTML = '<div class="header-icon-name" title="">' + iconUser + '</div>';

  /* вывод Card Number в заголовке DropMenu */
    // находим заголовок (Profile)
  let headerDropMenu = document.querySelector('.profile-with-aut').firstElementChild;
    // меняем контент в заголовке
  headerDropMenu.textContent = `${key}`;
    // меняем размер шрифта в заголовке
  headerDropMenu.style.fontSize = '13px';

  /* вывод полного имени пользователя при наведении на иконку */
  // определение элемента для наведения
  const headerIconName = document.querySelector('.header-icon-name');
  // отслеживание наведения
  headerIconName.addEventListener('mouseover', () => {
    headerIconName.title = contentTitle;
  })

  /* отслеживание клика по MyProfile  и переход к соответствующему окну */
  const btnMyProfile = document.querySelector('.my-profile')
  btnMyProfile.addEventListener('click', () => {
    modalWindows[2].classList.remove('hidden');
    modalWindows[2].firstElementChild.classList.remove('hidden');
  })

  /* отслеживаение клика по Log Out */
  const btnLogOut = document.querySelector('.out');
  btnLogOut.addEventListener('click', () => {
    // выход из режима авторизации
    object['active'] = false;
    console.log(key, object);
    localStorage.setItem(key, JSON.stringify(object));
    closeAut(key, object);
  })


  //console.log(iconUser);

  //console.log(contentTitle);

  console.log(key, object);
}

/* отмена режима авторизации (выход из режима) */
function closeAut (key, object) {
  // меняем иконку с инициалов на профиль
  // находим иконку пользователя в header
  const iconProfile = document.querySelector('.header-icon').firstElementChild;
  iconProfile.outerHTML = '<img class="" src="assets/img/icon_profile.svg" alt="Icon profile">';

  // закрываем drop-меню
  dropMenu[1].classList.add('profile-with-aut');
}

console.log('Task: Library#2 - Адаптивная вёрстка 50/50');
console.log('1. Вёрстка соответствует макету. Ширина экрана 768px 26/26');