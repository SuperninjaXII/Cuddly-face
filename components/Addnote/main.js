const $ = (id) => document.getElementById(id);
const noteApp = $('noteApp');
const noteInput = $('noteInput');
const saveNoteBtn = $('saveNoteBtn');
const notesContainer = $('notesContainer');
const darkModeToggle = $('darkModeToggle');
const SavedNotePopView = $('SavedNotePopView');
const SavedNoteContent = $('SavedNoteContent');
const overlay = $('overlay');
const closeSavedNoteBtn = SavedNotePopView.querySelector('.close-btn');
const editNoteBtn = $('editNoteBtn');
const deleteNoteBtn = $('deleteNoteBtn');

let currentNoteIndex = -1;
let isEditing = false;

window.onload = () => {
    noteApp.classList.toggle('hidden');
    setTimeout(() => noteApp.classList.toggle('show'), 10);
    
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
};

saveNoteBtn.onclick = () => {
    const noteText = noteInput.value.trim();
    if (noteText) {
        saveNote(noteText);
        displayNotes();
        noteInput.value = ''; 
        saveNoteBtn.textContent = 'Saved!';
        saveNoteBtn.disabled = true;
        setTimeout(() => {
            saveNoteBtn.textContent = 'Save Note';
            saveNoteBtn.disabled = false;
        }, 1000);
    }
};

darkModeToggle.onclick = () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
};
closeSavedNoteBtn.onclick = closeSavedNotePopView;

overlay.onclick = closeSavedNotePopView;

editNoteBtn.onclick = editNote;

deleteNoteBtn.onclick = deleteNote;

function closeSavedNotePopView() {
    if (isEditing) {
        if (confirm('You have unsaved changes. Are you sure you want to close?')) {
            resetEditState();
        } else {
            return;
        }
    }
    SavedNotePopView.classList.remove('show');
    overlay.classList.remove('show');
    setTimeout(() => {
        SavedNotePopView.classList.add('hidden');
        overlay.classList.add('hidden');
    }, 300);
}

function saveNote(note) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.unshift(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function displayNotes() {
    notesContainer.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.textContent = shortenNote(note);
        noteElement.onclick = () => showSavedNotePopView(note, index);
        notesContainer.appendChild(noteElement);
        setTimeout(() => noteElement.classList.add('show'), 50 * index);
    });
}

function shortenNote(note, maxLength = 100) {
    return note.length <= maxLength ? note : note.substr(0, maxLength - 3) + '...';
}

function showSavedNotePopView(note, index) {
    SavedNoteContent.textContent = note;
    currentNoteIndex = index;
    isEditing = false;
    updateEditButtonState();
    SavedNotePopView.classList.remove('hidden');
    overlay.classList.remove('hidden');
    setTimeout(() => {
        SavedNotePopView.classList.add('show');
        overlay.classList.add('show');
    }, 10);
}

function updateEditButtonState() {
    editNoteBtn.textContent = isEditing ? 'Save' : 'Edit';
    editNoteBtn.onclick = isEditing ? saveEditedNote : editNote;
}

function editNote() {
    const currentContent = SavedNoteContent.textContent;
    SavedNoteContent.innerHTML = `<textarea id="editNoteText">${currentContent}</textarea>`;
    isEditing = true;
    updateEditButtonState();
}

function saveEditedNote() {
    const editedNote = $('editNoteText').value.trim();
    if (editedNote) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes[currentNoteIndex] = editedNote;
        localStorage.setItem('notes', JSON.stringify(notes));
        SavedNoteContent.textContent = editedNote;
        displayNotes();
    }
    isEditing = false;
    updateEditButtonState();
}

function resetEditState() {
    isEditing = false;
    updateEditButtonState();
    showSavedNotePopView(JSON.parse(localStorage.getItem('notes'))[currentNoteIndex], currentNoteIndex);
}

function deleteNote() {
    if (confirm('Are you sure you want to delete this note?')) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(currentNoteIndex, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
        closeSavedNotePopView();
    }
}

const exportNotesBtn = $('exportNotesBtn');

        exportNotesBtn.onclick = exportNotes;

        function exportNotes() {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            if (notes.length === 0) {
                alert('No notes to export!');
                return;
            }

            const exportContent = notes.map((note, index) => `Note ${index + 1}:\n${note}\n\n`).join('');
            const blob = new Blob([exportContent], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'my_notes.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

// display of notes
displayNotes();