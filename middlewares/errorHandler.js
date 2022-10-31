function logErrors(err, req, res, next) {
  console.log('logErrors');
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log('errorHandler');
  res.status(400).json({
    message: err,
    stack: err.stack
  });
}

/* También deberíamos preocuparnos por tener un handle de los
errores de boom, esto lo hacemos así: */
function boomErrorHandler(err, req, res, next) {
  /* La librería se encarga de clasificar si un error viene manejado de ella misma o no con la propiedad "isBoom" */
  if (err.isBoom) {
    /* Boom tiene toda la información de este error en la propiedad
    output */
    const { output } = err;
    /* Para tener un status code dinámico podemos usar la propiedad
    del output de boom llamado "statusCode", y la información del
    error se enviará en el "output.payload" */
    res.status(output.statusCode).json(output.payload);
  }
  next(err)
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
