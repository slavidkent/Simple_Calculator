// calculation
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

const test = (e) => {
    console.log(e.target.value);
};

let numbers = [];
let numX; /* accumulator/firstNumber/total of last operation */
let numY;
let operator;

const buttons = document.querySelectorAll('.calc-button');
const display = document.querySelector('.screen');
buttons.forEach((button) => button.addEventListener('click', handleInput));

function handleInput(e) {
    let value = e.target.value;
    let isNumber = /\d/;
    let isOperator = /[+\-\*/]/;
    let isEqual = /=/;

    if (isNumber.test(value)) {
        numbers.push(value);
        displayValue(numbers.join(''));
    } else if (isOperator.test(value)) {
        if (numX === undefined && operator === undefined) {
            numX = parseInt(numbers.join(''));
            numbers.splice(0, numbers.length);
        } else {
            numY = parseInt(numbers.join(''));
            let result = operate(operator, numX, numY);
            numX = result;
            displayValue(result);
        }
        operator = value;
    } else if (isEqual.test(value)) {
        numY = parseInt(numbers.join(''));
        let result = operate(operator, numX, numY);
        numX = result;
        displayValue(result);
    }
}

function displayValue(number) {
    display.textContent = number;
}

function operate(operator, x, y) {
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
}
