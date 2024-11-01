// js/modulos/NoteHandlerC.js
export class NoteHandlerC {
    // Constructor de la clase
    constructor(url) {
        this._url = url;
        this._lastQueryStatus = null;
    }

    // Método para obtener todas las notas
    getAllNotes(onSuccesCallBack, onErrorCallBack) {
        fetch(`${this._url}/notes`)
            .then((datos) => {
                datos.json().then((datos) => {
                    this._lastQueryStatus = true;
                    onSuccesCallBack(datos);
                }, (error) => {
                    this._lastQueryStatus = false;
                    onErrorCallBack('JSONException');
                })
            }, (error) => {
                this._lastQueryStatus = false;
                onErrorCallBack('ConnectionException');
            });
    }

    // Método para agregar una nota
    addNote(note, onSuccesCallBack, onErrorCallBack) {
        fetch(`${this._url}/addNote`, { // Se envía la petición POST    
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then((response) => { // Se obtiene la respuesta
            if (response.ok) {
                response.json().then((data) => {
                    this._lastQueryStatus = true;
                    onSuccesCallBack(data);
                });
            } else { // Si la respuesta no es correcta se llama a la función de error
                this._lastQueryStatus = false;
                onErrorCallBack('ServerError');
            }
        })
        .catch((error) => { // Si hay un error en la petición se llama a la función de error
            this._lastQueryStatus = false;
            onErrorCallBack('ConnectionException');
        });
    }


}