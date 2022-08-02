import getDataBase from './DataBase';

const dataBase = getDataBase();
let addWatchedModal, addQueueModal;
let currentLi;
let userData;
// let user;
// export function setUser(newUser) {
//     user = newUser;
// }

async function addRemoveLibraryFilm(event) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    userData = user ? await dataBase.readUserData(user.uid) : null;
    // опеределяем кна какую кнопку нажали
    const btn = event.target;

    // на странице
    const filmListOnHomePage = JSON.parse(localStorage.getItem('LS'));
    const listfilm = user
        ? userData[btn.name] || []
        : JSON.parse(localStorage.getItem(btn.name)) || [];
    const index = listfilm.findIndex(
        ({ id }) => id === Number(currentLi.dataset.id)
    );
    if (index === -1) {
        listfilm.push(filmListOnHomePage[currentLi.id]);
        btn.textContent = `remove from ${btn.name}`;
    } else {
        listfilm.splice(index, 1);
        btn.textContent = `add to ${btn.name}`;
    }
    console.log('userData2: ', userData);

    if (user) {
        userData[btn.name] = listfilm;
        dataBase.writeUserData(
            user.uid,
            userData.watched || [],
            userData.queue || []
        );
    } else localStorage.setItem(btn.name, JSON.stringify(listfilm));
}

export async function renderModalButtons(item) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    addWatchedModal = document.querySelector('.js-addtowatched');
    addQueueModal = document.querySelector('.js-addtoqueue');
    addWatchedModal.addEventListener('click', addRemoveLibraryFilm);
    addQueueModal.addEventListener('click', addRemoveLibraryFilm);
    currentLi = item;

    // в библиотеке
    let listWatched, listQueue;
    if (user) {
        userData = await dataBase.readUserData(user.uid);
        listWatched = userData.watched || [];
        listQueue = userData.queue || [];
    } else {
        listWatched = JSON.parse(localStorage.getItem('watched')) || [];
        listQueue = JSON.parse(localStorage.getItem('queue')) || [];
    }

    //сравнили есть ли в библиотеке
    const indexWatched = listWatched.findIndex(
        ({ id }) => id === Number(item.dataset.id)
    );
    const indexQueue = listQueue.findIndex(
        ({ id }) => id === Number(item.dataset.id)
    );

    //переписали название кнопок
    addWatchedModal.textContent =
        indexWatched === -1 ? 'add to watched' : 'remove from watched';
    addQueueModal.textContent =
        indexQueue === -1 ? 'add to queue' : 'remove from queue';
}
