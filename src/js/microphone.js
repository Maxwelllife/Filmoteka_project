import { Notify } from 'notiflix';
import { input, microphoneIcon, recordIcon } from './refsHome';
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let avalible = true;
let recognition;
try {
    recognition = new SpeechRecognition();

    recognition.lang = 'en-EN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onnomatch = function (e) {
        Notify.failure("I didn't recognise that movie. Try again please");
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
} catch {
    avalible = false;
}

microphoneIcon.addEventListener('click', function () {
    input.value = '';
    if (avalible) {
        startRecognition();
    } else alert('Your browser is not configured to use the microphone. Use normal search or search by genre');
});
function listenSpeech(e) {
    const transcript = e.results[0][0].transcript;
    input.value = transcript;
    if (e.results[0].isFinal) {
        recognition.onspeechend = stopRecognition();
    }
    input.dispatchEvent(new Event('input'));
}

function startRecognition() {
    recognition.addEventListener('result', listenSpeech);
    recordIcon.classList.remove('visually-hidden');
    microphoneIcon.classList.add('-active');
    recognition.start();
}
function stopRecognition() {
    recognition.removeEventListener('result', listenSpeech);
    recordIcon.classList.add('visually-hidden');
    microphoneIcon.classList.remove('-active');
    recognition.stop();
  
}
