/* mongoose es el que habla con la base de datos */
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 8001;

async function iniciarServidor() {

    if (!process.env.MONGO_URI)
        throw new Error('Falta MONGO_URI en el archivo .env');
    if (!process.env.JWT_SECRET)
        throw new Error('Falta JWT_SECRET en el archivo .env');

}