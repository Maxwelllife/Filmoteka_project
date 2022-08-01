import { createMarkup } from './createMarkup';
import getPagination from './pagination';
import getDataBase from './DataBase';

const pagiContainer = document.querySelector('#tui-pagination-container');
const wachedBtn = document.querySelector('.js-watched');
const queueBtn = document.querySelector('.js-queue');
const gallery = document.querySelector('.gallery');
const dataBase = getDataBase();
let pagination;

// const activeBtn = localStorage.getItem('Active') || 'wached';
renderGallery();
// кликнули на кнопку, вызов события клик на кнопки в зависимости от того какая имеет класс "active"
function renderGallery() {
    if (wachedBtn) {
        wachedBtn.addEventListener('click', showLibrary);
        queueBtn.addEventListener('click', showLibrary);
        if (localStorage.getItem('Active') === 'queue') {
            queueBtn.dispatchEvent(new Event('click'));
        } else {
            wachedBtn.dispatchEvent(new Event('click'));
        }
    }
}

function showLibrary(event) {
    wachedBtn.classList.remove('active');
    queueBtn.classList.remove('active');
    event.target.classList.add('active');
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log('user = ', user);
    const userData = user ? dataBase.readUserData(user.uid) : null;

    localStorage.setItem('Active', event.target.name);
    let libraryList = user
        ? userData[event.target.name] || []
        : JSON.parse(localStorage.getItem(event.target.name)) || [];
    // gallery.innerHTML = createMarkup(libraryList);
    const perPage = getPerPage();
    pagination = getPagination(libraryList.length, perPage);
    let visibleList;

    pagination.on('afterMove', event => {
        pagiContainer.removeAttribute('style');
        libraryList = user
            ? userData[localStorage.getItem('Active')] || []
            : JSON.parse(
                  localStorage.getItem(localStorage.getItem('Active'))
              ) || [];

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
    moveToPage(1);
    // const savePage = sessionStorage.getItem('Page') || 1;
    // pagination.movePageTo(savePage);
    // sessionStorage.removeItem('Page');
}
export function moveToPage(page) {
    if (pagination) {
        pagination.movePageTo(page);
    }
}

function getPerPage() {
    let perPage;
    if (window.innerWidth >= 1280) {
        perPage = 9;
    } else if (window.innerWidth >= 768) {
        perPage = 8;
    } else perPage = 4;
    return perPage;
}
