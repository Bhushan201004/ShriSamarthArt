const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const hamburgerIcon = document.getElementById('hamburger-icon');

menuBtn.addEventListener('click', () => {
  if (mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.remove('hidden');
    setTimeout(() => {
      mobileMenu.classList.remove('scale-y-0');
      mobileMenu.classList.add('scale-y-100');
    }, 10);
    hamburgerIcon.classList.add('rotate-90');
  } else {
    mobileMenu.classList.remove('scale-y-100');
    mobileMenu.classList.add('scale-y-0');
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
    }, 300);
    hamburgerIcon.classList.remove('rotate-90');
  }
});

// Language toggle
const langDesktop = document.getElementById('lang-toggle');
const langMobile = document.getElementById('lang-toggle-mobile');

function toggleLang() {
  if (langDesktop.textContent === 'मराठी') {
    langDesktop.textContent = 'English';
    langMobile.textContent = 'English';
  } else {
    langDesktop.textContent = 'मराठी';
    langMobile.textContent = 'मराठी';
  }
}

langDesktop.addEventListener('click', toggleLang);
langMobile.addEventListener('click', toggleLang);
