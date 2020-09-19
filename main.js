const carousel = document.querySelector('.carousel-wrapper');
const slides = document.querySelectorAll('.carousel-item');

const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');
const navigationEl = document.querySelector('.carousel-navigation__dots');

for (let i = 0; i < slides.length; i++) {
	navigationEl.innerHTML += ` <li class="carousel-navigation__dot"></li>`;
}

const dots = document.querySelectorAll('.carousel-navigation__dot');

let currentSlide = 0;
dots[0].classList.add('is-active');

btnNext.addEventListener('click', nextSlide);
btnPrev.addEventListener('click', prevSlide);

function nextSlide() {
	console.log('next');
	if (currentSlide < slides.length - 1) {
		currentSlide++;
		slides.forEach((slide) => {
			slide.style.transform = `translateX(${-currentSlide * 100}%)`;
		});
		updateActiveClass();
	}
}

function prevSlide() {
	console.log('prev');
	if (currentSlide > 0) {
		currentSlide--;
		slides.forEach((slide) => {
			slide.style.transform = `translateX(${-currentSlide * 100}%)`;
		});
		updateActiveClass();
	}
}

function updateActiveClass() {
	dots.forEach((item, index) => {
		if (index !== currentSlide) {
			item.classList.remove('is-active');
		} else {
			item.classList.add('is-active');
		}
	});
}

dots.forEach((dot, index) => {
	dot.addEventListener('click', () => {
		currentSlide = index;
		slides.forEach((slide) => {
			slide.style.transform = `translateX(${-currentSlide * 100}%)`;
		});
		updateActiveClass();
	});
});

let last_known_scroll_position = 0;
let ticking = false;

function doSomething(scroll_pos) {
	// Do something with the scroll position
}

function detectMouseWheelDirection(e) {
	var delta = null,
		direction = false;
	if (!e) {
		// if the event is not provided, we get it from the window object
		e = window.event;
	}
	if (e.wheelDelta) {
		// will work in most cases
		delta = e.wheelDelta / 120;
	} else if (e.detail) {
		// fallback for Firefox
		delta = -e.detail / 2;
	}
	if (delta !== null) {
		direction = delta > 0 ? 'up' : 'down';
	}

	return { direction, delta };
}

changeSlide = true;

carousel.addEventListener('mousewheel', function (e) {
	const { direction, delta } = detectMouseWheelDirection(e);

	if (changeSlide == true && direction === 'down' && Math.abs(delta) > 0.2) {
		nextSlide();
		changeSlide = false;
		setTimeout(() => {
			changeSlide = true;
		}, 1000);
	}
	if (changeSlide == true && direction === 'up' && Math.abs(delta) > 0.2) {
		prevSlide();
		changeSlide = false;
		setTimeout(() => {
			changeSlide = true;
		}, 1000);
	}
});
