const express = require('express');
const { manejarErrores} = require('./errores');/* trae archivo directo de errores.js y saca manejarErroress */
const app = express(); 

app.use((req,res,next)=>{console.log (req.method, req.url);
 next();   
});

app.use(express.json()); /* lee la solicitud y la convierte en un objeto de JavaScript para poder usarla en el servidor */
app.use(express.static('public'));

/* aqui se inyectara repositorioa en el servicio 
junto conn la creacion de un router? que le pasare el servicio  */

app.use((req, res) => {
  res.status(404).json({ error: `No existe ${req.method} ${req.url}` });
}
);

app.use(manejarErrores);/* se pone al final para que se ejecute despues de todas las rutas y middlewares */

module.exports = app;
