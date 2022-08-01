import genres from '../genres.json';
import { fetchFilms } from './searchFilms';
import { createMarkup } from './createMarkup';

const genreChoice = document.querySelector('#genre_choice');
const yearChoice = document.querySelector('#year_choice');
const sortChoice = document.querySelector('#sort_choice');
const filterInput = document.querySelectorAll('.filter__input');
const gallery = document.querySelector('.gallery');
const inputSearch = document.querySelector('#search-box');
filterInput.forEach(item => item.addEventListener('change', onFilterChoice));

renderGenreMenu();
yearMenu();

function renderGenreMenu() {
    const genresKey = Object.keys(genres);
    const genresMarkup = [];
    for (const key of genresKey) {
        genresMarkup.push(`<option value="${key}">${genres[key]}</option>`);
    }
    genreChoice.insertAdjacentHTML('beforeend', genresMarkup.join(''));
}

function yearMenu() {
    let startYear = 1969;
    let realYear = new Date().getFullYear();
    let years = [];

    yearChoice.insertAdjacentHTML(
        'beforeend',
        '<option value="">Choose year</option>'
    );
    for (let i = realYear; i > startYear; i -= 1) {
        years.push(`<option value="${i}">${i}</option>`);
    }
    yearChoice.insertAdjacentHTML('beforeend', years.join(''));
}

async function onFilterChoice(e) {
    fetchFilms[e.target.name] = e.target.value;
    const data = await fetchFilms.fetchFilter();
    gallery.innerHTML = createMarkup(data.results);
    localStorage.setItem('LS', JSON.stringify(data.results));

    // e.preventDefault();

    // movieApi[e.target.name] = e.target.value;
    // try {
    //   let promise;
    //   movieApi.page = 1;
    //   movieApi.genre
    //     ? (promise = await movieApi.fetchMovieFilterWithGenres())
    //     : (promise = await movieApi.fetchMovieFilterWithoutGenres());
    //   if (promise.data.total_pages < 2) {
    //     refs.paginationWrap.classList.add('tui-pagination', 'hidden');
    //   }
    //   if (promise.data.results.length === 0) {
    //     refs.paginationWrap.classList.add('tui-pagination', 'hidden');
    //   }
    //   paginationStart(promise.data);
    //   galleryEl.innerHTML = makeMarkup(promise.data.results);
    //   paginationTui.on('afterMove', filter);
    // } catch (err) {
    //   galleryEl.innerHTML = '';
    // }
}
