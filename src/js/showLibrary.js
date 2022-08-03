import { createMarkup } from './createMarkup';
import getPagination from './pagination';
import getDataBase from './DataBase';
import { checkLogin } from './autorization';

const pagiContainer = document.querySelector('#tui-pagination-container');
const wachedBtn = document.querySelector('.js-watched');
const queueBtn = document.querySelector('.js-queue');
const gallery = document.querySelector('.gallery');
const dataBase = getDataBase();
let pagination;

document.body.addEventListener('close', rerender);

function rerender() {
    createPagina(
        localStorage.getItem('Active'),
        sessionStorage.getItem('Page')
    );
}

checkLogin();

renderGallery();
// кликнули на кнопку, вызов события клик на кнопки в зависимости от того какая имеет класс "active"
function renderGallery() {
    if (wachedBtn) {
        wachedBtn.addEventListener('click', showLibrary);
        queueBtn.addEventListener('click', showLibrary);
        if (localStorage.getItem('Active') === 'queue') {
            //имитация клика на кнопку
            queueBtn.dispatchEvent(new Event('click'));
        } else {
            wachedBtn.dispatchEvent(new Event('click'));
        }
    }
    sessionStorage.setItem('window', 'library');
}

function showLibrary(event) {
    wachedBtn.classList.remove('active');
    queueBtn.classList.remove('active');
    event.target.classList.add('active');

    localStorage.setItem('Active', event.target.name);
    createPagina(event.target.name, 1);
    // вычитываем необходимую библиотеку

    // moveToPage(1);
}

// export function moveToPage(page) {
//     if (pagination) {
//         pagination.movePageTo(page);
//     }
// }
function getPerPage() {
    let perPage;
    if (window.innerWidth >= 1280) {
        perPage = 9;
    } else if (window.innerWidth >= 768) {
        perPage = 8;
    } else perPage = 4;
    return perPage;
}

export async function createPagina(buttonName, currentPage) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    // console.log('user = ', user);
    let userData = user ? await dataBase.readUserData(user.uid) : null;
    userData = userData || {};

    let libraryList = user
        ? userData[buttonName] || []
        : JSON.parse(localStorage.getItem(buttonName)) || [];
    console.log('userData: ', userData);
    // gallery.innerHTML = createMarkup(libraryList);
    const perPage = getPerPage();
    // заново строим пагинацию
    pagination = getPagination(libraryList.length, perPage);
    let visibleList;

    pagination.on('afterMove', event => {
        pagiContainer.removeAttribute('style');

        // если меньше фильмов чем на одной странице может быть то убрать пагинацию
        if (libraryList.length <= perPage) {
            console.log(event.page);
            if (event.page === 2) {
                moveToPage(1);
                return;
            }
            pagiContainer.setAttribute('style', 'display: none');
        }
        // if (!libraryList.length) {
        //     pagiContainer.setAttribute('style', 'display: none');
        // }
        visibleList = libraryList.slice(
            event.page * perPage - perPage,
            event.page * perPage
        );
        console.log('we are on event page: ', event.page);
        gallery.innerHTML = createMarkup(visibleList);
        localStorage.setItem('LS', JSON.stringify(visibleList));
        sessionStorage.setItem('Page', event.page);
    });
    // const savePage = sessionStorage.getItem('Page') || 1;
    // sessionStorage.removeItem('Page');
    pagination.movePageTo(currentPage);
}

// function checkLogin() {
//     const user = sessionStorage.getItem('user');
//     login.textContent = user ? user.displayName || 'Anonymous' : 'login | join';
// }
