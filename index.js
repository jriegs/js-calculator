/* FUNCTIONS */

// Add
function add(num1, num2) {
  return num1 + num2;
}

// Subtract
function subtract(num1, num2) {
  return num1 - num2;
}

// Multiply
function multiply(num1, num2) {
  return num1 * num2;
}

// Divide
function divide(num1, num2) {
  return num1 / num2;
}

// Decimal Point Check
function decimalCheck(value) {
  if (value.includes('.')) return;

  const decimalValue = value + '.';
  return decimalValue;
}

// calculate result
function calculate() {
  console.log('calculate');
}


/* GLOBAL */
const calcBtns = document.querySelector('.js-buttons');

calcBtns.addEventListener('click', calculate);