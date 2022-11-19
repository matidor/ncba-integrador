const btn = document.querySelector(".navBar__btn");
const panel = document.querySelector(".panel");
const menu = document.querySelector(".menu");
const menuAnchors = document.querySelectorAll(".menu a");

export function hamburguerMenu() {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        btn.classList.toggle("is-active")
        panel.classList.toggle("is-active")
        
    });
}

// Quitamos la clase is-active cuando pasa los 768px
const classListPanel = document.getElementById('panel').classList;
const hamburguerBtn = document.getElementById('hamburguer').classList;
const minWidth768 = window.matchMedia("(min-width: 768px)");

function removeIsActive() {
    if(minWidth768.matches) {
        classListPanel.remove('is-active');
        hamburguerBtn.remove('is-active');
    };
};
minWidth768.addListener(removeIsActive);
