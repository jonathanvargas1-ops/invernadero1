/* mongoose es el que habla con la base de datos */
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 8001;

async function iniciarServidor() {

    if (!process.env.MONGODB_URI)
        throw new Error('Falta MONGODB_URI en el archivo .env');
    if (!process.env.JWT_SECRET)
        throw new Error('Falta JWT_SECRET en el archivo .env');
    
    /* conectarse a la base de datos */
    await mongoose.connect(process.env.MONGODB_URI);
    
        console.log('conectado a la base de datos');

        
        app.listen(PORT, (error) => {
        if(error) throw error;
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });

}

iniciarServidor();
    