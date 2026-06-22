const slides = Array.from(document.querySelectorAll('.slide'));
let currentSlideIndex = 0;

slides.forEach((s, i) => {
    if (i === currentSlideIndex) {
        s.classList.add('active');
    } else {
        s.classList.remove('active');
    }
});

function setDirectionClasses(oldIndex, newIndex) {
    const oldSlide = slides[oldIndex];
    const newSlide = slides[newIndex];

    slides.forEach(s => s.classList.remove('prev', 'next'));

    if (newIndex > oldIndex) {
        oldSlide.classList.add('prev');
        newSlide.classList.add('next');
        void newSlide.offsetWidth;
        newSlide.classList.remove('next');
        newSlide.classList.add('active');
    } else if (newIndex < oldIndex) {
        oldSlide.classList.add('next');
        newSlide.classList.add('prev');
        void newSlide.offsetWidth;
        newSlide.classList.remove('prev');
        newSlide.classList.add('active');
    }

    setTimeout(() => {
        oldSlide.classList.remove('active');
    }, 10);
}

function changeSlide(nextIndex) {
    if (nextIndex >= 0 && nextIndex < slides.length && nextIndex !== currentSlideIndex) {
        const oldIndex = currentSlideIndex;
        setDirectionClasses(oldIndex, nextIndex);
        currentSlideIndex = nextIndex;
    }
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === ' ') {
        changeSlide(Math.min(currentSlideIndex + 1, slides.length - 1));
    } else if (event.key === 'ArrowLeft') {
        changeSlide(Math.max(currentSlideIndex - 1, 0));
    }
});

let touchStartX = 0;
window.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; });
window.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx < -40) changeSlide(Math.min(currentSlideIndex + 1, slides.length - 1));
    else if (dx > 40) changeSlide(Math.max(currentSlideIndex - 1, 0));
});
