        const $ = (id) => document.getElementById(id);
        const toggleBtn = $('toggleNoteApp');
        const noteApp = $('noteApp');
        const noteInput = $('noteInput');
        const saveNoteBtn = $('saveNoteBtn');
        const notesContainer = $('notesContainer');
        const darkModeToggle = $('darkModeToggle');
        const artifactView = $('artifactView');
        const artifactContent = $('artifactContent');
        const overlay = $('overlay');
        const closeArtifactBtn = artifactView.querySelector('.close-btn');

        toggleBtn.onclick = function() {
            noteApp.classList.toggle('hidden');
        }

        saveNoteBtn.onclick = function() {
            const noteText = noteInput.value.trim();
            if (noteText) {
                saveNote(noteText);
                displayNotes();
                noteInput.value = '';
            }
        }

        darkModeToggle.onclick = function() {
            document.body.classList.toggle('dark-mode');
        }

        closeArtifactBtn.onclick = closeArtifact;

        overlay.onclick = closeArtifact;

        function closeArtifact() {
            artifactView.classList.add('hidden');
            overlay.classList.add('hidden');
        }

        function saveNote(note) {
            let notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.unshift(note); // Add new note to the beginning
            localStorage.setItem('notes', JSON.stringify(notes));
        }

        function displayNotes() {
            notesContainer.innerHTML = '';
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.forEach((note, index) => {
                const noteElement = document.createElement('div');
                noteElement.classList.add('note');
                noteElement.textContent = shortenNote(note);
                noteElement.onclick = function() {
                    showArtifact(note);
                }
                notesContainer.appendChild(noteElement);
            });
        }

        function shortenNote(note, maxLength = 100) {
            if (note.length <= maxLength) return note;
            return note.substr(0, maxLength - 3) + '...';
        }

        function showArtifact(note) {
            artifactContent.textContent = note;
            artifactView.classList.remove('hidden');
            overlay.classList.remove('hidden');
        }

        // Initial display of notes
        displayNotes();