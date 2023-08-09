/* burger handler */
(function () {
  const burgerItem = document.querySelector('.header-burger');
  const menu = document.querySelector('.header-list');
  const triggerItem = document.querySelector('.header-trigger')
  triggerItem.addEventListener('click', () => {
    menu.classList.toggle('header-list-active');
    burgerItem.classList.toggle('open');
  });
}());

console.log('Task: Library#2 - Адаптивная вёрстка 46/50');
console.log('1. Вёрстка соответствует макету. Ширина экрана 768px 26/26');
console.log(' - блок <header> 2/2. \n - секция Welcome 2/2 \n - секция About 2/2. Обратите внимание на появление новых элементов в виде стрелок. \n - секция About. Если под картинкой находится 5 точек: 2/2. \n Не нужно менять расстояние от картинки до точек, нужно оставить 40px. Оценку не снижаем, если сделано по макету (25px). \n - секция Favorites 2/2. \n Сделать кнопку own, вместо buy для последней книги. Здесь важно будет соблюсти условие, что, какие кнопки находились в состояние "own" на Desktop, те же кнопки в том же состоянии будут и на Tablet. Если условие соблюдено: 2/2 \n - секция CoffeShop 4/4 \n Оценка снижаться не будет, если при наложении текста, не будет совпадать расположение букв, расстояние между символами, начало и конец строки, а так же орфография. Будут оцениваться межстрочный интервал, шрифт и центрирование блока с текстом по общим правилам. \n - секция Contacts 4/4 \n - секция LibraryCard 4/4 \n - блок <footer> 2/2');

console.log('2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется 12/12');
console.log(' - нет полосы прокрутки при ширине страницы от 1440рх до 640рх 4/4. \n - элементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх 4/4. \n - элементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх 4/4. Например, меню в хедере должно преобразоваться в бургер-меню до того, как элементы начнут наезжать друг на друга. \n - все что будет происходить на ширине свыше 1440px - не оценивается. Поэтому можно либо растягивать на весь экран, либо оставить центральной колонкой');

console.log('3. На ширине экрана 768рх реализовано адаптивное меню 8/12');
console.log('Если при ширине страницы в 768рх панель навигации не скрыта, а бургер-иконка не появилась (при этом учитывайте "Особенности проверки адаптивности в DevTools"), то ставим 0 за данный пункт, и дальше его не проверяем. Иначе: \n - Версия Tablet, отступ иконки юзера от правого края - 105px. Такое же расстояние надо сделать и у открытого меню (сейчас там 92px). Сам крест желательно отцентрировать по поцентральной позиции бургер-иконки. Чтобы при переходе из одного состояния в другое ничего не прыгало. Само меню нужно прижать к правому краю целиком. Если иконка юзера не прыгает (не меняет позиции при открытии меню), независимо от величины отступа: 2/2 \n - Цвет выпавшего меню должен совпадать с цветом полоски навигации. Оценка снижаться не будет, если сделано по первому макету (#000000). \n - при нажатии на бургер-иконку плавно появляется адаптивное меню 4/4 \n - при нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран 2/4 \n - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям при нажатии, а само адаптивное меню при этом плавно скрывается 0/2 \n - размеры открытого бургер-меню соответствуют макету, так же открытое бургер-меню проверяется на PixelPerfect 2/2');
