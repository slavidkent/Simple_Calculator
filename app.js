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
const divide = (x, y) => x / y;
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
const displayValue = (value) => {
    display.textContent = value;
};

// functions to handle input =======================================
function handleInput(e) {
    const value = e.target.value;
    const isNumber = /\d/;
    const isOperator = /[+\-\*/]/;
    const isEqual = /=/;
    const isClear = /c/;

    if (isNumber.test(value)) {
        handleNumber(value);
    } else if (isOperator.test(value)) {
        handleOperator(value);
    } else if (isEqual.test(value)) {
        handleEqual();
    } else if (isClear.test(value)) {
        handleClear();
    }
}

function handleNumber(num) {
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
