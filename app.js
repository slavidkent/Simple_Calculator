// variable
let numbers = [];
let numX; /* accumulator/firstNumber/total of last operation */
let numY;
let operator;

const buttons = document.querySelectorAll('.calc-button');
const displayTop = document.querySelector('.top-screen');
const displayBtm = document.querySelector('.btm-screen');
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
const clearArray = (arr) => {
    arr.splice(0, arr.length);
};
const lengthControl = (number) => {
    let integerNumberStringLength = String(Math.floor(number)).length;
    let floatNumberStringLength = String(number).length;
    //display max length of 12 digit and round to min 11 integer
    if (
        floatNumberStringLength > 12 &&
        integerNumberStringLength <= 11 &&
        parseInt(number) !== NaN
    ) {
        return parseFloat(number).toFixed(12 - integerNumberStringLength);
    }
    return number;
};
const displayBtmScreen = (value = '') => {
    value = lengthControl(value);
    displayBtm.textContent = value;
};
const displayTopScreen = (num1 = '', ope = '', num2 = '', equ = '') => {
    num1 = lengthControl(num1);
    num2 = lengthControl(num2);
    displayTop.textContent = `${num1} ${ope} ${num2} ${equ}`;
};

// functions to handle input =======================================
function handleInput(e) {
    const value = e.target.value;
    const isNumber = /\d/;
    const isOperator = /[+\-\*/]/;
    const isEqual = /=/;
    const isClear = /c/;
    const isDecimalPoint = /\./;
    const isDelete = /del/;

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
        case isDecimalPoint.test(value):
            handleDecimal();
            break;
        case isDelete.test(value):
            handleDelete();
            break;
        default:
            break;
    }
}

function handleNumber(num) {
    numbers.push(num);
    displayBtmScreen(numbers.join(''));
}

function handleOperator(ope) {
    if (operator === undefined) {
        // input is not empty or number array is not empty
        if (numbers.length !== 0) {
            numX = parseFloat(numbers.join(''));
        }
    }
    //no number is initialize and input is not empty
    else if (numX !== undefined && numX !== 'ERROR' && numbers.length !== 0) {
        numY = parseFloat(numbers.join(''));
        numX = operate(operator, numX, numY);
        numY = undefined;
    }
    clearArray(numbers);
    operator = ope;
    if (numX !== undefined) {
        displayTopScreen(numX, ope, numY);
    }
    displayBtmScreen();
}

function handleEqual() {
    if (
        numX !== undefined &&
        numX !== 'ERROR' &&
        numbers.length !== 0 &&
        operator !== undefined
    ) {
        console.log(numX);
        numY = parseFloat(numbers.join(''));
        displayTopScreen(numX, operator, numY, '=');
        numX = operate(operator, numX, numY);
        displayBtmScreen(numX);
        numY = undefined;
        operator = undefined;
        clearArray(numbers);
    } else if (numX === 'ERROR') {
        operator = undefined;
        displayTopScreen();
        displayBtmScreen(numX);
        clearArray(numbers);
    } else if (numbers.length !== 0) {
        operator = undefined;
        numX = parseFloat(numbers.join(''));
        clearArray(numbers);
        displayTopScreen(numX, '', numY, '=');
    }
    console.log('click');
}

function handleClear() {
    clearArray(numbers);
    numX = undefined;
    numY = undefined;
    operator = undefined;
    displayBtmScreen();
    displayTopScreen();
}

function handleDecimal() {
    if (!numbers.includes('.')) {
        numbers.push('.');
        displayBtmScreen(numbers.join(''));
    }
}

function handleDelete() {
    if (numbers.length !== 0) {
        numbers.pop();
        displayBtmScreen(numbers.join(''));
    }
}
