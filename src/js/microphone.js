// import { MovieApi } from './fetchFilms';
// import { makeMarkup } from './cardMarkup';
// import { paginationTui, paginationStart } from './pagination';
// import { popular, search } from './gallery';
// import { filter } from './filter';
// import { alertNoEmptySearch, alertNoFilmsFound } from './alerts';
// import refs from './refs';
// const galleryEl = document.querySelector('.gallery');
import { input } from './searchFilms';
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

// const movieApi = new MovieApi();
const microphoneIcon = document.querySelector('.header-search__btn-mic');
const recordIcon = document.querySelector('.header-search__icon-record');
// const input = document.querySelector('.js-search');
const recognition = new SpeechRecognition();

recognition.lang = 'en-EN';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

microphoneIcon.addEventListener('click', function () {
    input.value = '';
    startRecognition();

    console.log('Ready to receive a movieName command.');
});

recognition.onnomatch = function (e) {
    alert("I didn't recognise that movie.");
    recordIcon.classList.add('visually-hidden');
    microphoneIcon.classList.remove('-active');
    recognition.stop();
};

recognition.onerror = function (e) {
    alert(`Error occurred in recognition: ${e.error}`);
    recordIcon.classList.add('visually-hidden');
    microphoneIcon.classList.remove('-active');
    recognition.stop();
};

function listenSpeech(e) {
    const transcript = e.results[0][0].transcript;
    input.value = transcript;
    if (e.results[0].isFinal) {
        console.log('is Final', e.results[0].isFinal);
        recognition.onspeechend = stopRecognition();
    }
    // onSearchInputForMicrophone(transcript);
    input.dispatchEvent(new Event('input'));
}

function startRecognition() {
    recognition.addEventListener('result', listenSpeech);
    recordIcon.classList.remove('visually-hidden');
    microphoneIcon.classList.add('-active');
    recognition.start();
}
function stopRecognition() {
    console.log('Speech has stopped being detected');
    recognition.removeEventListener('result', listenSpeech);
    recordIcon.classList.add('visually-hidden');
    microphoneIcon.classList.remove('-active');
    recognition.stop();
    console.log('recognition.stop', recognition.stop());
}

// const onSearchInputForMicrophone = async movieName => {
//     // paginationTui.off('afterMove', popular);
//     // paginationTui.off('afterMove', search);
//     // paginationTui.off('afterMove', filter);
//     // paginationTui.movePageTo(1);

//     movieApi.page = 1;
//     movieApi.query = movieName;
//     try {
//         const { data } = await movieApi.fetchFilms();

//         if (data.total_pages < 2) {
//             refs.paginationWrap.classList.add('tui-pagination', 'hidden');
//         } else refs.paginationWrap.classList.remove('tui-pagination', 'hidden');
//         if (movieApi.query === '') {
//             alertNoEmptySearch();
//             return;
//         } else if (data.total_results === 0) {
//             alertNoFilmsFound();
//             return;
//         } else {
//             galleryEl.innerHTML = makeMarkup(data.results);
//         }
//         paginationTui.on('afterMove', microphon);
//         paginationTui.reset(data.total_results);
//     } catch (err) {
//         galleryEl.innerHTML = '';
//         console.log(err.message);
//     }
// };
// export async function microphon(eventData) {
//     movieApi.page = eventData.page;
//     const { data } = await movieApi.fetchFilms();
//     galleryEl.innerHTML = makeMarkup(data.results);
// }
