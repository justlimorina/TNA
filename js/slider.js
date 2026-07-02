// Simple Hero Slider (auto + manual)
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slider-slide');
  const nextBtn = document.querySelector('.slider-btn.next');
  const prevBtn = document.querySelector('.slider-btn.prev');
  let current = 0;
  let timerId;

  function showSlide(idx) {
    const wrapper = document.querySelector('.slider-wrapper');
    if (wrapper) {
      wrapper.style.transform = `translateX(-${idx * 100}%)`;
    }
    slides.forEach((slide,i) => {
      slide.classList.toggle('active', i === idx);
    });
  }
  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }
  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAuto();
  });
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAuto();
  });
  function autoSlide() {
    timerId = setInterval(nextSlide, 4500);
  }
  function resetAuto() {
    clearInterval(timerId);
    autoSlide();
  }
  showSlide(current);
  autoSlide();
});