import { createNote } from './notes'
import { setFilters } from './filters'
import { showNotes } from './looks'

showNotes ()

document.querySelector('#create-note').addEventListener('click', (e) => {       
    const noteId = createNote()
    location.assign(`/edit.html#${noteId}`)
    
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    showNotes()
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    showNotes()
})

window.addEventListener('storage', (e) => {          
    if (e.key === 'notes') {
        showNotes()
    }
})