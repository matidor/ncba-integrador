import * as v from "./variables.js";
import { hamburguerMenu } from "./hamburguer-menu.js";
import { sneakers } from "./db.js";
import { cleanCartHTML, sincronizarStorage, getLocalStorage, deleteSneaker, cartItems, updateCartItems, addCartItemsExport, resetCartItems, cartQuantityAdd, cartQuantityRemove } from "./cart.js";

loadEventListeners();
function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', () => {
    hamburguerMenu();
    getInfo();
    getLocalStorage();
    cartHTML();
  });

  // Add to cart
  v.productContainer.addEventListener('click', (e) => {
    // console.log("presionando")
    addToCartProduct(e);
  });


  // Delete from cart
  v.cart.addEventListener("click", deleteSneaker);

  // Empty cart
  v.emptyCart.addEventListener("click", () => {
    resetCartItems()
    cleanCartHTML();
    cartHTML();
  });

  // Buy
  v.buyBtn.addEventListener('click', () => {
    window.location.href = 'login.html'
  });

  // Add quantity to cart
  v.cartTable.addEventListener('click', cartQuantityAdd);

  // Remove quantity to cart
  v.cartTable.addEventListener('click', cartQuantityRemove);
};

const getInfo = () => {
  const url = new URL(window.location);
  const id = url.searchParams.get("id");
  LoadProductCard(id);
};

const LoadProductCard = (id) => {
  sneakers.map(sneaker => {
    if (id === sneaker.id) {
      const { name, category, price, stock, url, info, id } = sneaker;
      const div = document.createElement('div');
      div.classList.add('products__container');
      div.innerHTML = `
            <div class="product__img">
                <img src="${url}" alt="">
            </div>
            <div class="product__info__container">
            <div class="product__name__title">
              <h2>${name}</h2>
            </div>
            <div class="product__category">
              <p>Category: <span>${category}</span></p>
              <p>Availability: <span>${stock}</span></p>
            </div>
            <div class="product__price">
              <p>$ ${price}</p>
            </div>
            <div class="product__info">
              <p>${info}</p>
            </div>
            <div class="product__btn">
              <button class="learn-more">
                <a href="#" class="add-to-cart" data-id="${id}">
                  <span class="circle add-to-cart" aria-hidden="true">
                    <span class="icon arrow add-to-cart"></span>
                  </span>
                  <span class="button-text add-to-cart">Add to Cart</span>
                </a>
              </button>
            </div>
            `
      v.products.appendChild(div);
    }
  })
};

function addToCartProduct(e) {
  if (e.target.classList.contains('add-to-cart')) {
    e.preventDefault();
    const selectedSneaker = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    readDataProduct(selectedSneaker);
  }
};

function readDataProduct(sneaker) {
  const sneakerInfo = {
    img: sneaker.querySelector(".product__img img").src,
    name: sneaker.querySelector(".product__name__title h2").textContent, //Extrameos el texto
    price: sneaker.querySelector(".product__price p").textContent,
    id: sneaker.querySelector(".product__btn a").getAttribute("data-id"),
    cantidad: 1
  }

  // Revisar si existe el elemento en el carrito
  const exists = cartItems.some(sneaker => sneaker.id === sneakerInfo.id);
  if (exists) {
    // Actualizamos la cantidad
    const sneakers = cartItems.map(sneaker => {
      // console.log(sneaker)
      if (sneaker.id === sneakerInfo.id) {
        sneaker.cantidad++;
        return sneaker;
      } else {
        return sneaker;
      }
    });
    updateCartItems(sneakers);

  } else {
    // Agregamos el articulo al carrito
    addCartItemsExport(cartItems, sneakerInfo)
  }
  cartHTML();
};

// Mostrar el carrito en el HTML
function cartHTML() {

  let cartListTotal = 0;

  if (cartListTotal === 0) {
    v.cartTablaTotalSpan.textContent = "No hay elementos en el carrito";
  }

  //Limpiar carrito HTML
  cleanCartHTML();

  // Recorrer el carrito
  cartItems.forEach(sneaker => {
    // Falta cantidad, VER COMO LO HAGO
    const { img, name, price, cantidad, id } = sneaker;
    // console.log(img, name, price, cantidad, id)
    cartListTotal += parseInt(price.slice(2)) * cantidad;
    // console.log(cartListTotal)
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
          <img src="${img}">
      </td>
      <td>${name}</td>
      <td>${price}</td>
      <td>
      <button>-</button>
      ${cantidad}
      <button>+</button>
      </td>
      <td>
          <a href="#" class="delete-sneaker" data-id="${id}"> X </a>  
      </td>
      `
    v.cartContainer.appendChild(row);
    // Quitar el parrafo y agregar total
    if (cartListTotal > 0) {
      v.cartTablaTotalSpan.textContent = `Total $ ${cartListTotal}`;
    }
  });
  // Agregar el carrito de compras al storage
  sincronizarStorage();
}
