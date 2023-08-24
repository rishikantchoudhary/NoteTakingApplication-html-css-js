/*

Getting the elements.

*/

const displayNote = document.querySelector('.display-note');

const notes = document.querySelectorAll('.note');
const deleteNoteButtons = document.querySelectorAll('.delete-note');

const noteTitles = document.querySelectorAll('.note-title');
const noteContents = document.querySelectorAll('.note-content');

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

// to add "..." if content overflows
noteTitles.forEach((noteTitle) => {
    if (noteTitle.scrollHeight > noteTitle.offsetHeight) {
        noteTitle.innerText = `${noteTitle.innerText.slice(0, 35)}...`;
    }
});
noteContents.forEach((noteContent)=>{
    if (noteContent.scrollHeight > noteContent.offsetHeight) {
        noteContent.innerText = `${noteContent.innerText.slice(0, 105)}...`;
    }
});



const openAddNoteSection = ()=>{
    addNoteButton.classList.toggle('cancel-button');
    addNote.classList.toggle('add-note-active');
    saveNoteButton.classList.toggle('save-note-button-active');
    plusInAddNoteButton.forEach(plus => plus.classList.toggle('toggle-cross'));

    noteTitleText.value = '';
    noteContentText.value = '';
}


const addNoteText = document.querySelector('.add-note-text');
const addNote = document.querySelector('.add-note');
const addNoteButton = document.querySelector('.add-note-button');
const saveNoteButton = document.querySelector('.save-note-button');
const plusInAddNoteButton = document.querySelectorAll('.plus');
const noteTitleText = document.querySelector('.title-text');
const noteContentText = document.querySelector('.body-text');

addNoteButton.addEventListener('click', openAddNoteSection)



// save button;

const saveNoteInLocalStorage = ()=>{
    if(noteTitleText.value === '') return;  // retutns the function if title is empty.

    const date = new Date;
    const [currentYear, currentMonth, currentDate, currentHour, currentMinutes] = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()];

    const dateAndTime = `${currentDate}-${currentMonth}-${currentYear} ${currentHour}:${currentMinutes}`

    localStorage.setItem(noteTitleText.value, noteContentText.value);

    if(noteTitleText.value.length > 36){
        noteTitleText.value = `${noteTitleText.value.slice(0,35)}...`;
    }
    if(noteContentText.value.length > 106){
        noteContentText.value = `${noteContentText.value.slice(0,105)}...`;
    }

    displayNote.innerHTML = displayNote.innerHTML + `<div class="note"><button class="delete-note"><img src="./assets/images/note-delete-cross.png" alt="Delete" class="delete-note-png"></button><div class="note-container"><p class="note-title">${noteTitleText.value}</p><hr class="note-hr"><p class="note-content">${noteContentText.value}</p></div><p class="note-dateAndTime">${dateAndTime}</p></div>`

    noteTitleText.value = '';
    noteContentText.value = '';
}

saveNoteButton.addEventListener('click',saveNoteInLocalStorage);


// Object.keys(localStorage).forEach((key)=>{
//     console.log(localStorage.getItem(l=key))
// })