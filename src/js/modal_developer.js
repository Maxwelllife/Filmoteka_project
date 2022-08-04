import Swiper from '/node_modules/swiper/swiper-bundle.min.js';
import '/node_modules/swiper/swiper-bundle.min.css';

const footerSpan = document.querySelector('.footer__link');
const backdrop = document.querySelector('.team-backdrop');
const body = document.querySelector('body');

let swiper = '';
const desktop = 1200;
let windowWidth = document.documentElement.clientWidth;

function openModalHandle() {
  backdrop.classList.remove('is-hidden');
  body.classList.add('stop-scroll');

  if (windowWidth < desktop) {
    swiper = new Swiper('.team-modal', {
      effect: 'cards',
      grabCursor: true,
    });
    return;
  }
  if (windowWidth >= desktop) {
    swiper = new Swiper('.team-modal', {
      effect: 'flip',
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    return;
  }
}

function closeModalHandle({ target }) {
  if (
    target.nodeName !== 'IMG' &&
    target.classList[0] !== 'swiper-button-next' &&
    target.classList[0] !== 'swiper-button-prev'
  ) {
    backdrop.classList.add('is-hidden');
    body.classList.remove('stop-scroll');
    swiper.destroy(true, true);
  }
}

function escCloseHandle(e) {
  if (backdrop.classList.contains('is-hidden')) {
    return;
  }
  if (!backdrop.classList.contains('is-hidden')) {
    if (e.key !== 'Escape') {
      return;
    }
    backdrop.classList.add('is-hidden');
    body.classList.remove('stop-scroll');
    swiper.destroy(true, true);
  }
}

footerSpan.addEventListener('click', openModalHandle);
backdrop.addEventListener('click', closeModalHandle);
document.addEventListener('keydown', escCloseHandle);
