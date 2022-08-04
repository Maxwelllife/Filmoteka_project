import {
    loader,
    genreChoice,
    yearChoice,
    sortChoice,
    filterInput,
} from './refsHome';
import genres from '../genres.json';
import { fetchFilms, searchFilms, setSortBy } from './searchFilms';

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
    if (e.target.name === 'sort') {
        setSortBy(e.target.value);
        console.log(e.target.value);

        return;
    }
    loader.classList.remove('visually-hidden');
    fetchFilms[e.target.name] = e.target.value;
    console.log(fetchFilms);
    searchFilms();
    loader.classList.add('visually-hidden');
}
