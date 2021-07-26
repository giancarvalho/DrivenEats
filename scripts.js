// global varibles
const button = document.querySelector(".checkout");
button.disable = true;
let customerName;
let customerAddress;
let first;
let second;
let third;
let total = 0;

// allows only one button to be selected per class
function selectButton(item) {
  let categoryName = "." + item.classList[0];
  let alreadySelected = document.querySelector(categoryName + ".selected");

  // checks if another button of the class has already been selected
  if (alreadySelected !== null) {
    alreadySelectedPrice = document.querySelector(
      categoryName + ".selected" + " .price"
    ).innerHTML;
    // calls calcTotal to subtract the diselected price from the total sum
    calcTotal("-", alreadySelectedPrice);
    alreadySelected.classList.remove("selected");
  }
  item.classList.add("selected");
  // calls enableCheckoutButton function to check if all conditions are met
  enableCheckoutButton();
  // pass on which category triggered the event to add item to order list
  addToOrder(categoryName);
}
// add items to Confirm Order list, placing them at their respective positions
function addToOrder(categoryName) {
  // fetch the positon of the category on Confirm Order list
  let itemNameOrder = document.querySelector(
    ".order-items " + categoryName + " > .name"
  );
  let itemPriceOrder = document.querySelector(
    ".order-items " + categoryName + " > .price"
  );
  // insert name and price of the item to the confirm order list
  itemNameOrder.innerHTML = document.querySelector(
    categoryName + ".selected" + " .name"
  ).innerHTML;
  itemPriceOrder.innerHTML = document.querySelector(
    categoryName + ".selected" + " .price"
  ).innerHTML;
  // pass on item name and price to form the message and calculate the total
  addNameToMessage(itemNameOrder.innerHTML, categoryName);
  calcTotal("+", itemPriceOrder.innerHTML);
}

// assign item name to the its respective variable
function addNameToMessage(itemName, categoryName) {
  if (categoryName === ".first") {
    first = itemName;
  } else if (categoryName === ".second") {
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

function nextWindow() {
  customerName = document.querySelector("#customer-name").value;
  customerAddress = document.querySelector("#customer-address").value;

  if (customerName === "" || customerAddress === "") {
    alert("Por favor, preencha seu nome e endereço para prosseguir");
  } else {
    toggleAddressWindow();
    toggleConfirmWindow();
  }
}

// compose WhatsApp message and encodes it
function sendMessage() {
  let message = encodeURIComponent(
    `Olá, gostaria de fazer o pedido: \n - Prato: ${first} \n - Bebida: ${second} \n - Sobremesa: ${third} \n Total: R$ ${total.toFixed(
      2
    )} \n
    Nome: ${customerName} \n
    Endereço: ${customerAddress}`
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
  document.querySelector(".confirm-order").classList.toggle("active");
}

function toggleOverlay() {
  document.querySelector(".overlay").classList.toggle("active");
}

function toggleAddressWindow() {
  document.querySelector(".address").classList.toggle("active");
}
