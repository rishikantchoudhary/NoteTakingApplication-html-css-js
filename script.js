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

// to display the delete cross on hovering over the note.
const togleDeleteButtonInNote = function () {
    this.firstElementChild.classList.toggle('delete-note-active')
}

/*

Hooking the functions with the elements.

*/

window.addEventListener('resize', myfunc);
myfunc()

notes.forEach(note => note.addEventListener('mouseenter', togleDeleteButtonInNote))
notes.forEach(note => note.addEventListener('mouseleave', togleDeleteButtonInNote))

// to add "..." if content overflows
noteTitles.forEach((noteTitle) => {
    if (noteTitle.scrollHeight > noteTitle.offsetHeight) {
        noteTitle.innerText = `${noteTitle.innerText.slice(0, 37)}...`;
    }
});
noteContents.forEach((noteContent)=>{
    if (noteContent.scrollHeight > noteContent.offsetHeight) {
        noteContent.innerText = `${noteContent.innerText.slice(0, 105)}...`;
    }
});












const openAddNoteSection = ()=>{
    addNoteButton.classList.toggle('note-active-button');
    addNote.classList.toggle('add-note-active');
    console.log(addNoteText)
}


const addNoteText = document.querySelector('.add-note-text');
const addNote = document.querySelector('.add-note');
const addNoteButton = document.querySelector('.add-note-button');

addNoteButton.addEventListener('click', openAddNoteSection)
