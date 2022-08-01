const checkbox = document.querySelector('#genre_checkbox');
const inputSearch = document.querySelector('.header-search');
const genreChoice = document.querySelector('#genre_choice');

checkbox.addEventListener('change', selectTypeQuery);
selectTypeQuery();
function selectTypeQuery() {
    console.log(checkbox.checked);
    if (checkbox.checked) {
        inputSearch.setAttribute('style', 'opacity: 0');
        genreChoice.removeAttribute('style');
    } else {
        genreChoice.setAttribute('style', 'opacity: 0');
        inputSearch.removeAttribute('style');
    }
}
