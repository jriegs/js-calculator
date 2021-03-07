/* FUNCTIONS */

// Add
function add(num1, num2) {
  return Number(num1) + Number(num2);
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
  // can't divide by zero
  if (num2 == 0) return num1 + '/' + num2;

  return num1 / num2;
}

// to round or not to round...
function roundingCheck(number) {
  let roundedNumber = number;

  // check if number has a decimal value
  if (number % 1 !== 0) {
    // get whole number and decimal place values
    const decimalPlaceValue = number % 1;
    const wholeNumber = number - decimalPlaceValue;
    
    // check if places after decimal point extend past 5
    if (decimalPlaceValue.toString().length > 5) {
      // check if whole number is 0 (formatting reason), round to nearest 100th
      roundedNumber = wholeNumber === 0 ? decimalPlaceValue.toFixed(2) : wholeNumber + decimalPlaceValue.toFixed(2);
    }
  }

  return roundedNumber;
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

  // return number and round if needed
  return roundingCheck(result);
}

// check calculator display screen value
function checkCalcDisplayVal(display) {
  const displayContent = display.textContent;

  // return false, if calc displays no value
  if (displayContent === '' || displayContent === '0') return false;

  // otherwise
  return true;
}

function loopOperatorsCheck(value) {
  const operators = ['-', '+', '*', '/'];
  const existingOperators = [];

  // loop through operators
  for (let i = 0; i < operators.length; i++) {
    // return existing operator
    if (value.includes(operators[i])) {
      existingOperators.push(operators[i]);
    }
  }

  console.log(existingOperators);

  return existingOperators;
}

function operatorCheck(currentDisplay) {
  let operators;

  // loop through operators
  operators = [...loopOperatorsCheck(currentDisplay.textContent)];

  console.log(operators);

  // no operators found
  if (operators.length === 0) return

  if (operators.length === 1) {
    return operators[0];
  } else {
    // more than one operator found
    if (operators.length === 2) { // one negative number
      // check if first number is negative
      if (currentDisplay.textContent[0] === '-') {
        return operators[1];
      } else {
        return operators[0];
      }
    } else { // both numbers are negative
      return operators[1];
    }
  }

  
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

// get numbers and operator, and solve the resulting equation
function getEquationValues(calcDisplay) {
  let equationValues = '';

  // check that calcDisplay contains an equation that can be calculated
  // start by checking if an operator exists
  if (operatorCheck(calcDisplay)) {
    equationValues = {
      operator: operatorCheck(calcDisplay)
    };

    // gcreate array of numbers being displayed on calculator screen
    const numbers = calcDisplay.textContent.split(equationValues.operator);

    // check that array numbers have values 
    if (numbers[0] && numbers[1]) {
      equationValues.num1 = numbers[0];
      equationValues.num2 = numbers[1];
    }
  }

  return equationValues;
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
    } else {
      // check if an operator exists already and it's followed by another number
      if (getEquationValues(calcDisplay)) {
        const calcInfo = getEquationValues(calcDisplay);
        // solve if operator and two numbers exist, then add clicked operator to display
        if (calcInfo.num1 && calcInfo.num2 && calcInfo.operator) {
          calcDisplay.textContent = operate(calcInfo.num1, calcInfo.num2, calcInfo.operator) + clickedOperator;
        }
      }
    }
  } else {
    // solve if equal button was clicked, and equation values exist
    if (getEquationValues(calcDisplay)) {
      const calcInfo = getEquationValues(calcDisplay);
      // solve if operator and two numbers exist
      if (calcInfo.num1 && calcInfo.num2 && calcInfo.operator) {
        calcDisplay.textContent = operate(calcInfo.num1, calcInfo.num2, calcInfo.operator);
      }
    }
  }
}

function clickedTypeConversion(calcDisplay) {
  console.log('this will change the sign type');

  
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
  } else if (btnValue === '+/-') {
    return 'POS/NEG'
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
  // carry out clicked button event
  if (btnType === 'NUMBER') {
    clickedNum(clickedBtn, calcDisplay);
  } else if (btnType === 'DECIMAL') {
    clickedDecimalPoint(calcDisplay);
  } else if (btnType === 'OPERATOR') {
    clickedOperator(clickedBtn, calcDisplay);
  } else if (btnType === 'POS/NEG') {
    clickedTypeConversion(calcDisplay);
  } else if (btnType === 'DELETE') {
    removeLastChar(calcDisplay);
  } else if (btnType === 'CLEAR') {
    clearCalcDisplay(calcDisplay);
  }
}


/* GLOBAL SCOPE */
const calcBtns = document.querySelector('.js-buttons');

calcBtns.addEventListener('click', useCalculator);