// variable
let numbers = [];
let numX; /* accumulator/firstNumber/total of last operation */
let numY;
let operator;
let equalActive = false; //save state of last key pressed is '=' key or not,
// allow "handlePositiveNegative()" to know how to
// add or remove negative from the number
//'=' reset most variable, no condition is able to
// verify current state of calculator

const buttons = document.querySelectorAll('.calc-button');
const displayTop = document.querySelector('.top-screen');
const displayBtm = document.querySelector('.btm-screen');
buttons.forEach((button) => button.addEventListener('click', handleInput));
window.addEventListener('keydown', handleKeyboard);

// function expression
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => (y !== 0 ? x / y : 'ERROR');
const power = (x, y) => (x < 0 && y < 1 && y > -1 ? 'ERROR' : x ** y);
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
        case '^':
            return power(x, y);
    }
};
const clearArray = (arr) => {
    arr.splice(0, arr.length);
};
const lengthControl = (number) => {
    let integerNumberStringLength = String(Math.floor(number)).length;
    let floatNumberStringLength = String(number).length;
    //display max length of 12 digit and round to min 11 integer
    if (floatNumberStringLength > 12 && integerNumberStringLength <= 11 && parseInt(number) !== NaN) {
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

// functions to handle user input ================
function handleInput(e) {
    let value;
    if (e.type === 'click') {
        value = e.target.value;
    } else if (e.type === 'keydown') {
        value = e.key;
    }

    const isNumber = /^\d/;
    const isOperator = /^[+\-\*/^]/;
    const isEqual = /^=|Enter/;
    const isClear = /^c/;
    const isDecimalPoint = /^\./;
    const isDelete = /del|Delete|Backspace/;
    const isPositiveNegative = /positive-negative/;

    switch (true) {
        case isNumber.test(value):
            ((numbers.length < 12 && !numbers.includes('.')) || (numbers.length < 13 && numbers.includes('.'))) &&
                handleNumber(value);
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
        case isPositiveNegative.test(value):
            handlePositiveNegative();
            break;
        default:
            break;
    }
}

// "handleInput()" redirect user input into calculator function=======
function handleNumber(num) {
    numbers.push(num);
    displayBtmScreen(numbers.join(''));
    equalActive = false;
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
    if (numX !== undefined) {
        operator = ope;
    }
    if (numX !== undefined) {
        displayTopScreen(numX, ope, numY);
    }
    displayBtmScreen();
    equalActive = false;
}

function handleEqual() {
    if (numX !== undefined && numX !== 'ERROR' && numbers.length !== 0 && operator !== undefined) {
        numY = parseFloat(numbers.join(''));
        displayTopScreen(numX, operator, numY, '=');
        numX = operate(operator, numX, numY);
        displayBtmScreen(numX);
        numY = undefined;
        operator = undefined;
        clearArray(numbers);
        equalActive = true;
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
        equalActive = true;
    }
}

function handleClear() {
    clearArray(numbers);
    numX = undefined;
    numY = undefined;
    operator = undefined;
    displayBtmScreen();
    displayTopScreen();
    equalActive = false;
}

function handleDelete() {
    if (numbers.length !== 0) {
        numbers.pop();
        displayBtmScreen(numbers.join(''));
    }
}

function handleDecimal() {
    if (!numbers.includes('.') && numbers.length < 12) {
        numbers.push('.');
        displayBtmScreen(numbers.join(''));
    }
}

function handlePositiveNegative() {
    if (!equalActive && numbers.length !== 0) {
        if (
            (!numbers.includes('.') && numbers[0] !== '0') ||
            (numbers.includes('.') &&
                numbers.some((number) => ['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(number)))
        ) {
            console.log;
            if (numbers[0] === '-') {
                numbers.shift();
            } else {
                numbers.unshift('-');
            }
            displayBtmScreen(numbers.join(''));
        }
    } else if (equalActive) {
        console.log(typeof numX);
        numX *= -1;
        displayBtmScreen(numX);
    }
}

// keyboard function
function handleKeyboard(e) {
    handleInput(e);
}
