// Objetivo: Contiene las funciones que se encargan de la interfaz de usuario para imprimir las notas en el cliente.
export const UI = {
    drawNotes: (notes, elementDiv) => {
        elementDiv.innerHTML = ''; // Limpia el contenido anterior
        notes.forEach(element => {
            const noteDiv = document.createElement('div');
            noteDiv.className = `note ${element.tipo}`;
            noteDiv.innerHTML = `
                <p>${element.contenido}</p>
                <p>${new Date(element.fecha).toLocaleDateString()}</p>`;
            elementDiv.appendChild(noteDiv);
        });
    }
}