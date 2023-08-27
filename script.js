//++++++++++++++++++++++ To set number of columns as per screen width. ++++++++++++++++++++++++++++++++++++++++++++

const displayNote = document.querySelector('.display-note');

const myfunc = () => {
    const displayNoteWidth = displayNote.offsetWidth;
    let numberOfNotesInARow = Math.floor(displayNoteWidth / 198);

    // to set max and min no. of columns
    if (numberOfNotesInARow > 10 || numberOfNotesInARow < 3) {
        numberOfNotesInARow > 10 ? numberOfNotesInARow = 10 : numberOfNotesInARow = 3;
    }
    displayNote.style.gridTemplateColumns = `repeat(${numberOfNotesInARow}, 1fr)`;
}

window.addEventListener('resize', myfunc);
myfunc()


//++++++++++++++++++++++ To alter the add note HTML for small screens. ++++++++++++++++++++++++++++++++++++++++++++

const addNote = document.querySelector('.add-note');
let screenWidth = window.screen.width;

if (screenWidth <= 750) {
    addNote.innerHTML = `<button class="add-note-button"><div class="plus plus-line1"> </div><div class="plus plus-line2"> </div></button><span class="add-note-text">ADD NOTE</span><div class="add-note-input"><input type="text" class="title-text" placeholder="Title in 40 Characters" maxlength="40"><textarea class="body-text scrollbar" placeholder="Write here..."></textarea></div><button class="cancel-note-button">Cancel</button><button class="save-note-button">Save</button>`;
};


//++++++++++++++++++++++ To apply transitions and classes when clicked on add note button. ++++++++++++++++++++++++

const addNoteButton = document.querySelector('.add-note-button');

const saveNoteButton = document.querySelector('.save-note-button');
const plusInAddNoteButton = document.querySelectorAll('.plus');

const openAddNoteSection = () => {
    addNoteButton.classList.toggle('cancel-button');
    addNote.classList.toggle('add-note-active');
    saveNoteButton.classList.toggle('save-note-button-active');
    plusInAddNoteButton.forEach(plus => plus.classList.toggle('toggle-cross'));

    // to empty the input text fields when clicked on cancel button(which is also add note button).
    noteTitleText.value = '';
    noteContentText.value = '';
}

addNoteButton.addEventListener('click', openAddNoteSection)

// for mobile version( >=750px)
if (screenWidth <= 750) {
    const cancelNoteButton = document.querySelector('.cancel-note-button');
    cancelNoteButton.addEventListener('click', openAddNoteSection)
}


//++++++++++++++++++++++ To save not after filling the input text fields. ++++++++++++++++++++++++++++++++++++++++++

const noteTitleText = document.querySelector('.title-text');
const noteContentText = document.querySelector('.body-text');

// To format the digits of month date hour and minutes;
const singleDigitToDoubleDigit = (input) => {
    if (input < 10) {
        input = `0${input}`;
    }
    return input;
}

const saveNoteInLocalStorage = () => {
    // retutns the function if title is empty.
    if (noteTitleText.value === '') return;

    // date and time of saved note.
    const date = new Date;
    const currentYear = date.getFullYear();
    const currentMonth = singleDigitToDoubleDigit(date.getMonth() + 1);
    const currentDate = singleDigitToDoubleDigit(date.getDate());
    const currentHour = singleDigitToDoubleDigit(date.getHours());
    const currentMinutes = singleDigitToDoubleDigit(date.getMinutes());

    const dateAndTime = `${currentDate}-${currentMonth}-${currentYear} ${currentHour}:${currentMinutes}`;

    // to store as value in local storage note content and date time of note is fused in one string.
    const noteContentValueAndDateTime = `${noteContentText.value} -+- ${dateAndTime}`;

    localStorage.setItem(noteTitleText.value, noteContentValueAndDateTime);

    // for immediate display of note when note is saved.
    displayNote.innerHTML = displayNote.innerHTML + `<div class="note"><button class="delete-note"><img src="./assets/images/note-delete-cross.png" alt="Delete" class="delete-note-png"></button><div class="note-container"><p class="note-title">${noteTitleText.value}</p><hr class="note-hr"><p class="note-content scrollbar">${noteContentText.value}</p></div><p class="note-dateAndTime">${dateAndTime}</p></div>`

    // for hooking delete note feature immediatly after note is saved(if not we need to refresh the page.).
    deleteNoteButtons = document.querySelectorAll('.delete-note');
    deleteNoteButtons.forEach(button => button.addEventListener('click', deleteSelectedNote));

    // to empty the input text fields when clicked on cancel button(which is also add note button).
    noteTitleText.value = '';
    noteContentText.value = '';
}

saveNoteButton.addEventListener('click', saveNoteInLocalStorage);


//++++++++++++++++++++++ To list all the saved note in localStorage ++++++++++++++++++++++++++++++++++++++++++++++++

const listNotesInStorage = () => {
    // to empty the display before area before listing all the notes( in case of refresh ).
    displayNote.innerHTML = ``;

    Object.keys(localStorage).forEach((key) => {
        const value = localStorage.getItem(key);

        // to separate note content and date and time of saved note.
        const indexOfSeparatitionCode = value.indexOf("-+-");
        const noteContentInLocalStorage = value.slice(0, indexOfSeparatitionCode - 2);
        const dateTimeInLocalStorage = value.slice(indexOfSeparatitionCode + 3);

        displayNote.innerHTML = displayNote.innerHTML + `<div class="note"><button class="delete-note"><img src="./assets/images/note-delete-cross.png" alt="Delete" class="delete-note-png"></button><div class="note-container"><p class="note-title">${key}</p><hr class="note-hr"><p class="note-content scrollbar">${noteContentInLocalStorage}</p></div><p class="note-dateAndTime">${dateTimeInLocalStorage}</p></div>`;
    })
};
listNotesInStorage();


//++++++++++++++++++++++ To delete the hovered note from localStorage and display area. +++++++++++++++++++++++++++++

let deleteNoteButtons = document.querySelectorAll('.delete-note');

const deleteSelectedNote = function () {
    // to get the title of the note as it is the key.
    const selectedKey = this.nextSibling.firstElementChild.innerText;
    localStorage.removeItem(selectedKey);

    // to list all other notes after deleting one note.
    listNotesInStorage()

    // to reassign all the delete buttons after listing all notes again.
    deleteNoteButtons = document.querySelectorAll('.delete-note');
    deleteNoteButtons.forEach(button => button.addEventListener('click', deleteSelectedNote));
}

deleteNoteButtons.forEach(button => button.addEventListener('click', deleteSelectedNote));