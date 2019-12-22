ready(function(){

	// Вывод карточек

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


	let productHTML = '';
	function getProductHTML(card) {
		return `
			<div class="product__img-wrap">
					<img src="img/books/${card.uri}.jpg" alt="Искренний сервис" width="422" height="594">
			</div>
			<div class="product__text-info">
					<h2 class="product__title">${card.name}</h2>
					<div class="rating product__rating">
							<span class="rating__stars">
									<svg width="18" height="18">
											<use xlink:href="#star"></use>
									</svg>
									<svg width="18" height="18">
											<use xlink:href="#star"></use>
									</svg>
									<svg width="18" height="18">
											<use xlink:href="#star"></use>
									</svg>
									<svg width="18" height="18">
											<use xlink:href="#star"></use>
									</svg>
									<svg width="18" height="18">
											<use xlink:href="#star-half"></use>
									</svg>
							</span>
							<span class="rating__num">4.6/5.0</span>
							<span class="rating__review">20 отзывов</span>
					</div>
					<table class="product__table-info">
							<tr>
									<th>Автор:</th>
									<td>
											<a href="">Девид Огилви</a>
									</td>
							</tr>
							<tr>
									<th>Артикул:</th>
									<td>6649507</td>
							</tr>
							<tr>
									<th>В наличии:</th>
									<td>5 шт.</td>
							</tr>
					</table>
			</div>
			<div class="product__descr">
					<h3 class="product__subtitle">Описание:</h3>
					<p>${card.desc}</p>
					<div class="product__actions">
							<button class="btn  btn--price">
									${card.price} ₽
									<span class="btn__sm-text">
											<svg class="btn__icon" width="14" height="14">
													<use xlink:href="#plus"></use>
											</svg>
											<span>В корзину</span>
									</span>
							</button>
					</div>
			</div>
		`
	}


	let productModal = document.querySelector('.product');
	let modalOpened;

	function modalOpen (e){
		e.preventDefault();
		const id = e.currentTarget.dataset.id;

		books.forEach(function(book) {

			if (id === book.uri) {
				productModal.innerHTML = getProductHTML(book);
			}
		})

		let findModal = document.getElementById('modal-book-view');
		findModal.classList.toggle('modal--open');
		document.querySelector('html').classList.add('js-modal-open');

	}

	let cardList = document.querySelectorAll('.card');

	cardList.forEach(function(oneCard){
		oneCard.addEventListener('click', modalOpen);
	});

	// счетчик
	let cartNum = document.querySelector('.page-header__cart-num'), count = 0;
	let btnPrice = document.querySelector('.btn--price');

	// btnPrice.addEventListener('click', function() {
	// 	count += 1;
	// 	return cartNum.innerHTML = count;
	// });



	//Закрытие модального окна
	let closeButton = document.querySelector('.modal__close');


	function modalClose (e) {
		let findModal = document.getElementById('modal-book-view');
		findModal.classList.remove('modal--open');
		document.querySelector('html').classList.remove('js-modal-open');
	}
	closeButton.addEventListener('click', modalClose);

	//Открытие фильтров


		let filtersTrigger = document.querySelector('#filters-trigger');
		let filters = document.querySelector('#filters');

		function openFilters() {
		  filters.classList.toggle('filters--open');
		}
		filtersTrigger.addEventListener('click', openFilters);



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
