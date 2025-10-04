// Basic math functions
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) return "Error";
  return a / b;
}

// operate function
function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

// Variables
let firstNumber = "";
let currentOperator = null;
let secondNumber = "";
let justCalculated = false; // ✅ new flag

// Display element
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

function updateDisplay() {
  let text = firstNumber;
  if (currentOperator !== null) text += " " + currentOperator;
  if (secondNumber !== "") text += " " + secondNumber;
  display.textContent = text || "0";
}

// Start of program
// Check which type of button is clicked
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.classList.contains("digit")) {
      handleDigit(value);
    } else if (button.classList.contains("operator")) {
      handleOperator(value);
    } else if (button.classList.contains("equals")) {
      handleEquals();
    } else if (button.classList.contains("clear")) {
      clearCalculator();
    }
  });
});

// Handle digits
function handleDigit(value) {
  if (justCalculated) {
    // Reset if user starts typing new number after result
    clearCalculator();
  }
  if (currentOperator === null) {
    firstNumber += value;
  } else {
    secondNumber += value;
  }
  updateDisplay();
}

// Handle operators
function handleOperator(op) {
  if (firstNumber === "") return;
  if (currentOperator !== null && secondNumber !== "") {
    handleEquals();
  }
  currentOperator = op;
  justCalculated = false; // reset flag
  updateDisplay();
}

// Handle equals
function handleEquals() {
  if (currentOperator === null || secondNumber === "") return;
  const result = operate(currentOperator, firstNumber, secondNumber);
  firstNumber = result.toString();
  secondNumber = "";
  currentOperator = null;
  updateDisplay();
  justCalculated = true; // Set flag when result is shown
}

// Clear calculator
function clearCalculator() {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  justCalculated = false;
  updateDisplay();
}