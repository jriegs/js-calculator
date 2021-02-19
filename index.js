/* FUNCTIONS */

// Add
function add(num1, num2) {
  return +num1 + +num2;
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

// calculate two numbers
function operate(num1, num2, operator) {
  
  let result;
  if (operator === '+') {
    result = add(num1,num2);
  } else if (operator === '-') {
    result = subtract(num1,num2);
  } else if (operator === '*') {
    result = multiply(num1,num2);
  } else if (operator === '/') {
    result = divide(num1,num2);
  }

  return result;

}

// Decimal Point Check
function decimalCheck(value) {
  if (value.includes('.')) return;

  const decimalValue = value + '.';
  return decimalValue;
}

// input a number
function clickNum(e) {

}

// input a decimal point
function clickDecimalPoint(e) {

}

// input operator symbol
function clickOperator(e) {

}

// carry out calculations
function calculate(num1, num2, operator) {
  console.log('calculate');
}


/* GLOBAL */
const calcBtns = document.querySelector('.js-buttons');

calcBtns.addEventListener('click', calculate);