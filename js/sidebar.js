
function initSidebar() {
  // Hamburger Menu
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');
  
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
    
    // Đóng menu khi click ra ngoài vùng menu (trên mobile)
    window.addEventListener('click', e => {
      if (window.innerWidth <= 768 && !mainNav.contains(e.target) && !menuBtn.contains(e.target)) {
        mainNav.classList.remove('open');
      }
    });
  }



  // --- Scroll Elevation cho Header ---
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        siteHeader.classList.add('elevated');
      } else {
        siteHeader.classList.remove('elevated');
      }
    }, { passive: true });
  }

  // Load sản phẩm nổi bật động (nếu có phần tử featured-box)
  const box = document.getElementById('featured-box');
  if (box) {
    fetch('featured-product.json')
      .then(response => response.json())
      .then(data => {
        box.innerHTML = `
          <center><h1 class="section-title" style="margin-bottom: 30px;">Sản phẩm nổi bật</h1></center>
          <div class="featured-row">
            <div class="featured-image-col">
              <img src="${data.image}" alt="${data.title}" class="featured-img">
            </div>
            <div class="featured-text-col">
              <h2>${data.title}</h2>
              <p>${data.description}</p>
              <div class="featured-action">
                <a href="${data.link}" class="button featured-btn">${data.button}</a>
              </div>
            </div>
          </div>
        `;
      })
      .catch(err => console.log('Không thể tải sản phẩm nổi bật:', err));
  }
}

// Khởi chạy ngay lập tức nếu tài liệu đã sẵn sàng, nếu không chờ DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebar);
} else {
  initSidebar();
}

