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
    document.querySelector('.display').textContent = nbrToShow;
}

function isOperator(element) {
    const operatorGroup = ['AC', '+-', '%', '/', '*', '-', '+', '='];
    return operatorGroup.includes(element);
}

let operand1;
let operand2;
let operator;
let result;
let prevAction;
let displayScreen;


const acBtn = document.querySelector('#AC');
acBtn.addEventListener('click', (e) => {
    document.querySelector('.display').textContent = "0";
    prevAction = undefined;
    operand1 = undefined;
    operand2 = undefined;
});

const btns = document.querySelectorAll('.button:not(#AC)');
btns.forEach((btn) => {   
    btn.addEventListener('click', (e) => {
        btnText = e.target.textContent;
        displayScreen = document.querySelector('.display').textContent.trim();
        if (!isOperator(btnText)) {
            if (btnText !== "." && (displayScreen == '0' || prevAction === 'operator')) {
                document.querySelector('.display').textContent = btnText;
            } else if (displayScreen.length <= 11)   {
                if (btnText !== '.' || displayScreen.includes('.') === false) {
                    document.querySelector('.display').textContent = displayScreen.slice(0, 9) + btnText;
                }
            }
            if (operand1 === undefined || prevAction === 'operand1') {
                operand1 = Number(document.querySelector('.display').textContent); 
                prevAction =  'operand1';  
            } else {
                operand2 = Number(document.querySelector('.display').textContent);
                prevAction =  'operand2';  
            }
        } else if (btnText === "+-" && displayScreen.trim() !== "0" ) {
            if (operand2 === undefined) {
                operand1 = -operand1;
                document.querySelector('.display').textContent = operand1.toString().slice(0, 10);
            } else {
                operand2 = -operand2;
                document.querySelector('.display').textContent = operand2.toString().slice(0, 10);
            }
        } else if (btnText === "%" && document.querySelector('.display').textContent !== "0" ) {
            if (operand2 === undefined) {
                result = operate(operand1, "/", 100);
                operand1 = result;
                document.querySelector('.display').textContent = result.toString().slice(0, 10);
            } else {
                result = operate(operand2, "/", 100);
                operand2 = result;
                document.querySelector('.display').textContent = result.toString().slice(0, 10);
            }
        } else if (operand2 == undefined || (operator === "=")) {
            operator = btnText;
            prevAction =  'operator'; 
        } else {
            result = operate(operand1, operator, operand2);
            document.querySelector('.display').textContent = (result === undefined)? "ERROR":result.toString().slice(0, 10);
            operand1 = result;
            operator = btnText;
            operand2 = undefined;
            prevAction =  'operator';  
        }
         
        console.log(`${operand1}, ${operand2}, ${operator}`);                                                                                                
    })
})

