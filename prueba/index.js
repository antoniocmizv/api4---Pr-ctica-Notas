// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/Notas');

// Definir el esquema y el modelo de la nota
const noteSchema = new mongoose.Schema({
    tipo: String,
    contenido: String,
    fecha: Date
});

const Note = mongoose.model('Note', noteSchema);

app.use(cors());
app.use(express.json());

app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.send({ lista: notes });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/addNote', async (req, res) => {
    try {
        const newNote = new Note({
            tipo: req.body.tipo,
            contenido: req.body.contenido,
            fecha: new Date(req.body.fecha)
        });
        await newNote.save();
        const notes = await Note.find();
        res.send({ lista: notes });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});