const numberButtons = document.querySelectorAll(".numbers button");
const currentScreen = document.querySelector("#currentScreen");
const previousScreen = document.querySelector("#previousScreen");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
var num1 = 0;
var num2 = 0;
var symbol = "";
const add = (a, b) => parseFloat(a) + parseFloat(b);
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => Math.round(1000000 * (a / b)) / 1000000;
const operator = (symbol, num1, num2) => {
    if (symbol === "+") {
        return add(num1, num2)
    } else if (symbol === "-") {
        return subtract(num1, num2)
    } else if (symbol === "x" || symbol === "*") {
        return multiply(num1, num2)
    } else if (symbol === "/") {
        if (num2 === 0) {
            alert("Cannot divide 0");
            return 0;
        } else {
            return divide(num1, num2)
        }

    } else {
        return 0;
    }
}


function getOperator(symbolProperty) {
    if (symbolProperty === "+" || symbolProperty === "-" || symbolProperty === "/" || symbolProperty === "*") {
        if (num1 && num2 && symbol) {
            currentScreen.innerText = operator(symbol, num1, num2);
            previousScreen.innerText = `${num1} ${symbol} ${num2} = `;
            num1 = currentScreen.innerText;
        }
        symbol = symbolProperty;
        previousScreen.innerText = num1 + " " + symbol;
        num2 = 0;
    }
}

function getInput(inputProperty) {
    if (symbol) {
        if (Number.isInteger(parseFloat(inputProperty))) {
            if (num2 === 0) {
                currentScreen.innerText = inputProperty;
                num2 = parseFloat(currentScreen.innerText);
            } else {
                currentScreen.innerText = currentScreen.innerText.concat("", inputProperty)
                num2 = parseFloat(currentScreen.innerText);
            }
        }
    } else {
        if (Number.isInteger(parseFloat(inputProperty))) {
            if (currentScreen.innerText === "0") {
                currentScreen.innerText = inputProperty;
                num1 = parseFloat(currentScreen.innerText);
            } else {
                currentScreen.innerText = currentScreen.innerText.concat("", inputProperty)
                num1 = parseFloat(currentScreen.innerText);
            }
        }
    }


    if (inputProperty === ".") {
        if (!(currentScreen.innerText.includes("."))) {
            currentScreen.innerText = currentScreen.innerText.concat("", inputProperty)
            if (symbol) {
                num2 = parseFloat(currentScreen.innerText);
            } else {
                num1 = parseFloat(currentScreen.innerText);
            }

        }
    }
}

function equals(inputProperty) {
    if (inputProperty === "=" || inputProperty === "Enter") {
        if (symbol) {
            currentScreen.innerText = operator(symbol, num1, num2);
            previousScreen.innerText = `${num1} ${symbol} ${num2} = `;
            num1 = currentScreen.innerText;
            symbol = ""
        }

    }
}

function deleteOperation() {
    currentScreen.innerText = currentScreen.innerText.substring(0, currentScreen.innerText.length - 1);
    if (symbol) {
        num2 = currentScreen.innerText
    }
    else {
        num1 = currentScreen.innerText
    }
}

function clear() {
    currentScreen.innerText = "0"
    previousScreen.innerText = ""
    num1 = 0;
    num2 = 0;
    symbol = ""
}

numberButtons.forEach(number => {
    number.addEventListener("click", () => {


        getOperator(number.innerText);
        getInput(number.innerText)
        equals(number.innerText)

    })
});

clearButton.addEventListener('click', (e) => {
    clear();
})

deleteButton.addEventListener('click', (e) => {

    deleteOperation();
})

window.addEventListener('keydown', (e) => {

    getOperator(e.key);
    getInput(e.key)
    equals(e.key)
    if (e.key === "Backspace") {
        deleteOperation();
    }


})