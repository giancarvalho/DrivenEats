function calcTotalOrder() {
  let dishValue = document.querySelector('input[name="dishes"]:checked').value;
  let drinkValue = document.querySelector('input[name="drink"]:checked').value;
  let dessertValue = document.querySelector(
    'input[name="dessert"]:checked'
  ).value;

  alert(Number(dishValue) + Number(drinkValue) + Number(dessertValue));
}
