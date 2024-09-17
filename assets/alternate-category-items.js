function alternateCategoryItems() {
	const screenIsWide = window.matchMedia("(min-width: 990px)").matches;

	const category_bodies = document.querySelectorAll(`.category__body`);
	for (const category_body of category_bodies) {
		const category_subsections = category_body.querySelectorAll('.category__subsection');

		if (screenIsWide) {
			for (const category_subsection of category_subsections) {
				var category_subsection_items = category_subsection.querySelectorAll('.category__item');
				if (category_subsection_items.length % 2 === 1) {
					console.log('SCREEN IS WIDE AND SUBCATEGORY IS ODD');
					var placeholder = document.createElement('div');
					placeholder.classList.add('category__item');
					placeholder.classList.add('placeholder');
					console.log(placeholder);
					category_subsection.appendChild(placeholder);
				}
			}
		} else {
			document.querySelectorAll(`.category__body .category__subsection .placeholder`).forEach((placeholder) => {
				placeholder.remove();
			});
		}

		var category__items = category_body.querySelectorAll('.category__item');
		category__items.forEach((category__item) => {
			category__item.classList.remove('model__right');
		});
		
		if (screenIsWide) {
			// Alternate according to 4s
			for (let i = 0; i < category__items.length; i++) {
				if (i % 4 > 1) {
					category__items[i].classList.add('model__right');
				}
			}
		} else {
			// Alternate according to 2s
			for (let i = 0; i < category__items.length; i++) {
				if (i % 2 === 1) {
					category__items[i].classList.add('model__right');
				}
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const screenIsWide = window.matchMedia("(min-width: 990px)").matches;
	sessionStorage.setItem('screenIsWide', screenIsWide);
	
	alternateCategoryItems();
});

window.addEventListener("resize", function () {
	const screenIsWide = window.matchMedia("(min-width: 990px)").matches;
	const screenWasWide = sessionStorage.getItem('screenIsWide');
	
	if (screenIsWide && screenWasWide == 'false') {
		sessionStorage.setItem('screenIsWide', screenIsWide);
		alternateCategoryItems();
	}
	if (!screenIsWide && screenWasWide == 'true') {
		sessionStorage.setItem('screenIsWide', screenIsWide);
		alternateCategoryItems();
	}
});

