// js/modulos/NoteHandler.js
import { NoteHandlerC } from './NoteHandlerC.js';

// Singleton para el manejador de notas
export const NoteHandler = {
    noteHandler: null,
    getInstance: (url) => {
        if (NoteHandler.noteHandler === null) { // Si no existe una instancia de NoteHandlerC
            NoteHandler.noteHandler = new NoteHandlerC(url); // Se crea una instancia de NoteHandlerC
        }
        return NoteHandler.noteHandler;
    }
}