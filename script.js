let display = document.getElementById("display");

function appendNumber(number) {
    if (display.value === "0") {
        display.value = number;
    } else {
        display.value += number;
    }
}

function appendOperator(operator) {
    if (display.value === "") return;
    let lastChar = display.value[display.value.length - 1];
    if (isOperator(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

function isOperator(char) {
    return ["+", "-", "*", "/"].includes(char);
}

function clearDisplay() {
    display.value = "0";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
    if (display.value === "") display.value = "0";
}

function calculate() {
    try {
        let result = parseAndEvaluate(display.value);
        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}

function parseAndEvaluate(expression) {
    let tokens = expression.match(/(\d+\.\d+|\d+|[\+\-\*\/])/g);
    if (!tokens) return 0;
    
    let operators = [];
    let operands = [];

    tokens.forEach(token => {
        if (isOperator(token)) {
            while (
                operators.length &&
                precedence(operators[operators.length - 1]) >= precedence(token)
            ) {
                let operator = operators.pop();
                let b = operands.pop();
                let a = operands.pop();
                operands.push(operate(a, b, operator));
            }
            operators.push(token);
        } else {
            operands.push(parseFloat(token));
        }
    });

    while (operators.length) {
        let operator = operators.pop();
        let b = operands.pop();
        let a = operands.pop();
        operands.push(operate(a, b, operator));
    }

    return operands[0];
}

function precedence(operator) {
    return operator === "+" || operator === "-" ? 1 : 2;
}

function operate(a, b, operator) {
    switch (operator) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
    }
}
