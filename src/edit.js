import { initializeEditPage, generateUpdatedMessage } from "./looks"
import { updateNote, removeNote } from "./notes"

const textElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const buttonElement = document.querySelector('#remove-note')
const updatedElement = document.querySelector('#updated-info')

const noteId = location.hash.substring(1)

initializeEditPage(noteId)

// Save title on the fly 
textElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    updatedElement.textContent = generateUpdatedMessage(note.updated)
})

// Save body on the fly
bodyElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    updatedElement.textContent = generateUpdatedMessage(note.updated)
})

// Remove note and relocate
buttonElement.addEventListener('click', (e) => {
    removeNote(noteId)
    location.assign('/index.html')
    
})

// Local storage change listener
window.addEventListener('storage', (e) => {                  
    if (e.key === 'notes') {                                 
        initializeEditPage(noteId)
    }
})