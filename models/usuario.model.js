const mongoose = require('mongoose');

const esquema = new mongoose.Schema({
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        trim: true
    },



});