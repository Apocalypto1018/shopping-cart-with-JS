const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");

const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCar = document.getElementById("template-carrito").content;

const fragment = document.createDocumentFragment();

let cart = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    paintCart();
  }
});

cards.addEventListener("click", (e) => {
  addCart(e);
});

items.addEventListener("click", (e) => {
  btnIncreaseDecrease(e);
});

const fetchData = async () => {
  const res = await fetch("/src/scripts/api.json");
  const data = await res.json();

  pintarCards(data);
};

const pintarCards = (data) => {
  data.forEach((item) => {
    templateCard.querySelector("h5").textContent = item.title;
    templateCard.querySelector("p").textContent = item.price;
    templateCard.querySelector("button").dataset.id = item.id;
    templateCard.querySelector("img").setAttribute("src", item.thumbnailUrl);
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

const addCart = (e) => {
  if (e.target.classList.contains("btn-primary")) {
    setcart(e.target.parentElement);
  }
  e.stopPropagation();
};

const setcart = (item) => {
  const product = {
    id: item.querySelector(".btn-primary").dataset.id,
    title: item.querySelector("h5").textContent,
    price: item.querySelector("p").textContent,
    quantity: 1,
  };
  if (cart.hasOwnProperty(product.id)) {
    product.quantity = cart[product.id].quantity + 1;
  }
  cart[product.id] = { ...product };
  paintCart();
};

const paintCart = () => {
  items.innerHTML = " ";
  Object.values(cart).forEach((product) => {
    templateCar.querySelector("th").textContent = product.id;
    templateCar.querySelectorAll("td")[0].textContent = product.title;
    templateCar.querySelectorAll("td")[1].textContent = product.quantity;
    templateCar.querySelector("span").textContent =
      product.price * product.quantity;
    templateCar.querySelector(".btn-primary").dataset.id = product.id;
    templateCar.querySelector(".btn-danger").dataset.id = product.id;

    const clone = templateCar.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
  paintFooter();
  localStorage.setItem("cart", JSON.stringify(cart));
};

const paintFooter = () => {
  footer.innerHTML = " ";

  if (Object.keys(cart).length === 0) {
    footer.innerHTML = `
      <th scope="row" colspan="5">Buy Whatever - start shopping!</th>
      `;
    return;
  }

  const nquantity = Object.values(cart).reduce(
    (acc, { quantity }) => acc + quantity,
    0
  );
  const nPrice = Object.values(cart).reduce(
    (acc, { quantity, price }) => acc + quantity * price,
    0
  );

  templateFooter.querySelectorAll("td")[0].textContent = nquantity;
  templateFooter.querySelector("span").textContent = nPrice;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);

  footer.appendChild(fragment);

  const button = document.querySelector("#empty-cart");
  button.addEventListener("click", () => {
    cart = {};
    paintCart();
  });
};

const btnIncreaseDecrease = (e) => {
  if (e.target.classList.contains("btn-primary")) {
    const product = cart[e.target.dataset.id];
    product.quantity++;
    cart[e.target.dataset.id] = { ...product };
    paintCart();
  }

  if (e.target.classList.contains("btn-danger")) {
    const product = cart[e.target.dataset.id];
    product.quantity--;
    if (product.quantity === 0) {
      delete cart[e.target.dataset.id];
    } else {
      cart[e.target.dataset.id] = { ...product };
    }
    paintCart();
  }
  e.stopPropagation();
};
