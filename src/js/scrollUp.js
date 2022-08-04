
import { btnGoTop } from './refsHome';
window.onscroll = () => {
    if (window.scrollY > 700) {
        btnGoTop.classList.remove('visually-hidden');
        btnGoTop.classList.add('bounce-in-top');
    } else {
        btnGoTop.classList.remove('bounce-in-top');
        btnGoTop.classList.add('visually-hidden');
    }
};
btnGoTop.onclick = () => {
    window.scrollTo(0, 0);
};
