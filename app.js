const userInput = [];
let num1;
let num2;
let total;

const buttons = document.querySelectorAll('.calc-button');
const displayTop = document.querySelector('.top-screen');
const displayBtm = document.querySelector('.btm-screen');
buttons.forEach((button) => button.addEventListener('click', handleInput));
buttons.forEach((button) => button.addEventListener('mousedown', addActive));
window.addEventListener('keydown', handleInput);
window.addEventListener('mouseup', removeActive);
window.addEventListener('keydown', addActive);
window.addEventListener('keyup', removeActive);

// operate function
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => (y !== 0 ? x / y : 'ERROR'); //return error if divide by 0
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

// display function
const clearUserInput = () => {
    userInput.splice(0, arr.length);
};
const lengthControl = (number) => {
    let integerNumberStringLength = String(Math.floor(number)).length;
    let floatNumberStringLength = String(number).length;
    //display max length of 12 digit and round to min 11 integer
    if (floatNumberStringLength > 12 && integerNumberStringLength <= 11 && parseInt(number) !== NaN) {
        return parseFloat(number).toFixed(12 - integerNumberStringLength);
    }
    // in event of number received exceed 12 in length, example: number display in scientific notation
    else if (integerNumberStringLength > 12) {
        return number.toPrecision(8);
    }
    return number;
};
const updateBottomScreen = (value = '') => {
    value = lengthControl(value);
    displayBtm.textContent = value;
};
const updateTopScreen = (num1 = '', ope = '', num2 = '', equ = '') => {
    num1 = lengthControl(num1);
    num2 = lengthControl(num2);
    displayTop.textContent = `${num1} ${ope} ${num2} ${equ}`;
};

// functions to handle user input ================
function handleInput(e) {

}

// "handleInput()" redirect user input into calculator function=======
function handleNumber(num) {

}
function handleOperator(ope) {
    
}
function handleEqual() {
    
}
function handleClear() {

}
function handleDelete() {

}
function handleDecimal() {

}
function handlePositiveNegative() {

}

// deactivated, function can be declared directly to handleInput
// // keyboard function ======================================
// function handleKeyboard(e) {
//     handleInput(e);
// }

// pressed animation for click and keypress ===============
function addActive(e) {
    let value;
    if (e.type === 'mousedown') {
        value = e.target.value;
    } else if (e.type === 'keydown') {
        value = e.key;
    }
    buttons.forEach((button) => {
        if (button.value === value) {
            button.classList.add('active');
        }
    });
}
function removeActive() {
    buttons.forEach((button) => button.classList.remove('active'));
}
