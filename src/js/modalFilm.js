import * as basicLightBox from 'basiclightbox';
import { modalFilmContent } from './modalFilmContent';
import FetchFilms from './FetchFilms';
import { renderModalButtons } from './modalButtons';
import { Notify } from 'notiflix';

// эта ссылка используеться в двух модалка на разных страницах по-этому конст остаеться здесь
const gallery = document.querySelector('.gallery');
const fetchTrailer = new FetchFilms();
let modalFilm;
let item;
gallery.addEventListener('click', openModal);

function openModal(eve) {
    const node = eve.target.parentNode;
    if (node.nodeName === 'LI') {
        item = node;
    } else if (node.parentNode.nodeName === 'LI') {
        item = node.parentNode;
    } else return;

    //притащили из localStorage список фильмов которые отображаются на странице не важно где мы находимся
    const filmList = JSON.parse(localStorage.getItem('LS'));
    //filmList[item.id] - тот фильм на который мы нажали
    modalFilm = basicLightBox.create(modalFilmContent(filmList[item.id]), {
        onShow: () => {
            document.body.setAttribute('style', 'overflow: hidden');
            document.addEventListener('keydown', closeModalByESC);
        },
        onClose: () => {
            document.body.removeAttribute('style');
            document.removeEventListener('keydown', closeModalByESC);
            if (sessionStorage.getItem('window') === 'library') {
                document.body.dispatchEvent(new Event('close'));
            }
        },
    });

    modalFilm.show();

    const closeCross = document.querySelector('[data-modal-close]');
    const trailerBTN = document.querySelector('.js-playtrailer');
    closeCross.addEventListener('click', closeModal);
    trailerBTN.addEventListener('click', playTrailer);

    renderModalButtons(item);
}

async function playTrailer() {
    const trailer = await fetchTrailer.fetchTrailer(item.dataset.id);
    const movieTrailer = trailer.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
    );
    if (movieTrailer) {
        const modalTrailer =
            basicLightBox.create(`<iframe width="560" height="315" 
        src="https://www.youtube.com/embed/${movieTrailer.key}" 
        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
      `);
        modalTrailer.show();
    } else
        Notify.failure("Unfortunately we don't have a trailer for this movie.");
}
function closeModal() {
    modalFilm.close();
}
function closeModalByESC(event) {
    if (event.key === 'Escape') {
        modalFilm.close();
    }
}
