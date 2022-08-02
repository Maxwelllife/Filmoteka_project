// import { refs } from './refs';
const btnGoTop = document.querySelector('.btn-move-up');
window.onscroll = () => {
    if (window.scrollY > 700) {
        refs.btnGoTop.classList.remove('is-hidden');
    } else {
        refs.btnGoTop.classList.add('is-hidden');
    }
};
refs.btnGoTop.onclick = () => {
    window.scrollTo(0, 0);
};
