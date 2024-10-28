// js/index.js
import { NoteHandler } from './modulos/NoteHandler.js';
import { NoteConsumer } from './modulos/NoteConsumer.js';
import { UI } from './modulos/Ui.js';

let notes = null;

document.getElementById('noteForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const tipo = document.getElementById('tipo').value;
    const contenido = document.getElementById('contenido').value;
    const fecha = document.getElementById('fecha').value;
    NoteHandler.getInstance('http://localhost:3000').addNote({ tipo, contenido, fecha }, (datos) => {
        notes = NoteConsumer.consum(datos.lista);
        UI.drawNotes(notes, document.getElementById('notes'));
    }, (error) => {
        console.error(error);
    });
});

document.getElementById('filterButton').addEventListener('click', () => {
    const filterMonth = document.getElementById('filterMonth').value;
    const filteredNotes = notes.filter(note => {
        const noteDate = new Date(note.fecha);
        const filterDate = new Date(filterMonth);
        return noteDate.getMonth() === filterDate.getMonth() && noteDate.getFullYear() === filterDate.getFullYear();
    });
    UI.drawNotes(filteredNotes, document.getElementById('notes'));
});

document.getElementById('notes').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-note')) {
        const noteId = event.target.dataset.id;
        NoteHandler.getInstance('http://localhost:3000').deleteNote(noteId, (datos) => {
            notes = NoteConsumer.consum(datos.lista);
            UI.drawNotes(notes, document.getElementById('notes'));
        }, (error) => {
            console.error(error);
        });
    }
});

NoteHandler.getInstance('http://localhost:3000').getAllNotes((datos) => {
    notes = NoteConsumer.consum(datos.lista);
    UI.drawNotes(notes, document.getElementById('notes'));
}, (error) => {
    console.error(error);
});