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
   }
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
  /* массив из 4х элементов: log-in - 0, register - 1, my-profile - 2, buy-card - 3*/
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
/* форма покупки абонемента */
let modalForm2 = document.querySelector('.card-form');

function validation(form/*, event*/){
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
      } else {
        removeError (event);
      }
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
    //console.log('проверка успешна');

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
        //console.log(key, objectA);
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
      clearForm (form);

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
    //console.log('проверка успешна');
    // создаем объект для данных, введенных в форме авторизации
    const objectA = objectForForm(form);
    //console.log(objectA);

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
        //считаем количество визитов
        object['visits'] = object.visits + 1;

        // сохраняем измененное значение в localStoreg (со значением true)
        localStorage.setItem(key, JSON.stringify(object));

        // закрыть окно авторизации
        modalWindows[0].classList.add('hidden');
        modalWindows[0].firstElementChild.classList.add('hidden');

        // перейти к режиму авторизации
        authorizedUser(key, object);
        }
      }
      // если пользователя нет в базе localStorage
      if (flag !== true) {
        alert('Введите данные, заданные при регистрации. Или перейдите к окну регистрации');
      }
    } else {
      alert('Перейдите к окну регистрации');
    }

    /* очистка формы */
    clearForm (form);
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
    // счетчик visits
    let visits = 1;
    object['visits'] = visits;
    // количество купленных книг
    let books = 0;
    object['counter books'] = books;
    // создаем объект для книг в объекте пользователя
    object.books = {};
    // отмечаем наличие абонемента
    object['library card'] = false;

    return object;
}

/* очистка формы */
function clearForm (form) {
  let allInput = form.querySelectorAll('.modal-input');
  allInput.forEach((event) => {
    event.value = '';
  })
}

/* определяем key активного пользователя */
function findAncAtiveUser () {
  let keyActiveUser;
  if (localStorage.length !== 0) {
    for (let i = 0; i < localStorage.length; i++) {
     let key = localStorage.key(i);
      let object = JSON.parse(localStorage.getItem(key));
      //console.log(key, object);
      /* если есть активный пользователь, то запоминаем ключ для активного пользователя*/
      if (object['active'] === true){
        keyActiveUser = key;
      }
    }
  }
  return keyActiveUser;
}

/* клик по buy в favorites */
const bookItems = document.querySelectorAll('.book-item');
//console.log(bookItems);
let btnBuy;
bookItems.forEach((event) => {
  //console.log (event + ' значение event для bookItens');
  btnBuy = event.querySelectorAll('.button');
  //console.log (event + ' значение event для bookItems');
  //console.log (btnBuy + ' значение при клике на кнопку')

  btnBuy.forEach((event)=> {
    let flagActiveUser = false;
    let flagLibraryCard = false;
    let key;
    let object = {};
    //console.log (event + ' значение event для btnBuy');
    event.addEventListener('click', () => {
      // проверяем наличие активного пользователя в local Storage
      // flagActiveUser = false если нет активного пользователя

      if (localStorage.length !== 0) {
        for (let i = 0; i < localStorage.length; i++) {
          key = localStorage.key(i);
          object = JSON.parse(localStorage.getItem(key));
          //console.log(key, object);
          /* если есть активный пользователь, то меняем флаг на true*/
          if (object['active'] === true){
            //запоминаем следующий элемент за кнопкой buy (они отличаются классами)
            //nextElBtnBuy = btnBuy.nextElementSibling;
            flagActiveUser = true;
            if (object['library card'] === true) {
              flagLibraryCard = true;
            }
          }
        }
      }
      if (flagActiveUser === false){
        /* открытие окна авторизации */
        modalWindows[0].classList.remove('hidden');
        modalWindows[0].firstElementChild.classList.remove('hidden');
      } else if (flagLibraryCard === false) {
        // действия при авторизированном пользователе и не купленном абонементе
        // открываем окно покупки абонемента
        openBuyCard ();
        } else {
          /* действия при авторизированном пользователе и купленном абонементе
          (купить книгу при клике на buy в карточке книги) передаем кнопку*/

          //console.log (event, btnBuy);
          rentedBooks (event);
          }
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
  headerDropMenu.style.fontSize = '12px';
  headerDropMenu.style.textTransform = 'uppercase';

  /* вывод полного имени пользователя при наведении на иконку */
  // определение элемента для наведения
  const headerIconName = document.querySelector('.header-icon-name');
  // отслеживание наведения
  headerIconName.addEventListener('mouseover', () => {
    headerIconName.title = contentTitle;
  })

  // проверяем есть ли купленные книги
  if (object['counter books'] > 0) {
    // просматриваем все книги в local storage, и если их значение совпадает со значениями ключей объекта books,
    // отключаем кнопку buy, заменяем надпись на кнопке
    console.log(object['counter books']);
    console.log(' количество купленных книг');
    // сравниваем классы последующих элементов кнопок buy с ключами объекта books в локал сторадж,
    //при совпадении заменяем buy на own
    markPurchasedBooks (key, object);
    //replaceBuyWithOwn (event);
  } else {
    console.log(object['counter books']);
    console.log(' количество купленных книг');
  }

  /* отслеживание клика по MyProfile  и переход к соответствующему окну */
  const btnMyProfile = document.querySelector('.my-profile');
  btnMyProfile.addEventListener('click', () => {
    modalWindows[2].classList.remove('hidden');
    modalWindows[2].firstElementChild.classList.remove('hidden');

    // отображение инициалов пользователя в модальном окне
    const avatar = document.querySelector('.avatar').firstElementChild;
    avatar.outerHTML = `<p> ${iconUser} </p>`;

    // отображение ИФ пользователя в модальном окне
    let nameUser = document.querySelector('.name');
    nameUser.firstElementChild.outerHTML = `<span> ${contentTitle} </span>`;
    nameUser.setAttribute('style', 'font-size: 13px; line-height: 16px');

    // отображение счетчика визитов
    let countVisites = document.querySelector('.count-visits');
    countVisites.textContent = object['visits'];

    // отображение счетчика купленных книг
   let countBooks = document.querySelector('.count-books');
   countBooks.textContent = object['counter books'];

    // отображение Card Number
    let cardNumber = document.querySelector('.card-number');
    cardNumber.textContent = key;
    cardNumber.style.textTransform = 'uppercase';

    // копирование Card Number в буфер обмена
    const cardCopy = document.querySelector('.card-copy');
    cardCopy.onclick = function() {
      navigator.clipboard.writeText(cardNumber.textContent);
    }
  })

  /* отслеживаение клика по Log Out */
  const btnLogOut = document.querySelector('.out');
  btnLogOut.addEventListener('click', () => {
    // выход из режима авторизации
    object['active'] = false;
    //console.log(key, object);
    localStorage.setItem(key, JSON.stringify(object));
    closeAut(key, object);
  })
 // console.log(key, object);
}

/* при авторизации сравниваем классы последующих элементов кнопок buy с ключами объекта books в локал сторадж,
    при совпадении заменяем buy на own*/
function markPurchasedBooks (key, object) {
  const bookItems = document.querySelectorAll('.book-item');
  //следующий элемент за кнопкой buy (они отличаются классами)
  let nextElBtnBuy;
  // определяем класс
  let classNextElBtnBuy;
  bookItems.forEach((event) => {
    // находим кнопкy buy
    const btnBuy = event.querySelector('.button');
    //console.log(event);

    nextElBtnBuy = btnBuy.nextElementSibling;
    //console.log(nextElBtnBuy);

    classNextElBtnBuy = nextElBtnBuy.classList[1].toString();
    //console.log(classNextElBtnBuy + ' класс для след элемента buy');
      // сравниваем этот класс с ключами объекта booksto
    //ищем classNextElBtnBuy в объекте Книги
    for (kl in object.books) {
      //console.log(kl + ' ключ для книги в object.books');
      if (kl === classNextElBtnBuy) {
        // кнопка buy должна быть переименована в own и не активна
        replaceBuyWithOwn (nextElBtnBuy);
        //console.log(flagBook, 'флаг для книги, совпадения есть');
      }
    }
    })
  }

/* форма покупки карты открыта
 отслеживание клика по кнопкам Buy при авторизированном пользователе*/
function openBuyCard () {
  modalWindows[3].classList.remove('hidden');
  modalWindows[3].firstElementChild.classList.remove('hidden');
  completionBuyCard();
}

  // с неактивной кнопкой до конца не разобралась
  /* проверка заполнения всех полей формы, иначе кнопка buy отключена*/
  // function completionBuyCard() {
  //   const form = modalForm2;
  //   console.log(form);
  //   const allInput = form.querySelectorAll('.modal-input');
  //   console.log(allInput);
  //   let schet = 0;
  //   //document.querySelector('.card-form').querySelector('.modal-button').disabled = true;
  //   allInput.forEach((event) => {
  //     if (event.value !== '') {
  //       schet = schet + 1;
  //       console.log(schet);
  //     }
  //   })

  //   if (schet === 7) {
  //     document.querySelector('.card-form').querySelector('.modal-button').disabled = false;
  //   }
  //   clearForm ();
  // }

    /* submit для формы покупки абонемента */
   function completionBuyCard ()  {
    modalForm2.addEventListener('submit', (event) => {
    //отмена стандартного поведения
    event.preventDefault();
    const form = modalForm2;
    // key активного пользователя
    const key = findAncAtiveUser();
    const object = JSON.parse(localStorage.getItem(key));
    if (validation(form) === true){
      object['library card'] = true;
      localStorage.setItem(key, JSON.stringify(object));
      alert('Абонемент оплачен. Доступна покупка книг');
          /* очистка формы */
     clearForm (form);
     /* закрыть форму */
     closeBuyCard();
    }
  })}


  /* покупка книги при наличии абонемента.
  функция получает кнопку buy из Favorites */
  function rentedBooks (event) {
    //console.log(event + ' значение пришедшее для обработки клика при активном пользователе и купленном абонементе');
    // получаем key активного пользователя и значение для этого key (object)
    const keyActiveUser = findAncAtiveUser();
    const object = JSON.parse(localStorage.getItem(keyActiveUser));
    //console.log(keyActiveUser, object);
    /* отслеживаем клики на buy и выполняем добавление */
    //console.log(bookItems);
    //console.log(event);

      console.log (event + ' значение при клике на кнопку1');
        /* получаем название книги и автора, ищем в родительском элементе*/
        const parent = event.parentElement;
        const nameBook = parent.querySelector('.title').textContent;
        //console.log(nameBook);
        const authorBook = parent.querySelector('.subtitle').textContent.slice(3);
        //console.log(authorBook);

        //получаем key для карточки книги, обращаясь к следующему элементу за buy
        nextElBtnBuy = event.nextElementSibling;
        //console.log(nextElBtnBuy + 'след элемент');

        const keyBook = nextElBtnBuy.classList[1].toString();
        //console.log (keyBook + 'key для книги');

        //добавляем значения в local storage
        object.books[keyBook] = `${nameBook}, ${authorBook}`;

        // увеличиваем у активного пользователя счетчик купленных книг.
        object['counter books'] = object['counter books'] + 1;

        // записываем изменения в local storage изменения
        localStorage.setItem(keyActiveUser, JSON.stringify(object));

        // кнопку buy  меняем на own и делаем не активной
         replaceBuyWithOwn (nextElBtnBuy);
         location.reload();

         //return;
  }

  /* заменить buy на own, получает последующий элемент после кнопки buy */
  function replaceBuyWithOwn (event) {
    event.previousElementSibling.classList.add('button-own');
    event.previousElementSibling.setAttribute('disabled', true);
    event.previousElementSibling.textContent = 'Own';
    //console.log(event.previousElementSibling);
  }

  /* закрыть форму покупки абонемента */
function closeBuyCard() {
  modalWindows[3].classList.add('hidden');
  modalWindows[3].firstElementChild.classList.add('hidden');
}

/* отмена режима авторизации (выход из режима) */
function closeAut (key, object) {
  // меняем иконку с инициалов на профиль
  // находим иконку пользователя в header
  const iconProfile = document.querySelector('.header-icon').firstElementChild;
  iconProfile.outerHTML = '<img class="" src="assets/img/icon_profile.svg" alt="Icon profile">';

  // кнопкам buy в favorites возвращаем первоначальный вид
  returnTheInitialValueOfBuy ();
  // закрываем drop-меню
  dropMenu[1].classList.add('profile-with-aut');
}

/* возврат к начальным значениям кнопок buy при выходе из режима авторизации */
// находим кнопки own, меняем значение и удаляем классы
function returnTheInitialValueOfBuy (key, object) {
  const bookItems = document.querySelectorAll('.book-item');

  bookItems.forEach((event) => {
    // находим кнопкy own
    const btnBuy = event.querySelector('.button');

    btnBuy.classList.remove('button-own');
    btnBuy.removeAttribute('disabled');
    btnBuy.textContent = 'Buy';
    })
  }

console.log('Task: Library#2 - Адаптивная вёрстка 50/50');
console.log('1. Вёрстка соответствует макету. Ширина экрана 768px 26/26');