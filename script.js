const displayNote = document.querySelector('.display-note');

// to set number of columns as per screen size
const myfunc = ()=>{
    const displayNoteWidth = displayNote.offsetWidth;
    let numberOfNotesInARow = Math.floor(displayNoteWidth/198);
    
    // to set max and min no. of columns
    if(numberOfNotesInARow > 10 || numberOfNotesInARow < 3){
        numberOfNotesInARow > 10 ? numberOfNotesInARow = 10 : numberOfNotesInARow =3;
    }
    displayNote.style.gridTemplateColumns = `repeat(${numberOfNotesInARow}, 1fr)`;
}

window.addEventListener('resize', myfunc);
myfunc()











const notes = document.querySelectorAll('.note');
const deleteNoteButtons = document.querySelectorAll('.delete-note');

const togleDeleteButtonInNote = function(){
    this.firstElementChild.classList.toggle('delete-note-active')
}

notes.forEach(note => note.addEventListener('mouseenter', togleDeleteButtonInNote))
notes.forEach(note => note.addEventListener('mouseleave', togleDeleteButtonInNote))
