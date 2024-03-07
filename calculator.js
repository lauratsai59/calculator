const add = (x, y) => {
    return x + y;
};

const subtract = (x, y) => {
    return x - y;
};

const multiply = (x, y) => {
    return x * y;
};

const divide = (x, y) => {
    if (y === 0) return undefined;
    return x / y;
};


function operate(operand1, operator, operand2) {
    let result;
    switch (operator) {
        case '+':
            result = add(operand1, operand2);
            break;
        case '-':
            result = subtract(operand1, operand2);
            break;
        case '*':
            result = multiply(operand1, operand2);
            break;
        case '/':
            result = divide(operand1, operand2);
            break;
        default:
            result = "unknown operand";   
    }
    return result;
}

function display(nbrToShow) {
    document.querySelector('#display').textContent = nbrToShow;
}

// get stack top element without removing the element from stack
function getStackTopElement() {
    return stack.length < 1 || stack === undefined ? null: stack[stack.length - 1];
}

function isStackEmpty() {
    return stack.length > 0? true: false;
}

function isOperator(element) {
    const operatorGroup = ['AC', '+-', '%', '/', '*', '-', '+', '='];
    return operatorGroup.includes(element);
}

let displayVar = 0;
let operand1 = 0;
let operand2 = 0;
let operand = "";
let elemet = "";
let result = 0;
let stack = [];
let operatorGroup = ['AC', '+-', '%', '/', '*', '-', '+', '='];
const btns = document.querySelectorAll('.button');
btns.forEach((btn) => {   
    addEventListener('click', (e) => {
        element = e.target.textContent;
        if (isStackEmpty()) {
            if (!isOperator(element)) {
                displayVar = element;
                stack.push(Number(element));
                display(displayVar);
            } 
        } else {
            let topElement = getStackTopElement();
            // if the last element is an operand
            if (!isOperator(topElement)) {
                // if the current element is an operand
                if (!isOperator(element)) {
                    displayVar += element;
                    stack.push(Number(displayVar));
                    display(displayVar);
                } else { // if the current element is an operator
                    if (stack.length() === 1) {
                        if (element !== "=") {
                            stack.push(element);
                        }
                    } else {
                        operand2 = stack.pop();
                        operator = stack.pop();
                        operand1 = stack.pop();
                        result = operate(operand1, operator, operand2);
                        stack.push(result);
                        displayVar = result.toString();
                    }
                }
            } else { // if the last element is an operator
                // if the current element is an operand
                if (!isOperator(element)) {
                    displayVar = element;
                    stack.push(Number(displayVar));
                    display(displayVar);
                } else { // if the current element is an operator
                    // remove the last operator
                    stack.pop();
                    if (element !== "=") {
                        stack.push(element);
                    }
                }
            }
        }                                                     
    })
})

