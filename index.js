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
  const numberString = number.toString();

  if (number % 1 !== 0) { // number has decimal value

    // get whole number and decimal place values
    let wholeNumber = Number(numberString.split('.')[0]);
    let decimalPlaceValue = Number(numberString.split('.')[1]);

    // check if decimal point is in first position
    if (numberString[0] === '.') {
      wholeNumber = 0;
      decimalPlaceValue = Number(numberString.substring(1)); // remove decimal point
    }

    // run through rounding check
    if (decimalPlaceValue.toString().length > 4) {
      // check if whole number is 0 (formatting reason), round to nearest 100th
      if (wholeNumber === 0) {
        roundedNumber = roundedNumber.toFixed(2);
      } else {
        // round decimal place, then get rounded result
        decimalPlaceValue = Number('.' + decimalPlaceValue).toFixed(2);
        roundedNumber = Number(wholeNumber) + Number(decimalPlaceValue);
      }
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
  let equation = value;

  // if first number is negative, remove sign
  if (value[0] === '-') {
    equation = value.substring(1);
  }
  const operators = ['/', '*', '+', '-'];
  const existingOperators = [];

  // loop through operators
  for (let i = 0; i < operators.length; i++) {
    // return existing operator
    if (equation.includes(operators[i])) {
      existingOperators.push(operators[i]);
    }
  }

  return existingOperators;
}

function operatorCheck(currentDisplay) {
  let operators;

  // loop through operators
  operators = [...loopOperatorsCheck(currentDisplay.textContent)];

  // no operators found
  if (operators.length === 0) return

  return operators[0];
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

    // create array of numbers being displayed on calculator screen
    const numbers = calcDisplay.textContent.split(equationValues.operator);

    // check that array numbers have values 
    if (numbers[0] && numbers[1]) {
      equationValues.num1 = numbers[0];
      equationValues.num2 = numbers[1];
    } else if (numbers[1] && numbers[2]) { 
      // applies when subtracting from a negative value
      equationValues.num1 = numbers[1] * -1;
      equationValues.num2 = numbers[2];
    } else {
      // applies when subtracting negative values
      equationValues.num1 = numbers[0];
      equationValues.num2 = numbers[2] * -1;
    }
  }

  return equationValues;
}

function clickedOperator(clickedOperator, calcDisplay) {
  const lastChar = calcDisplay.textContent[calcDisplay.textContent.length - 1];

  // if last character is decimal point, do nothing
  if (lastChar === '.') return; 

  // add clicked operator to display screen, if it wasn't the equal button that was clicked
  if (clickedOperator !== '=') {

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
  } else { // equal button was clicked

    // check equation values
    if (getEquationValues(calcDisplay)) {
      const calcInfo = getEquationValues(calcDisplay);

      // solve if operator and two numbers exist
      if (calcInfo.num1 && calcInfo.num2 && calcInfo.operator) {
        calcDisplay.textContent = operate(calcInfo.num1, calcInfo.num2, calcInfo.operator);
      }
    }
  }
}

function getOperators(calcDisplay) {
  const operators = ['+', '-', '*', '/'];
  let operatorValues = []

  for (let h = 0; h < operators.length; h++) {
    for (let i = 0; i < calcDisplay.textContent.length; i++) {
      if (calcDisplay.textContent[i] === operators[h]) {
        operatorValues.push(operators[h]);
      }
    }
  }

  return operatorValues;
}

function clickedTypeConversion(calcDisplay) {
  const calcContent = calcDisplay.textContent;
  const operatorsFound = getOperators(calcDisplay);
  
  // exit function if calc content isn't a number value that's not 0
  if (
    calcContent === '' || 
    calcContent === 0 || 
    calcContent[calcContent.length - 1] === '.') return;

  // check if just a number value exists
  if (!isNaN(calcContent)) {
    // convert number to positive or negative
    calcDisplay.textContent = calcContent * -1;
  } else {
    // if calc content contains an operator check to see a number follows and convert it

    const operator = operatorCheck(calcDisplay);
    const equationValues = calcContent.split(operator);
    let lastValue = equationValues[equationValues.length - 1];

    // check that lastValue exists
    if (!lastValue) return;

    // check if first value sign type is minus 
    if (calcDisplay.textContent[0] === '-') { // first value is negative

      // if 2+ operators are found
      if (operatorsFound.length >= 2 ) {
        // convert last value to negative
        lastValue *= -1;
      }

      // first value needs to remain negative
      if (equationValues[1] > 0) {
        equationValues[1] *= -1;
      }

      calcDisplay.textContent = equationValues[1] + operator + lastValue;

    } else { // first value is positive

      // check for operators, ignore if two minus signs found 
      if (operatorsFound.length >= 1 && (operatorsFound[0] + operatorsFound[1] !== '--')) {
        // convert to negative
        lastValue *= -1;
      }
      
      calcDisplay.textContent = equationValues[0] + operator + lastValue;
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