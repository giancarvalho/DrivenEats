const button = document.querySelector(".checkout");
button.disable = true;
let first;
let second;
let third;
let total = 0;

function selectButton(button) {
  let className = "." + button.classList[0];
  let alreadySelected = document.querySelector(className + ".selected");
  if (alreadySelected !== null) {
    alreadySelectedPrice = document.querySelector(
      className + ".selected" + " .price"
    ).innerHTML;
    calcTotal("-", alreadySelectedPrice);
    alreadySelected.classList.remove("selected");
  }
  button.classList.add("selected");
  enableCheckoutButton();
  addToOrder(button);
}

function addToOrder(item) {
  let className = "." + item.classList[0];
  let itemNameOrder = document.querySelector(
    ".order-items " + className + " > .name"
  );
  let itemPriceOrder = document.querySelector(
    ".order-items " + className + " > .price"
  );

  itemNameOrder.innerHTML = document.querySelector(
    className + ".selected" + " .name"
  ).innerHTML;
  itemPriceOrder.innerHTML = document.querySelector(
    className + ".selected" + " .price"
  ).innerHTML;

  addToList(itemNameOrder.innerHTML, className);
  calcTotal("+", itemPriceOrder.innerHTML);
}

function addToList(itemName, className) {
  if (className === ".first") {
    first = itemName;
  } else if (className === ".second") {
    second = itemName;
  } else {
    third = itemName;
  }
}

function calcTotal(operator, price) {
  let confirmTotal = document.querySelector(".total-order");
  price = price.replace(",", ".");
  price = Number(price);

  if (operator === "+") {
    total += price;
  } else {
    total -= price;
  }

  let newTotal = total.toFixed(2);
  confirmTotal.innerHTML = newTotal.replace(".", ",");
}

function sendMessage() {
  let message = encodeURIComponent(
    `Olá, gostaria de fazer o pedido: \n - Prato: ${first} \n - Bebida: ${second} \n - Sobremesa: ${third} \n Total: R$ ${total.toFixed(
      2
    )}`
  );

  window.open(`https://wa.me/5532999744968?text=${message}`, "_self");
}

function enableCheckoutButton() {
  if (
    document.querySelector(".first.selected") !== null &&
    document.querySelector(".second.selected") !== null &&
    document.querySelector(".third.selected") !== null
  ) {
    button.disable = false;
    button.classList.add("active");
    button.innerHTML = "Fechar Pedido";
  }
}

function toggleConfirmWindow() {
  document.querySelector(".overlay").classList.toggle("active");
  document.querySelector(".confirm-order").classList.toggle("active");
}
