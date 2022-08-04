import debounce from 'lodash.debounce';

import {
    loader,
    gallery,
    checkbox,
    input,
    checkbox,
    inputSearch,
    genreChoice,
    pagiContainer,
} from './refsHome';
import FetchFilms from './FetchFilms';
import getPagination from './pagination';
import { createMarkup } from './createMarkup';
import { Notify } from 'notiflix';
import { checkLogin } from './autorization';

let sortBy = '';
let data;

//fetchFilms лучше назвать имя существительным
export const fetchFilms = new FetchFilms();
input.addEventListener('input', debounce(searchFilms, 300));
checkbox.addEventListener('change', selectTypeQuery);

checkLogin();
//выбор ввода
selectTypeQuery();
//первый запрос при перезгрузке страницы популярных фильмов
searchFilms();

export async function searchFilms() {
    fetchFilms.query = input.value.trim();
    const data = await getData();
    if (data.total_results > 20) {
        pagiContainer.removeAttribute('style');
        const pagination = getPagination(data.total_results, 20, pagiContainer);
        pagination.on('afterMove', nextPage);
    } else {
        if (!data.total_results) {
            Notify.failure("We are sorry, but we don't have such films.");
        }
        pagiContainer.setAttribute('style', 'display: none');
    }
    sessionStorage.setItem('window', 'home');
}
async function nextPage(e) {
    fetchFilms.page = e.page;
    const data = await getData();
}

async function getData() {
    loader.classList.remove('visually-hidden');
    try {
        if (checkbox.checked || fetchFilms.year) {
            data = await fetchFilms.fetchFilter();
            if (data.total_results > 10000) {
                data.total_results = 10000;
            }
        } else {
            data = fetchFilms.query
                ? await fetchFilms.fetchFilms()
                : await fetchFilms.fetchPopular();
        }
        if (sortBy) {
            data.results.sort((a, b) => b[sortBy] - a[sortBy]);
        }
        gallery.innerHTML = createMarkup(data.results);
        localStorage.setItem('LS', JSON.stringify(data.results));
    } catch (error) {
        console.log(error);
        Notify.info('Сheck your internet and try again please.');
    }
    loader.classList.add('visually-hidden');

    return data;
}

export function setSortBy(param) {
    sortBy = param;
    data.results.sort((a, b) => b[sortBy] - a[sortBy]);
    gallery.innerHTML = createMarkup(data.results);
}

function selectTypeQuery() {
    if (checkbox.checked) {
        inputSearch.setAttribute('style', 'opacity: 0');
        genreChoice.removeAttribute('style');
    } else {
        genreChoice.setAttribute('style', 'opacity: 0');
        inputSearch.removeAttribute('style');
    }
}
