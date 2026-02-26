document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('#carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');

    let index = 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    // Next button
    nextBtn.addEventListener('click', () => {
        index = (index + 1) % items.length;
        updateCarousel();
    });

    // Previous button
    prevBtn.addEventListener('click', () => {
        index = (index - 1 + items.length) % items.length;
        updateCarousel();
    });

    // Auto-slide
    setInterval(() => {
        index = (index + 1) % items.length;
        updateCarousel();
    }, 10000);
});