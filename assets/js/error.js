import * as v from "./variables.js"
import { loadSelectedShoes } from "./loadshoes.js";
import { sneakers } from "./db.js";

export function showError(message) {
    cleanErrorHTML()
    const alerta = document.createElement('p')
    alerta.style = 'background:red;color:white;width:85%;max-width:510px;margin:1rem auto;padding:1rem;text-align:center;border-radius:5px;'
    alerta.innerText = message
    v.errorContainer.appendChild(alerta)
    setTimeout(() => {
        alerta.remove();
        loadSelectedShoes(sneakers, "Tenis");
    }, 3000);
};

export function cleanErrorHTML() {
    while (v.errorContainer.firstChild) {
        v.errorContainer.removeChild(v.errorContainer.firstChild)
    }
};

export function showErrorLogin(message) {
    cleanErrorHTML()
    const alerta = document.createElement('p')
    alerta.style = 'background:red;color:white;width:85%;max-width:510px;margin:1rem auto;padding:1rem;text-align:center;border-radius:5px;'
    alerta.innerText = message
    v.formError.appendChild(alerta)
    setTimeout(() => {
        alerta.remove();
    }, 3000);
};