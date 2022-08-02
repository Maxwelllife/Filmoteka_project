import * as basicLightBox from 'basiclightbox';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    updateCurrentUser,
} from 'firebase/auth';
import { googleIcon } from '../images/google.svg';
import { createPagina } from './showLibrary';
const provider = new GoogleAuthProvider();
const firebaseConfig = {
    apiKey: 'AIzaSyDrR0VC-Mi0_U9m5W0fLBayYLRceve0wHs',
    authDomain: 'filmoteka-project-f6bd1.firebaseapp.com',
    projectId: 'filmoteka-project-f6bd1',
    storageBucket: 'filmoteka-project-f6bd1.appspot.com',
    messagingSenderId: '1071573434337',
    appId: '1:1071573434337:web:1cfe9f5a74283e79461ca0',
    measurementId: 'G-Q1MDB7DMSE',
    databaseURL:
        'https://filmoteka-project-f6bd1-default-rtdb.europe-west1.firebasedatabase.app',
};
const App = initializeApp(firebaseConfig);

const auth = getAuth();
const registrationBtn = document.querySelector('#user');
let regisrationForm, form, google, formLoginization, cancel;

let user = JSON.parse(sessionStorage.getItem('user'));
registrationBtn.addEventListener('click', OpenRegiForm);

console.log('user', user);
console.log('registrationBtn', registrationBtn);

function OpenRegiForm() {
    regisrationForm = basicLightBox.create(
        /*html*/ `
        <form class="form" id='loginForm'>
        <h2 class="form__title">Login</h2>
        <label class="form__label">E-mail
            <input class="form__input" name='email'/>
        </label>
        <label class="form__label">Password
            <input class="form__input" name='password' type="password"/>
        </label>
        <div class="form__thumb">
            <button class ="form__button" type='submit' id='login'>Login</button>
            <button class ="form__button" type='button' id='google'>
                <img src="${googleIcon}"/>
                <span>Sign-in with Google</span>
            </button>
        </div>
    </form>
        <form class="form" id='registrationForm'>
        <h2 class="form__title">
            <span class="form__text">or&nbsp;</span>join</h2>
        <label class="form__label"> Name
            <input class="form__input" name='login'/>
        </label>
        <label class="form__label">E-mail
            <input class="form__input" name='email'/>
        </label>
        <label class="form__label">Password
            <input class="form__input" name='password' type="password"/>
        </label>
        <div class="form__thumb">
            <button class ="form__button" type='submit'>Join</button>
            <button class ="form__button" type='button' id='cancel'>Cancel</button>
    </form>
    `,
        {
            onClose: () => {
                document.body.removeAttribute('style');
            },
        }
    );
    regisrationForm.show();
    document.body.setAttribute('style', 'overflow: hidden');
    form = document.querySelector('#registrationForm');
    google = document.querySelector('#google');
    formLoginization = document.querySelector('#loginForm');
    cancel = document.querySelector('#cancel');

    form.addEventListener('submit', registration);
    google.addEventListener('click', enteringWithGoogle);
    formLoginization.addEventListener('submit', loginization);
    cancel.addEventListener('click', closeModal);
}
async function registration(event) {
    event.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        user = userCredential.user;
        user.displayName = form.login.value;
        updateUser(user.displayName);
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        regisrationForm.close();
    }
    console.log(user);

    afterEnter();
}

async function loginization(event) {
    event.preventDefault();
    const email = formLoginization.email.value;
    const password = formLoginization.password.value;
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        user = userCredential.user;
    } catch (error) {
        console.log(error);
    } finally {
        regisrationForm.close();
    }
    console.log(user);
    afterEnter();
}
async function updateUser(userName) {
    try {
        await updateProfile(auth.currentUser, {
            displayName: userName,
        });
    } catch (error) {
        console.log(error);
    }
}

async function enteringWithGoogle() {
    try {
        const userCredential = await signInWithPopup(auth, provider);
        user = userCredential.user;
    } catch (error) {
        console.log(error);
    } finally {
        regisrationForm.close();
    }
    afterEnter();
}

function afterEnter() {
    sessionStorage.setItem('user', JSON.stringify(user));
    registrationBtn.textContent = user.displayName || 'Anonymous';
    registrationBtn.removeEventListener('click', OpenRegiForm);
    registrationBtn.addEventListener('click', logOutForm);
}
function logOutForm() {
    regisrationForm = basicLightBox.create(/*html*/ `
    <div class="form__container">
        <p class="form__question">Do you want to finish your session?</p>
        <button class ="form__button" type='button' id='logOutBtn'>Logout</button>
        <button class ="form__button" type='button' id='cancel'>Cancel</button>
    </div>`);
    regisrationForm.show();
    const logOutBtn = document.querySelector('#logOutBtn');
    const cancel = document.querySelector('#cancel');
    logOutBtn.addEventListener('click', logOut);
    cancel.addEventListener('click', closeModal);
}
function logOut() {
    sessionStorage.removeItem('user');
    registrationBtn.textContent = 'Login | Join';
    registrationBtn.removeEventListener('click', logOutForm);
    registrationBtn.addEventListener('click', OpenRegiForm);
    regisrationForm.close();
    if (sessionStorage.getItem('window') === 'library') {
        createPagina(localStorage.getItem('Active'), 1);
    }
}

function closeModal() {
    regisrationForm.close();
}

export function checkLogin() {
    if (user) {
        registrationBtn.textContent = user.displayName || 'Anonymous';
        registrationBtn.removeEventListener('click', OpenRegiForm);
        registrationBtn.addEventListener('click', logOutForm);
    } else {
        registrationBtn.textContent = 'Login | Join';
        registrationBtn.removeEventListener('click', logOutForm);
        registrationBtn.addEventListener('click', OpenRegiForm);
    }
}
