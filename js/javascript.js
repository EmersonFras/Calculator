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
    switch (this.className.split(' ')[0]) {
        case 'ctrl':
            ctrlClick.call(this);
            break;
        case 'number':
            numberClick.call(this);
            break;
        case 'operator':
            operatorClick.call(this);
            break;
    }
}

// Number Click
// Add number to input text area
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
// If delete than I need to delete the last value in input
// If clear i need to delete all values in input and histroy
function ctrlClick() {
    // Get the input text area
    const textarea = document.querySelector('.Input');
    
    // If the button pressed is delete then delete the last value in input
    if (this.textContent === 'Delete') {
        textarea.textContent = textarea.textContent.slice(0, -1);
    } else {
        // If the button pressed is clear then delete all values in input and history
        textarea.textContent = '';
        document.querySelector('.History').textContent = '';
    }
}

// Operator Click
// Number currently in input needs added to history
// Operator text content needs added to history after number
// If text is in input then the previous steps need taken
// If text is in history then call a function to calculate the answer
// of the histroy and current input and put the answer in histroy with the next
// operator
// If there is no text then change the last operator in history
// If equals is pressed then call a function to calculate the answer
// then clear the history and put the answer in input
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
        textarea.textContent = '';
    } else if (history.textContent !== '' && this.textContent !== '=') {
        // If the history is not empty and the button pressed is not equals then enter

        // Add the input
        history.textContent += textarea.textContent;
        // Calculate the answer of the history and input and then add the operator to the history
        history.textContent = calculate(history.textContent) + ' ' + this.textContent + ' ';
        // Clear the input
        textarea.textContent = '';
    } else {
        // If the button pressed is equals then enter

        // Add the input to history
        history.textContent += textarea.textContent;
        // Calculate the answer of the history then put the answer in input
        textarea.textContent = calculate(history.textContent);
        // Clear the history
        history.textContent = '';
    }
}

// Calculate
function calculate() {
    const history = document.querySelector('.History');
    let answer;
    switch (history.textContent.split(' ')[1]) {
        case '+':
            answer = parseFloat(history.textContent.split(' ')[0]) + parseFloat(history.textContent.split(' ')[2]);
            break;
        case '-':
            answer = parseFloat(history.textContent.split(' ')[0]) - parseFloat(history.textContent.split(' ')[2]);
            break;
        case '*':
            answer = parseFloat(history.textContent.split(' ')[0]) * parseFloat(history.textContent.split(' ')[2]);
            break;
        case '/':
            answer = parseFloat(history.textContent.split(' ')[0]) / parseFloat(history.textContent.split(' ')[2]);
            break;
    }
    return answer;
}