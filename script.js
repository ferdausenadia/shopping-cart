let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];
//console.log(JSON.parse(localStorage.getItem("data")));

let generateShop = () => {
  return (shop.innerHTML = shopItems
    .map((item) => {
      let { id, name, price, desc, img } = item;
      let search = basket.find((x) => x.id == id) || [];

      //console.log(basket.id);
      console.log(search);
      return `
    <div id="product-id-${id}" class="item">
        <img width="220px" height="220px" src=${img} alt="" />
        <div class="details">
          <h3>${name}</h3>
          <p>
            ${desc}
          </p>
          <div class="priceQuantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id="${id}" class="quantity">
            ${search.item === undefined ? 0 : search.item}
      
      </div>
              <i onclick="increment(${id})" class="bi bi-plus"></i>
            </div>
          </div>
        </div>
      </div>
      `;
    })
    .join(""));
};
generateShop();
//increment decrement function

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

  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();
