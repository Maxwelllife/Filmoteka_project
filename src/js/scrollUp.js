// import { refs } from './refs';
const btnGoTop = document.querySelector('.btn-move-up');
window.onscroll = () => {
    if (window.scrollY > 700) {
        btnGoTop.classList.remove('visually-hidden');
    } else {
        btnGoTop.classList.add('visually-hidden');
    }
};
btnGoTop.onclick = () => {
    window.scrollTo(0, 0);
};
