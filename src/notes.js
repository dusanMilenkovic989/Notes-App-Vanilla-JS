import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

let notes = []

// Read existing notes from local storage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    
    try {
        return notesJSON ? JSON.parse(notesJSON) : []                                   
    } catch (e) {
        return []
    }
}

// Save notes to local storage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Expose notes from module
const getNotes = () => notes

// Create new note
const createNote = () => {
    const noteId = uuidv4()
    const timestamp = moment().valueOf()

    notes.push({
        id: noteId,
        title: '',
        body: '',
        created: timestamp,
        updated: timestamp
    })

    saveNotes()

    return noteId
}

// Remove notes
const removeNote = (id) => {
    const noteIndex = notes.findIndex((item) => item.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}

// Sort Notes by function
const sortByNotes = (sort) => {
    if (sort === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updated > b.updated) {
                return -1
            } else if (a.updated < b.updated) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sort === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.created > b.created) {
                return -1
            } else if (a.created < b.created) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sort === 'alphabetically') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

// Update existing note
const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)

    if (!note) {
        return 
    }

    if (typeof updates.title === 'string') {
        note.title = updates.title
        note.updated = moment().valueOf()
    }

    if (typeof updates.body === 'string') {
        note.body = updates.body
        note.updated = moment().valueOf()
    }

    saveNotes()

    return note
}

notes = loadNotes()

export { getNotes, createNote, removeNote, sortByNotes, updateNote }