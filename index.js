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

// calculate equation
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

// check calculator display screen value
function checkCalcDisplayVal(display) {
  const displayContent = display.textContent;

  // return false, if calc displays no value
  if (displayContent === '' || displayContent === '0') return false;

  // otherwise
  return true;
}

function operatorCheck(currentDisplay) {
  const operators = ['+', '-', '*', '/'];
  let operator = '';

  // loop through operators
  for (let i = 0; i < operators.length; i++) {
    // and check if display includes one
    if (currentDisplay.textContent.includes(operators[i])) {
      operator = operators[i];
    }
  }

  return operator;
}

// check for decimal point
function decimalCheck(currentValue) {
  if (currentValue.includes('.')) return false;

  const newDecimalValue = currentValue + '.';
  return newDecimalValue;
}

// input a decimal point
function clickedDecimalPoint(calcDisplay) {
  const existingOperator = operatorCheck(calcDisplay); 

  // Check if calc display includes an operator
  if (existingOperator) {
    // split content by operator to grab number(s)
    let displayContent = calcDisplay.textContent;
    const numbers = displayContent.split(existingOperator);

    console.log(numbers, numbers.length);

    // check if more than one number
    if (numbers[1]) {
      // assign numbers to variables
      const firstNumber = numbers[0];
      const selectedNumber = numbers[1];

      // prevent adding more than one decimal point to a number, and get new display
      if (selectedNumber && decimalCheck(selectedNumber)) {
        calcDisplay.textContent = firstNumber + existingOperator + decimalCheck(selectedNumber);
        return;
      } 
    } else {
      calcDisplay.textContent += decimalCheck(numbers[1]);
    }
  }

  // when only one number is displayed on calc screen
  if (decimalCheck(calcDisplay.textContent)) {
    // add decimal point if number doesn't contain one
    calcDisplay.textContent = decimalCheck(calcDisplay.textContent);
  }
}

// input a number
function clickedNum(numValue, calcDisplay) {
  const displayZero = checkCalcDisplayVal(calcDisplay);

  // check if to set display value to clicked number,
  if (!displayZero) {
    calcDisplay.textContent = numValue;
  } else {
    // or if to add number next to current value
    calcDisplay.textContent += numValue;
  }
}

function clickedOperator(clickedOperator, calcDisplay) {
  // add clicked operator to display screen, if it wasn't the equal button that was clicked
  if (clickedOperator !== '=') {
    // if a decimal point is the last character displayed, don't add operator
    if (calcDisplay.textContent[calcDisplay.textContent.length - 1] === '.') return; 

    // make sure display contains a value and an operator doesn't exist already
      if (calcDisplay.textContent && !isNaN(calcDisplay.textContent) ) {
        calcDisplay.textContent += clickedOperator;
        return;
      }
  }
}

function removeLastChar(calcDisplay) {
  const currentValue = calcDisplay.textContent;
  const newValue = currentValue.substr(0, currentValue.length - 1);
  calcDisplay.textContent = newValue;
}

function clearCalcDisplay(calcDisplay) {
  calcDisplay.textContent = '';
}

function getBtnType(btnValue) {
  if (!isNaN(+btnValue)) {
    return 'NUMBER';
  } else if (btnValue === '+' || btnValue === '-' || btnValue === '*' || btnValue === '/' || btnValue === '=') {
    return 'OPERATOR';
  } else if (btnValue === '.') {
    return 'DECIMAL';
  } else if (btnValue.toLowerCase() === 'del') {
    return 'DELETE';
  } else if (btnValue.toLowerCase() === 'clear') {
    return 'CLEAR';
  }
}

function useCalculator(e) {
  const clickedBtn = e.target.textContent; // get value of clicked calculator button
  const calcDisplay = document.querySelector('.js-calcDisplay');

  // get button type
  const btnType = getBtnType(clickedBtn);

  // check button type &&
  // carry out clicked button event (clicked number, clicked operator/equal, clicked decimal, or clicked delete/clear )
  if (btnType === 'NUMBER') {
    clickedNum(clickedBtn, calcDisplay);
  } else if (btnType === 'DECIMAL') {
    clickedDecimalPoint(calcDisplay);
  } else if (btnType === 'OPERATOR') {
    clickedOperator(clickedBtn, calcDisplay);
  } else if (btnType === 'DELETE') {
    removeLastChar(calcDisplay);
  } else if (btnType === 'CLEAR') {
    clearCalcDisplay(calcDisplay);
  }

}


/* GLOBAL */
const calcBtns = document.querySelector('.js-buttons');

calcBtns.addEventListener('click', useCalculator);