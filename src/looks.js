import moment from 'moment'
import  { getFilters } from './filters'
import { sortByNotes, getNotes } from './notes'

// Generate the DOM structure for note
const generateNoteDom = (note) => {
    const noteEl = document.createElement('a')
    const pgphEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // Setup the note title text, class and append
    if (note.title.length > 0) {
        pgphEl.textContent = note.title 
    } else {
        pgphEl.textContent = 'Unnamed note'
    }
    pgphEl.classList.add('list-item__title')
    noteEl.appendChild(pgphEl)                                  

    // Setup the status Element and append
    statusEl.textContent = generateUpdatedMessage(note.updated)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    // Setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    return noteEl
}

// Render application notes
const showNotes = () => { 
    const notesEl = document.querySelector('#div1')
    const filters = getFilters()
    const notes = sortByNotes(filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML=''              
    
    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {                   
            const noteEl = generateNoteDom(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const message = document.createElement('p')
        message.classList.add('empty-message')                           
        message.textContent = 'No existing notes'                        
        notesEl.appendChild(message)
    }
}

// Generate Last updated message
const generateUpdatedMessage = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}

// Initialize looks for edit page
const initializeEditPage = (noteId) => {
    const textElement = document.querySelector('#note-title')
    const bodyElement = document.querySelector('#note-body')
    const updatedElement = document.querySelector('#updated-info')

    const notes = getNotes()
    const note = notes.find((note) => note.id === noteId)                 
                                                                                                                                    
    if (!note) {
        location.assign('/index.html')
    }

    textElement.value = note.title
    bodyElement.textContent = note.body
    updatedElement.textContent = generateUpdatedMessage(note.updated)
}

export { generateNoteDom, showNotes, generateUpdatedMessage, initializeEditPage }