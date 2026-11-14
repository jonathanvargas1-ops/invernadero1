class ErrorApi extends Error{
    constructor(status,message) {
        super(message);
        this.name = 'ErrorApi';
        this.status = status;
        /* status sera el tipo de error , y se definira en servicios asi que aqui estara ek parametro  */
    }
}
    function traducirMongoose (err){
        /* err es un objeto de error de Mongoose */
        if (err.code === 11000) {/* puntero accede al codigo de error, el cual 11000 es para decir dato repetido  */
            const campo= Object.keys(err.keyPattern)[0];
            /* err.keyPattern es un objeto que contiene los campos que causaron el error y object.keys() devuelve un array con las claves y la casilla [0]
            lo muestra */
            return new ErrorApi(409,`ya existe un registro con ese campo: ${campo}`);
        }
        if (err.name === 'CastError') {
            /* err.name es el nombre del error , casterror es el nombre que usa cuando no pudo convertir un valor
            en este caso el id   */
            return new ErrorApi(400,`Id mal formado: ${err.value}`);
    }
    if(err.name === 'ValidationError'){/* errores que rompen la regla de los datos permitidos  */
        const mensajes = Object.values(err.errors).map(e => e.message);
        /* err.errors es un objeto que contiene todos los errores, .map() lo recorre y devuelve un array con los mensajes, el map se aplica al 
        object.values (err.errors) */
        return new ErrorApi(400, mensajes.join(', '));
        /* msj.join(', ') une todos los mensajes con una coma y un espacio, */
}
return err;
}