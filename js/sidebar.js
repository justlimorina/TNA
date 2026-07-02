
document.addEventListener('DOMContentLoaded', () => {
  // Hamburger Menu
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');
  
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
    
    // Đóng menu khi click ra ngoài vùng menu (trên mobile)
    window.addEventListener('click', e => {
      if (window.innerWidth <= 700 && !mainNav.contains(e.target) && !menuBtn.contains(e.target)) {
        mainNav.classList.remove('open');
      }
    });
  }

  // --- Chế độ sáng/tối (Dark Mode) ---
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  
  // Kiểm tra lưu trữ local hoặc cấu hình hệ thống
  let isDark = localStorage.getItem('theme') === 'dark' || 
               (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  function applyTheme(dark) {
    if (dark) {
      document.body.classList.add('dark-theme');
      if (themeIcon) {
        themeIcon.className = 'fa fa-sun-o';
      }
    } else {
      document.body.classList.remove('dark-theme');
      if (themeIcon) {
        themeIcon.className = 'fa fa-moon-o';
      }
    }
  }

  // Áp dụng theme ban đầu
  applyTheme(isDark);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      isDark = !isDark;
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      applyTheme(isDark);
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
});

// Load sản phẩm nổi bật động (nếu có phần tử featured-box)
fetch('featured-product.json')
  .then(response => response.json())
  .then(data => {
    const box = document.getElementById('featured-box');
    if (box) {
      box.innerHTML = `
        <center><h1 class="section-title" style="color: var(--gold-color); margin-bottom: 30px;">Sản phẩm nổi bật</h1></center>
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
    }
  })
  .catch(err => console.log('Không thể tải sản phẩm nổi bật:', err));
