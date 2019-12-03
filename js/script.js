ready(function(){

  // В этом месте должен быть написан ваш код
const bookCardTemlate = document.getElementById('allBooks');
const catalogBooksList = document.querySelector('.catalog__books-list');
for (let i = 0; i < books.length; i++) {
  let card = books[i];
  let cardTitle = bookCardTemlate.content.querySelector('.card__title');
  cardTitle.textContent = card.name;

  let cardPrice = bookCardTemlate.content.querySelector('.card__price');
  cardPrice.textContent = `${card.price}₽`;

  let cardImage = bookCardTemlate.content.querySelector('.card__img');
  cardImage.src = `img/books/${card.uri}.jpg`;
  cardImage.alt = card.uri;

  let bookClone = bookCardTemlate.content.cloneNode(true);
  
  bookClone.children[0].dataset.id = card.uri;

  catalogBooksList.appendChild(bookClone);
}

const productTemplate = document.getElementById('modalProduct');
const modalContent = document.querySelector('.modal__content');
for (let i = 0; i < books.length; i++) {
  let card = books[i];
  let cardTitle = productTemplate.content.querySelector('.product__title');
  cardTitle.textContent = card.name;

  let cardPrice = productTemplate.content.querySelector('.btn--price');
  cardPrice.textContent = `${card.price}₽`;

  let cardImageWrap = productTemplate.content.querySelector('.product__img-wrap');
  let cardImage = cardImageWrap.getElementsByTagName('img');

  cardImage.src = `img/books/${card.uri}.jpg`;
  cardImage.alt = card.uri;

  modalContent.appendChild(productTemplate);
}

function (){

}


function modalOpen (e){
  e.preventDefault();
  const id = e.target.dataset.id;
  // найти объект с данными для вывода в модалку
  // на основании полученный данных заполняем модальное окно
  // открываем модальное окно
  let findModal = document.getElementById('modal-book-view');
  findModal.classList.toggle('modal--open');
}

let cardList = document.querySelectorAll('.card');

cardList.forEach(function(oneCard){
  oneCard.addEventListener('click', modalOpen);
});


// console.log(card);
// card.addEventListener('click', modalOpen);


  // ВНИМАНИЕ!
  // Нижеследующий код (кастомный селект и выбор диапазона цены) работает
  // корректно и не вызывает ошибок в консоли браузера только на главной.
  // Одна из ваших задач: сделать так, чтобы на странице корзины в консоли
  // браузера не было ошибок.

  // Кастомные селекты (кроме выбора языка)
  new Choices('.field-select:not(#lang) select.field-select__select', {
    searchEnabled: false,
    shouldSort: false,
  });
  // Кастомный селект выбора языка отдельно
  new Choices('#lang select.field-select__select', {
    searchEnabled: false,
    shouldSort: false,
    callbackOnCreateTemplates: function (template) {
      return {
        item: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable}" data-item data-id="${data.id}" data-value="${data.value}" ${data.active ? 'aria-selected="true"' : ''} ${data.disabled ? 'aria-disabled="true"' : ''}>
              ${getLangInSelectIcon(data.value)} ${data.label.substr(0,3)}
            </div>
          `);
        },
        choice: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${classNames.itemChoice} ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}" data-select-text="${this.config.itemSelectText}" data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${data.id}" data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
              ${getLangInSelectIcon(data.value)} ${data.label}
            </div>
          `);
        },
      };
    }
  });
  function getLangInSelectIcon(value) {
    if (value == 'ru') return '<span class="field-select__lang-ru"></span>';
    else if (value == 'en') return '<span class="field-select__lang-en"></span>';
    return '<span class="field-select__lang-null"></span>';
  }

  // Выбор диапазона цен
  var slider = document.getElementById('price-range');
  noUiSlider.create(slider, {
    start: [400, 1000],
    connect: true,
    step: 100,
    range: {
      'min': 200,
      'max': 2000
    }
  });

});

function ready (fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
