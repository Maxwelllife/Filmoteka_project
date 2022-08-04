const refs = {
    loader: document.querySelector('.loader__backdrop'),

    gallery: document.querySelector('.gallery'),
    // login: document.querySelector('#user'),
    checkbox: document.querySelector('#genre_checkbox'),

    input: document.querySelector('#search-box'),

    btnGoTop: document.querySelector('.btn-move-up'),

    microphoneIcon: document.querySelector('.header-search__btn-mic'),
    recordIcon: document.querySelector('.header-search__icon-record'),

    genreChoice: document.querySelector('#genre_choice'),
    yearChoice: document.querySelector('#year_choice'),
    sortChoice: document.querySelector('#sort_choice'),
    filterInput: document.querySelectorAll('.filter__input'),

    inputSearch: document.querySelector('.header-search'),

    pagiContainer: document.querySelector('#tui-pagination-container'),
};

export const {
    loader,
    gallery,
    login,
    checkbox,
    input,
    btnGoTop,
    microphoneIcon,
    recordIcon,
    genreChoice,
    yearChoice,
    sortChoice,
    filterInput,
    inputSearch,
    pagiContainer,
} = refs;
