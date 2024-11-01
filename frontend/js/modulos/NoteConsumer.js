// js/modulos/NoteConsumer.js
import { Note } from './Note.js';

// Clase para consumir las notas
export class NoteConsumer {
    static consum(datos) { // Método para consumir las notas
        let notes = []; 
        datos.forEach(element => { // Se recorren las notas
            notes.push(new Note(element.tipo, element.contenido, element.fecha)); // Se crea una nueva nota y se agrega al arreglo
        });
        return notes;
    }
}