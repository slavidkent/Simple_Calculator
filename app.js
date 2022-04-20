// console.log debug function
const test = (e) => {
    console.log(`content :${e.target.textContent}`);
    console.log(`value   :${e.target.value}`);
};

// variable
let numbers = [];
let numX; /* accumulator/firstNumber/total of last operation */
let numY;
let operator;

const buttons = document.querySelectorAll('.calc-button');
const display = document.querySelector('.screen');
buttons.forEach((button) => button.addEventListener('click', handleInput));

// function expression
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => (y !== 0 ? x / y : 'ERROR');
const operate = (operator, x, y) => {
    switch (operator) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '*':
            return multiply(x, y);
        case '/':
            return divide(x, y);
    }
};
const clearNumbersArray = (arr) => {
    arr.splice(0, arr.length);
};
const lengthControl = (number) => {
    let integerNumberStringLength = String(Math.floor(number)).length;
    let floatNumberStringLength = String(number).length;
    //display max length of 12 digit and round to min 11
    if (floatNumberStringLength > 12 && integerNumberStringLength <= 11) {
        return number.toFixed(12 - integerNumberStringLength);
    }
    return number;
};
const displayValue = (value) => {
    value = lengthControl(value);
    display.textContent = value;
};

// functions to handle input =======================================
function handleInput(e) {
    const value = e.target.value;
    const isNumber = /\d/;
    const isOperator = /[+\-\*/]/;
    const isEqual = /=/;
    const isClear = /c/;

    switch (true) {
        case isNumber.test(value):
            numbers.length <= 12 && handleNumber(value);
            break;
        case isOperator.test(value):
            handleOperator(value);
            break;
        case isEqual.test(value):
            handleEqual();
            break;
        case isClear.test(value):
            handleClear();
            break;
        default:
            break;
    }
}

function handleNumber(num) {
    console.log(num)
        numbers.push(num);
        displayValue(numbers.join(''));
}

function handleOperator(ope) {
    if (numX === undefined && operator === undefined) {
        numX = parseFloat(numbers.join(''));
        clearNumbersArray(numbers);
    } else if (numX !== undefined && numbers.length !== 0) {
        numY = parseFloat(numbers.join(''));
        clearNumbersArray(numbers);
        numX = operate(operator, numX, numY);
        displayValue(numX);
        numY = undefined;
    }
    operator = ope;
}

function handleEqual() {
    if (numX !== undefined && numbers.length !== 0) {
        numY = parseInt(numbers.join(''));
        clearNumbersArray(numbers);
        numX = operate(operator, numX, numY);
        displayValue(numX);
    }
}

function handleClear() {
    clearNumbersArray(numbers);
    numX = undefined;
    numY = undefined;
    operator = undefined;
    displayValue('');
}
