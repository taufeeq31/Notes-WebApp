export const renderNotes = (notes) => {
    let newNote = notes.map(({id, note, isArchived, isPinned, title})=>{
        return (
            `<div class="single-note">
                <div>
                    <span class="title">${title}</span>
                    <button class="d-flex align-center button" data-type="del" data-id=${id}>
                        <span class="material-symbols-outlined" data-type="del" data-id=${id}>
                            delete
                        </span>
                    </button>
                </div>
                <p>${note}</p>
                <div>       
                     <button class="button" data-type="pinned" data-id=${id}>
                        <span data-type="pinned" data-id=${id} class="material-symbols-outlined">
                            keep
                        </span>
                    </button>

                </div>
            </div>`
        )
    });
    newNote = newNote.join("")
    return newNote;
}