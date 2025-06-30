import { renderNotes } from "./app.js";

let note = document.getElementById("note-area");
let add_btn = document.getElementById("add-btn");
let title = document.getElementById("note-title");
let notesDisplay = document.getElementById("notes-display");
let pinnedNotesContainer = document.querySelector(".pinned-notes-container");
let notesContainer = document.querySelector(".notes-container");

let arrayOfNotes = JSON.parse(localStorage.getItem("notes")) || [];

const updateNotesDisplay = () => {
    const pinnedNotes = arrayOfNotes.filter(({ isPinned }) => isPinned);
    const unpinnedNotes = arrayOfNotes.filter(({ isPinned }) => !isPinned);
    
    pinnedNotesContainer.innerHTML = renderNotes(pinnedNotes);
    notesContainer.innerHTML = renderNotes(unpinnedNotes);

    const pinTitle = document.querySelector('.pin-title');
    const otherTitle = document.querySelector('.other-title');

    if (pinnedNotes.length > 0) {
        pinTitle.classList.remove('d-none');
    } else {
        pinTitle.classList.add('d-none');
    }

    if (unpinnedNotes.length > 0 && pinnedNotes.length > 0) {
        otherTitle.classList.remove('d-none');
    } else {
        otherTitle.classList.add('d-none');
    }
};

notesDisplay.addEventListener("click", (event) => {
    const type = event.target.dataset.type;
    const noteId = event.target.dataset.id;

    if (!type) return;

    switch (type) {
        case 'del':
            arrayOfNotes = arrayOfNotes.filter(({ id }) => id.toString() !== noteId);
            break;
        case 'pinned':
            arrayOfNotes = arrayOfNotes.map(note =>
                note.id.toString() === noteId ? { ...note, isPinned: !note.isPinned } : note
            );
            break;
    }
    
    localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
    updateNotesDisplay();
});

add_btn.addEventListener("click", () => {
    if (note.value.trim().length > 0 || title.value.trim().length > 0) {
        arrayOfNotes.push({
            id: Date.now(),
            title: title.value.trim(),
            note: note.value.trim(),
            isPinned: false,
            isArchived: false
        });
        note.value = title.value = "";
        localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
        updateNotesDisplay();
    }
});

// Initial render
updateNotesDisplay();