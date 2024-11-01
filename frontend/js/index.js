// js/index.js
import { NoteHandler } from './modulos/NoteHandler.js';
import { NoteConsumer } from './modulos/NoteConsumer.js';
import { UI } from './modulos/Ui.js';

let notes = null;

// Evento para enviar el formulario
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

// Evento para filtrar las notas
document.getElementById('filterButton').addEventListener('click', () => {
    const filterMonth = document.getElementById('filterMonth').value;
    const filteredNotes = notes.filter(note => {
        const noteDate = new Date(note.fecha);
        const filterDate = new Date(filterMonth);
        return noteDate.getMonth() === filterDate.getMonth();
    });
    UI.drawNotes(filteredNotes, document.getElementById('notes'));
});

// Obtener todas las notas
NoteHandler.getInstance('http://localhost:3000').getAllNotes((datos) => {
    notes = NoteConsumer.consum(datos.lista);
    UI.drawNotes(notes, document.getElementById('notes'));
}, (error) => {
    console.error(error);
});