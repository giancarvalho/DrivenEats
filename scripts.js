function selectButton(button) {
  let alreadySelected = document.querySelector(
    "." + button.classList[0] + ".selected"
  );
  if (alreadySelected !== null) {
    document;
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
    className + ".selected" + " .product-name"
  ).innerHTML;
  itemPriceOrder.innerHTML = document.querySelector(
    className + ".selected" + " .price"
  ).innerHTML;
}

const button = document.querySelector(".checkout");
button.disable = true;

function calcTotal() {
  let total = document.querySelector(".total-order");
  let firstItemPrice = document
    .querySelector(".order-items .first > .price")
    .innerHTML.replace(",", ".");
  let secondItemPrice = document
    .querySelector(".order-items .second > .price")
    .innerHTML.replace(",", ".");
  let thirdItemPrice = document
    .querySelector(".order-items .third > .price")
    .innerHTML.replace(",", ".");

  total.innerHTML =
    Number(firstItemPrice) + Number(secondItemPrice) + Number(thirdItemPrice);
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
    calcTotal();
  }
}

function openConfirmOrder() {
  document.querySelector(".overlay").classList.add("active");
  document.querySelector(".confirm-order").classList.add("active");
}

function cancel() {
  document.querySelector(".overlay").classList.remove("active");
  document.querySelector(".confirm-order").classList.remove("active");
}
