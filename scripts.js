// global varibles
const button = document.querySelector(".checkout");
button.disable = true;
let first;
let second;
let third;
let total = 0;

// allows only one button to be selected per class
function selectButton(item) {
  let className = "." + item.classList[0];
  let alreadySelected = document.querySelector(className + ".selected");

  // checks if another button of the class has already been selected
  if (alreadySelected !== null) {
    alreadySelectedPrice = document.querySelector(
      className + ".selected" + " .price"
    ).innerHTML;
    // calls calcTotal to subtract the diselected price from the total sum
    calcTotal("-", alreadySelectedPrice);
    alreadySelected.classList.remove("selected");
  }
  item.classList.add("selected");
  // calls enableCheckoutButton function to check if all conditions are met
  enableCheckoutButton();
  // pass on which class triggered the event to add item to order list
  addToOrder(className);
}
// add items to Confirm Order list, placing them at their respective positions
function addToOrder(className) {
  // fetch the positon of the class on Confirm Order list
  let itemNameOrder = document.querySelector(
    ".order-items " + className + " > .name"
  );
  let itemPriceOrder = document.querySelector(
    ".order-items " + className + " > .price"
  );
  // insert name and price of the item to the confirm order list
  itemNameOrder.innerHTML = document.querySelector(
    className + ".selected" + " .name"
  ).innerHTML;
  itemPriceOrder.innerHTML = document.querySelector(
    className + ".selected" + " .price"
  ).innerHTML;
  // pass on item name and price to form the message and calculate the total
  addNameToMessage(itemNameOrder.innerHTML, className);
  calcTotal("+", itemPriceOrder.innerHTML);
}

// assign item name to the its respective variable
function addNameToMessage(itemName, className) {
  if (className === ".first") {
    first = itemName;
  } else if (className === ".second") {
    second = itemName;
  } else {
    third = itemName;
  }
}
// keeps track of the total sum
function calcTotal(operator, price) {
  let confirmTotal = document.querySelector(".total-order");
  price = price.replace(",", ".");
  price = Number(price);

  if (operator === "+") {
    total += price;
  } else {
    total -= price;
  }
  // insert total sum in the confirm order list
  let newTotal = total.toFixed(2);
  confirmTotal.innerHTML = newTotal.replace(".", ",");
}

// compose WhatsApp message and encodes it
function sendMessage() {
  let message = encodeURIComponent(
    `Olá, gostaria de fazer o pedido: \n - Prato: ${first} \n - Bebida: ${second} \n - Sobremesa: ${third} \n Total: R$ ${total.toFixed(
      2
    )}`
  );
  window.open(`https://wa.me/5532999744968?text=${message}`, "_self");
}

// see if all three buttons have been selected to activate checkout button

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

// toggles confirm window and overlay
function toggleConfirmWindow() {
  document.querySelector(".overlay").classList.toggle("active");
  document.querySelector(".confirm-order").classList.toggle("active");
}
