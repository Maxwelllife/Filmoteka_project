import debounce from 'lodash.debounce';
import FetchFilms from './FetchFilms';
import getPagination from './pagination';
import { createMarkup } from './createMarkup';
import { Notify } from 'notiflix';
import { checkLogin } from './autorization';

const pagiContainer = document.querySelector('#tui-pagination-container');
export const input = document.querySelector('#search-box');
const gallery = document.querySelector('.gallery');
const login = document.querySelector('#user');
//fetchFilms лучше назвать имя существительным
export const fetchFilms = new FetchFilms();

input.addEventListener('input', debounce(searchFilms, 300));
console.log('hello');
checkLogin();
//первый запрос при перезгрузке страницы популярных фильмов
searchFilms();

async function searchFilms() {
    // fetchFilms.page = 1;
    fetchFilms.query = input.value.trim();
    const data = await getData();
    if (data.total_results > 20) {
        pagiContainer.removeAttribute('style');
        const pagination = getPagination(data.total_results, 20);
        pagination.on('afterMove', nextPage);
    } else {
        if (!data.total_results) {
            Notify.failure('Write somethig correct');
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
    let data;
    try {
        data = fetchFilms.query
            ? await fetchFilms.fetchFilms()
            : await fetchFilms.fetchPopular();
        // console.log(data);
        gallery.innerHTML = createMarkup(data.results);
        localStorage.setItem('LS', JSON.stringify(data.results));
    } catch (error) {
        console.log(error);
    }
    return data;
}

// function checkLogin() {
//     const user = sessionStorage.getItem('user');
//     login.textContent = user ? user.displayName || 'Anonymous' : 'login | join';
// }
