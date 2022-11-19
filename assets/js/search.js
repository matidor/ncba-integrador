import * as v from "./variables.js"
import { cleanHTML } from "./cart.js";
import { sneakers } from "./db.js";
import { showError } from "./error.js";

const inputSearch = document.querySelector(".search input");

export function searchSneakers() {
    cleanHTML();
    let searchResult = [];
    let searchValue = inputSearch.value.toLowerCase();

    if (searchValue === "") {
        showError("The search field is empty. You can try by name, price or category. Please try again");
        return;
    } else {
        sneakers.map(sneaker => {
            const { name, category, price } = sneaker;
            if (category.toLowerCase() === searchValue) {
                // Agregar al array searchresult la sneaker
                searchResult.push(sneaker)
                return;
            } else if (name.toLowerCase().includes(searchValue)) {
                searchResult.push(sneaker)
                return;
            } else if (price.toString().includes(searchValue)) {
                searchResult.push(sneaker)
                return;
            }
        });

        if (searchResult.length === 0) {
            showError("There are no sneakers with the searched parameters. You can try by name, price or category. Please try again")
        }
    }
    // Llamar funcion que tome como parametro el array searchResult y lo muestre en el DOM, limpiando lo anterior
    showSearchDOM(searchResult);
};

function showSearchDOM(arr) {
    cleanHTML();
    arr.map(sneaker => {
        const { id, name, category, price, stock, url } = sneaker;
        const div = document.createElement('div');
        div.classList.add('shoes-card');
        div.innerHTML = `
            <div class="shoes__card__container">
                <div class="card__img">
                    <img src="${url}" alt="">
                </div>
                <div class="card__name">
                    <p>${name}</p>
                </div>
                <div class="card__category">
                    <p>${category}</p>
                </div>
                <div class="card__price">
                    <p>$ ${price}</p>
                </div>
                <div class="card__btn">
                    <button class="learn-more">
                        <a href="#" class="add-to-cart" data-id="${id}">
                            <span class="circle add-to-cart" aria-hidden="true">
                            <span class="icon arrow add-to-cart"></span>
                            </span>
                            <span class="button-text add-to-cart">Add to Cart</span>
                        </a>
                    </button>
                </div>
            </div>
            `
        v.shoesContainer.appendChild(div);
    });
};