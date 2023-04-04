const display = document.querySelector('.display');

const num = document.querySelectorAll('.num');
num.forEach((num) => {
  num.addEventListener('click', () => {
    display.textContent += num.textContent;
  });
});

const op = document.querySelectorAll('.op');
op.forEach((op) => {
  op.addEventListener('click', () => {
    display.textContent += op.textContent;
  });
});

const del = document.querySelector('#delete');
del.addEventListener('click', () => {
  display.textContent = '';
});

function calculate() {
  const str = display.textContent;
  const regex = /[-+*/]|\d+\.\d+|\d+/g;
  let match;
  let arr = [];
  while ((match = regex.exec(str)) !== null) {
    arr.push(match[0]);
  };
  
  let numStack = []; // stack for numbers
  let opStack = []; // stack for operators

  for (let i = 0; i < arr.length; i++) {
    let token = arr[i];

    if (!isNaN(parseFloat(token))) { // check if token is a number
      numStack.push(parseFloat(token)); // push number to numStack
    } else if (token === "+" || token === "-") { // check for addition or subtraction
      while (opStack.length > 0) {
        let op = opStack.pop();
        let b = numStack.pop();
        let a = numStack.pop();
        let result = performOperation(a, b, op);
        numStack.push(result);
      }
      opStack.push(token); // push operator to opStack
    } else if (token === "*" || token === "/") { // check for multiplication or division
      while (opStack.length > 0 && (opStack[opStack.length - 1] === "*" || opStack[opStack.length - 1] === "/")) {
        let op = opStack.pop();
        let b = numStack.pop();
        let a = numStack.pop();
        let result = performOperation(a, b, op);
        numStack.push(result);
      }
      opStack.push(token); // push operator to opStack
    }
  }

  while (opStack.length > 0) { // evaluate remaining operators
    let op = opStack.pop();
    let b = numStack.pop();
    let a = numStack.pop();
    let result = performOperation(a, b, op);
    numStack.push(result);
  }

  return numStack.pop(); // final result
}

function performOperation(a, b, op) {
  if (op === "+") {
    return a + b;
  } else if (op === "-") {
    return a - b;
  } else if (op === "*") {
    return a * b;
  } else if (op === "/") {
    return a / b;
  }
} 

const equal = document.querySelector('#equal');
equal.addEventListener('click', () => {
  display.textContent = '=' + calculate();
});