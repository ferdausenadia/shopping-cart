let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    //console.log("not empty");
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItems.find((y) => y.id == id) || [];
        return `
      <div class="cart-item">
      
      <img width="100" src=${search.img} alt=""/>
      <div class="details">
      <div class="title-price-btn">
      <h4 class="title-price">
      <p>${search.name}</p>
      <p class="cart-item-price">$ ${search.price}</p>
      </h4>
      <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
      </div>
      <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id="${id}" class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus"></i>
            </div>
      <h3>$ ${item * search.price}</h3>
      </div>
      </div>`;
      })
      .join(""));
  } else {
    //console.log("empty");
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `<h2>Cart is empty</h2>
    <a href="index.html">
    <button class="HomeBtn">Go Back Home</button>
    </a>`;
  }
};
generateCartItems();
let increment = (id) => {
  let search = basket.find((x) => x.id === id);
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  //console.log(basket);
  generateCartItems();
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};

//decrement function
let decrement = (id) => {
  let search = basket.find((x) => x.id === id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();

  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  //console.log(selectedItem);
  basket = basket.filter((x) => x.id != selectedItem);
  generateCartItems();
  totalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearAll = () => {
  //console.log("cs");
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItems.find((y) => y.id == id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `<h2>Total Bill : ${amount}</h2>
    <button class="checkOut">Checkout</button>
    <button onclick="clearAll()" class="clearAll">Clear All</button>`;
  } else {
    return;
  }
};

totalAmount();
