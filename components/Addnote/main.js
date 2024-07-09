        const $ = (id) => document.getElementById(id);
        const toggleBtn = $('toggleNoteApp');
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

        toggleBtn.onclick = () => noteApp.classList.toggle('hidden');

        saveNoteBtn.onclick = () => {
            const noteText = noteInput.value.trim();
            if (noteText) {
                saveNote(noteText);
                displayNotes();
                noteInput.value = '';
            }
        };

        darkModeToggle.onclick = () => document.body.classList.toggle('dark-mode');

        closeSavedNoteBtn.onclick = closeSavedNotePopView;

        overlay.onclick = closeSavedNotePopView;

        editNoteBtn.onclick = editNote;

        deleteNoteBtn.onclick = deleteNote;

        function closeSavedNotePopView() {
            SavedNotePopView.classList.add('hidden');
            overlay.classList.add('hidden');
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
            });
        }

        function shortenNote(note, maxLength = 100) {
            return note.length <= maxLength ? note : note.substr(0, maxLength - 3) + '...';
        }

        function showSavedNotePopView(note, index) {
            SavedNoteContent.textContent = note;
            currentNoteIndex = index;
            SavedNotePopView.classList.remove('hidden');
            overlay.classList.remove('hidden');
        }

        function editNote() {
            const currentContent = SavedNoteContent.textContent;
            SavedNoteContent.innerHTML = `<textarea id="editNoteText">${currentContent}</textarea>`;
            editNoteBtn.textContent = 'Save';
            editNoteBtn.onclick = saveEditedNote;
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
            editNoteBtn.textContent = 'Edit';
            editNoteBtn.onclick = editNote;
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

        // Initial display of notes
        displayNotes();