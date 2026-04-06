//Variable declarations
let currentValue = "0";     // what is shown on the screen
let previousValue = null;  // number before operator
let operator = null;       // +, -, x, /
let shouldReset = false;   // controls when to clear display


// ===== SELECT ELEMENTS =====
const display = document.querySelector(".js-display");
const buttons = document.querySelectorAll(".js-btn");


// ===== UPDATE DISPLAY =====
function updateDisplay() {
  display.textContent = currentValue;

  if (currentValue.length > 10) {
    display.style.fontSize = `${2 - (currentValue.length - 10) * 0.1}rem`;
  } else {
    display.style.fontSize = "2rem";
  }
}

// show initial value
updateDisplay();


// Attach event listeners
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", buttonClicked);
}

// The handler function
function buttonClicked() {
  let value = this.textContent;

  //Backspace (check FIRST, before anything else)
  if (this.classList.contains("backspace")) {
    currentValue = currentValue.slice(0, -1);
    if (currentValue === "") {
      currentValue = "0"; // guard empty string
      updateDisplay();
      return;
    }
  }

  // Digits and dot
  if (value >= "0" && value <= "9" || value === ".") {

    //Replace default 0
    if (currentValue === "0" && value !== ".") {
      currentValue = value;
    } else if (shouldReset) {// Start fresh if the last action was '='
      currentValue = value;
      shouldReset = false;
    } else {
      currentValue += value;
    }
    updateDisplay();
  }

  // Operators
  else if (value === "÷" || value === "+" || value === "-" || value === "*" || value === "%") {
    if (value === "÷") {
      value = "/";
    }
    currentValue += " " + value + " ";
    shouldReset = false; // do not reset on operator
    updateDisplay()
  }

  // Equals
  else if (value === "=") {
    try {
      currentValue = eval(currentValue).toString(); //This calculates and returns answer as Number but toString() converts it string for display
    } catch {
      currentValue = "Syntax Error";
    }
    updateDisplay();
    shouldReset = true; //next click of a number will start afresh
  }

  //Clear everything
  else if (value.toUpperCase() === "AC") {
    currentValue = "0";
    shouldReset = false;
    updateDisplay();
  }

  //Clear from last text/number on the right- like backspace
  if (this.classList.contains("backspace")) {
    currentValue = currentValue.slice(0, -1);// This slices the string from index 0 to index second last(-1) and returns the new value- This means will cut the last string out
    updateDisplay();
    return;
  }
}
