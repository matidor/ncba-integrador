import * as v from './variables.js';
import { hamburguerMenu } from './hamburguer-menu.js'

let username = "mati";
let password = javier;

document.addEventListener('DOMContentLoaded', () => {
    hamburguerMenu();
});

v.formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    formValidation();
})

const formValidation = () => {
    if (v.loginUsername.value === '') {
        showErrorLogin('Username is required. Please try again')
        return;
    } else if (v.loginPassword.value === '') {
        showErrorLogin('Password is required. Please try again')
        return;
    } else {
        if (v.loginUsername.value === username && parseInt(v.loginPassword.value) === password) {
            // console.log(username)
            loginMsg("Login succesfull")
        } else {
            showErrorLogin('Username or password incorrect. Please try again')
        }
    }
};

function loginMsg(message) {
    cleanErrorLogin();
    const alerta = document.createElement('p')
    alerta.style = 'background:green;color:white;width:100%;margin:2rem auto 0;padding:1rem;text-align:center;border-radius:5px;'
    alerta.innerText = message
    v.formError.appendChild(alerta)
    setTimeout(() => {
        alerta.remove();
    }, 3500)
}

function showErrorLogin(message) {
    cleanErrorLogin();
    const alerta = document.createElement('p')
    alerta.style = 'background:red;color:white;width:100%;margin:2rem auto 0;padding:1rem;text-align:center;border-radius:5px;'
    alerta.innerText = message
    v.formError.appendChild(alerta)
    setTimeout(() => {
        alerta.remove();
    }, 3500);
};

function cleanErrorLogin() {
    while (v.formError.firstChild) {
        v.formError.removeChild(v.formError.firstChild)
    }
};