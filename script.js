/*

Getting the elements.

*/

const displayNote = document.querySelector('.display-note');

/*

Creating the functions.

*/

// to set number of columns as per screen width.
const myfunc = () => {
    const displayNoteWidth = displayNote.offsetWidth;
    let numberOfNotesInARow = Math.floor(displayNoteWidth / 198);
    
    // to set max and min no. of columns
    if (numberOfNotesInARow > 10 || numberOfNotesInARow < 3) {
        numberOfNotesInARow > 10 ? numberOfNotesInARow = 10 : numberOfNotesInARow = 3;
    }
    displayNote.style.gridTemplateColumns = `repeat(${numberOfNotesInARow}, 1fr)`;
}

/*

Hooking the functions with the elements.

*/

window.addEventListener('resize', myfunc);
myfunc()



const openAddNoteSection = () => {
    addNoteButton.classList.toggle('cancel-button');
    addNote.classList.toggle('add-note-active');
    saveNoteButton.classList.toggle('save-note-button-active');
    plusInAddNoteButton.forEach(plus => plus.classList.toggle('toggle-cross'));
    
    noteTitleText.value = '';
    noteContentText.value = '';
}


const addNote = document.querySelector('.add-note');
const addNoteButton = document.querySelector('.add-note-button');
const saveNoteButton = document.querySelector('.save-note-button');
const plusInAddNoteButton = document.querySelectorAll('.plus');
const noteTitleText = document.querySelector('.title-text');
const noteContentText = document.querySelector('.body-text');

addNoteButton.addEventListener('click', openAddNoteSection)



// save button;

const singleDigitToDoubleDigit = (input) => {
    if (input < 10) {
        input = `0${input}`;
    }
    return input;
}

const saveNoteInLocalStorage = () => {
    if (noteTitleText.value === '') return;  // retutns the function if title is empty.
    
    const date = new Date;
    const currentYear = date.getFullYear();
    const currentMonth = singleDigitToDoubleDigit(date.getMonth() + 1);
    const currentDate = singleDigitToDoubleDigit(date.getDate());
    const currentHour = singleDigitToDoubleDigit(date.getHours());
    const currentMinutes = singleDigitToDoubleDigit(date.getMinutes());
    
    const dateAndTime = `${currentDate}-${currentMonth}-${currentYear} ${currentHour}:${currentMinutes}`;
    
    const noteContentValueAndDateTime = `${noteContentText.value} -+- ${dateAndTime}`;
    
    localStorage.setItem(noteTitleText.value, noteContentValueAndDateTime);
    
    displayNote.innerHTML = displayNote.innerHTML + `<div class="note"><button class="delete-note"><img src="./assets/images/note-delete-cross.png" alt="Delete" class="delete-note-png"></button><div class="note-container"><p class="note-title">${noteTitleText.value}</p><hr class="note-hr"><p class="note-content scrollbar">${noteContentText.value}</p></div><p class="note-dateAndTime">${dateAndTime}</p></div>`
    
    noteTitleText.value = '';
    noteContentText.value = '';
}

saveNoteButton.addEventListener('click', saveNoteInLocalStorage);


const listNotesInStorageButton = () => {
    displayNote.innerHTML = ``;
    Object.keys(localStorage).forEach((key) => {
        const value = localStorage.getItem(key);
        const indexOfSeparatitionCode = value.indexOf("-+-");
        const noteContentInLocalStorage = value.slice(0, indexOfSeparatitionCode - 2);
        const dateTimeInLocalStorage = value.slice(indexOfSeparatitionCode + 3);
        
        displayNote.innerHTML = displayNote.innerHTML + `<div class="note"><button class="delete-note"><img src="./assets/images/note-delete-cross.png" alt="Delete" class="delete-note-png"></button><div class="note-container"><p class="note-title">${key}</p><hr class="note-hr"><p class="note-content scrollbar">${noteContentInLocalStorage}</p></div><p class="note-dateAndTime">${dateTimeInLocalStorage}</p></div>`;
    })
};
listNotesInStorageButton();

const deleteNoteButtons = document.querySelectorAll('.delete-note');

const deleteSelectedNote = function(){
    console.log('hello');
    const selectedKey = this.nextSibling.firstElementChild.innerText;
    localStorage.removeItem(selectedKey);
    listNotesInStorageButton()
}

deleteNoteButtons.forEach(button => button.addEventListener('click', deleteSelectedNote));