import * as v from "./variables.js"
import { hamburguerMenu } from "./hamburguer-menu.js"
import { sneakers } from "./db.js"
import { loadSelectedShoes } from "./loadshoes.js"
import { searchSneakers } from "./search.js";
import { addToCart, deleteSneaker, resetCartItems, cleanCartHTML, cartHTML, getLocalStorage, cartQuantityAdd, cartQuantityRemove } from "./cart.js";

LoadEventlisteners()
function LoadEventlisteners() {
    document.addEventListener('DOMContentLoaded', () => {
        hamburguerMenu();
        loadSelectedShoes(sneakers, "Tenis")

        getLocalStorage();
        cartHTML();
    });

    v.classicBtn.addEventListener('click', e => {
        e.preventDefault();
        loadSelectedShoes(sneakers, "classic");
    });

    v.botitasBtn.addEventListener('click', e => {
        e.preventDefault();
        loadSelectedShoes(sneakers, "botitas");
    });

    v.unicasBtn.addEventListener('click', e => {
        e.preventDefault();
        loadSelectedShoes(sneakers, "unicas");
    });


    v.shoesList.addEventListener('click', addToCart);


    v.cart.addEventListener("click", deleteSneaker);


    v.inputSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchSneakers();
    });

    v.emptyCart.addEventListener("click", () => {
        resetCartItems()
        cleanCartHTML();
        cartHTML();
    });

    v.buyBtn.addEventListener('click', () => {
        window.location.href = 'login.html'
    })

    v.cartTable.addEventListener('click', cartQuantityAdd);


    v.cartTable.addEventListener('click', cartQuantityRemove);
};
