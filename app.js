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
    numbers.push(num);
    displayBtmScreen(numbers.join(''));
}

function handleOperator(ope) {
    console.log(numX);
    if (operator === undefined) {
        // input is empty
        if (numbers.length !== 0) {
            numX = parseFloat(numbers.join(''));
            clearArray(numbers);
        }
    }
    //no number is initialize and input is not empty
    else if (numX !== undefined && numX !== 'ERROR' && numbers.length !== 0) {
        numY = parseFloat(numbers.join(''));
        numX = operate(operator, numX, numY);
        console.log(numX);
        clearArray(numbers);
        numY = undefined;
    }
    operator = ope;
    displayTopScreen(numX, ope, numY);
    displayBtmScreen();
}

function handleEqual() {
    if (numX !== undefined && numX !== 'ERROR' && numbers.length !== 0 && operator!==undefined) {
        const numYTemp = parseInt(numbers.join(''));
        const numXTemp = numX;
        const operatorTemp = operator;
        numX = operate(operator, numX, numYTemp);
        numY = undefined;
        operator = undefined;
        displayTopScreen(numXTemp, operatorTemp, numYTemp, '=');
        displayBtmScreen(numX);
    }
    clearArray(numbers);
}

function handleClear() {
    clearArray(numbers);
    numX = undefined;
    numY = undefined;
    operator = undefined;
    displayBtmScreen();
    displayTopScreen();
}
