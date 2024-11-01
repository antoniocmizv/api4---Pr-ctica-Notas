// js/modulos/Ui.js
export const UI = {
    drawNotes: (notes, elementDiv) => {
        elementDiv.innerHTML = ''; // Limpia el contenido anterior
        notes.forEach(element => {
            const noteDiv = document.createElement('div');
            noteDiv.className = `note ${element.tipo}`;
            noteDiv.innerHTML = `
                <p>${element.contenido}</p>
                <p>${new Date(element.fecha).toLocaleDateString()}</p>
                <button class="delete-note" data-id="${element._id}">Eliminar</button>
            `;
            elementDiv.appendChild(noteDiv);
        });
    }
}