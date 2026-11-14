const mongoose = require('mongoose');

const esquema = new mongoose.Schema({
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        trim: true
    },
    hash: {
        type: String,
        required: [true, 'La clave es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    rol: {
        type: String,
        enum: ['admin', 'usuario'],
        default: 'usuario'
    }
});

module.exports = mongoose.model('Usuario', esquema);