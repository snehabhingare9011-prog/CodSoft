let display = document.getElementById('display');

let currentInput = '';
let lastResult = '';
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function clearDisplay() {
    currentInput = '';
    lastResult = '';
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (shouldResetDisplay) return;

    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function appendToDisplay(value) {
    const operators = ['+', '-', '*', '/'];

    if (shouldResetDisplay) {
        if (operators.includes(value)) {
            currentInput = lastResult + value;
        } else {
            currentInput = value;
        }
        shouldResetDisplay = false;
        updateDisplay();
        return;
    }

    if (operators.includes(value)) {
        if (operators.includes(currentInput.slice(-1))) {
            return;
        }
    }

    currentInput += value;
    updateDisplay();
}

function calculate() {
    try {
        if (!currentInput) return;

        let result = eval(currentInput);

        if (!isFinite(result)) {
            currentInput = 'Error';
        } else {
            currentInput = result.toString();
            lastResult = currentInput;
        }

        shouldResetDisplay = true;
        updateDisplay();
    } catch {
        currentInput = 'Error';
        shouldResetDisplay = true;
        updateDisplay();
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

updateDisplay();
