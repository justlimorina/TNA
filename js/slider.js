// Hero Slider – hỗ trợ chỉ báo slide (indicators)
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slider-slide');
  const nextBtn = document.querySelector('.slider-btn.next');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const indicators = document.querySelectorAll('.indicator');
  let current = 0;
  let timerId;

  function showSlide(idx) {
    const wrapper = document.querySelector('.slider-wrapper');
    if (wrapper) {
      wrapper.style.transform = `translateX(-${idx * 100}%)`;
    }
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAuto(); });

  indicators.forEach((dot, i) => {
    dot.addEventListener('click', () => { showSlide(i); resetAuto(); });
  });

  function autoSlide() {
    timerId = setInterval(nextSlide, 4800);
  }

  function resetAuto() {
    clearInterval(timerId);
    autoSlide();
  }

  showSlide(0);
  autoSlide();
});