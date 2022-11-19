import * as v from "./variables.js"
import { cleanHTML } from "./cart.js";

// Muesta solo la categoria elegida
export const loadSelectedShoes = (sneakers, brand) => {
  cleanHTML();
  sneakers.map(sneaker => {
    const { id, name, category, price, stock, url } = sneaker;
    if (category === brand) {
      const div = document.createElement('div');
      div.classList.add('shoes-card');
      div.innerHTML = `
              <div class="shoes__card__container">
                <div class="card__img">
                  <a href="product.html?id=${id}"><img src="${url}" alt=""></a>
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
      v.shoesContainer.appendChild(div)

      if (!v.cartContainer.hasChildNodes()) {
        v.cartTablaTotalSpan.textContent = "No hay elementos en el carrito";
      }
    }
  });
};