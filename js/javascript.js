// Create a constant for all buttons
const btns = document.querySelectorAll('btn');

// Listen for when cursor is over button and call function
btns.forEach(btn => btn.addEventListener('mouseover', mouseHover));
//   Listen for when cursor is out of button and call function
btns.forEach(btn => btn.addEventListener('mouseout', mouseOut));

// When cursor is over button, add class to change background color
function mouseHover() {
    this.classList.add(`${this.className.split(' ')[0]}-hover`);
}

// When cursor is out of button, remove class to change background color
function mouseOut() {
    this.classList.remove(`${this.className.split(' ')[0]}-hover`);
}


// Get current text in textarea
// Listen for when button is clicked and call function
btns.forEach(btn => btn.addEventListener('click', btnClick));

// Find which button was clicked
// Call separate function for each button
function btnClick() {
    // Switch between the different classes of buttons
    switch (this.className.split(' ')[0]) {
        case 'ctrl':
            // Call the ctrl button method
            ctrlClick.call(this);
            break;
        case 'number':
            // Call the number button method
            numberClick.call(this);
            break;
        case 'operator':
            // Call the operator button method
            operatorClick.call(this);
            break;
    }
}

// Number Click
function numberClick() {
    // Get text area of inputted numbers
    const textarea = document.querySelector('.Input');
    
    // If button pressed is not decimal or there is not already a decimal in the input AND the input is not 0 enter
    if (((this.textContent !== '.' || !(textarea.textContent.includes('.'))) && textarea.textContent !== '0')) {
        // Append the number to the input text area
        textarea.textContent += this.textContent;
    } else if (textarea.textContent === '0') {
        // Enters if the input is 0 and the button pressed is not decimal
        // Replace the 0 with the number
        textarea.textContent = this.textContent;
    }
    
}

// Ctrl Click
function ctrlClick() {
    // Get the input text area
    const textarea = document.querySelector('.Input');
    
    // If the button pressed is delete then delete the last value in input
    if (this.textContent === 'Delete') {
        textarea.textContent = textarea.textContent.slice(0, -1);
    } else {
        // If the button pressed is clear then delete all values in input and history
        textarea.textContent = '0';
        document.querySelector('.History').textContent = '';
    }
}

// Operator Click
function operatorClick() {
    // Get the input and history text areas
    const textarea = document.querySelector('.Input');
    const history = document.querySelector('.History');

    // If the input is empty and the button pressed is not equals then enter
    if (textarea.textContent === '' && this.textContent !== '=') {
        // Replace the last operator in history with the new operator
        history.textContent = history.textContent.slice(0, -2) + ' ' + this.textContent + ' ';
    } else if (history.textContent === '' && this.textContent !== '=') {
        // If the history is empty and the button pressed is not equals then enter

        // Add the input and operator to history
        history.textContent += textarea.textContent + ' ' + this.textContent + ' ';
        // Clear the input
        textarea.textContent = '0';
    } else if (history.textContent !== '' && this.textContent !== '=') {
        // If the history is not empty and the button pressed is not equals then enter

        // Add the input
        history.textContent += textarea.textContent;
        // Calculate the answer of the history and input and then add the operator to the history
        history.textContent = calculate(history.textContent) + ' ' + this.textContent + ' ';
        // Clear the input
        textarea.textContent = '0';
    } else {
        // If the button pressed is equals then enter

        // If history is empty then nothing needs to happen
        if (history.textContent !== '') {
            // Add the input to history
            history.textContent += textarea.textContent;
            // Calculate the answer of the history then put the answer in input
            textarea.textContent = calculate(history.textContent);
            // Clear the history
            history.textContent = '';
        }
    }
}

// Calculate
function calculate() {
    // Get the history text area
    const history = document.querySelector('.History');
    let answer;

    // Switch on the operator in history
    switch (history.textContent.split(' ')[1]) {
        case '+':
            // Calculate the answer of the history addition
            answer = parseFloat(history.textContent.split(' ')[0]) + parseFloat(history.textContent.split(' ')[2]);
            break;
        case '-':
            // Calculate the answer of the history subtraction
            answer = parseFloat(history.textContent.split(' ')[0]) - parseFloat(history.textContent.split(' ')[2]);
            break;
        case '*':
            // Calculate the answer of the history multiplication
            answer = parseFloat(history.textContent.split(' ')[0]) * parseFloat(history.textContent.split(' ')[2]);
            break;
        case '/':
            // Calculate the answer of the history division
            answer = parseFloat(history.textContent.split(' ')[0]) / parseFloat(history.textContent.split(' ')[2]);
            break;
    }
    // Return the answer
    return answer;
}