const checkBodyUpdate = (req, res, next) => {
    const { nombre, apellido, correo, contraseña, edad, fecha_nacimiento } = req.body;
    const version = req.baseUrl.split('/')[2]; // Extraer la versión de la URL
    
    if (version=='v1' && !nombre && !apellido && !correo && !contraseña) {
      return res.status(400).json({
        msg: 'Debes proporcionar al menos un campo para actualizar.',
        datos:{
            nombre:'string',
            apellido:'string',
            correo:'string',
            contraseña:'string',
          }
      });
    }
    if (version=='v2' && !nombre && !apellido && !correo && !contraseña && !edad && !fecha_nacimiento) {
        return res.status(400).json({
          msg: 'Debes proporcionar al menos un campo para actualizar.',
          datos:{
            nombre:'string',
            apellido:'string',
            correo:'string',
            contraseña:'string',
            edad:'int',
            fecha_nacimiento:'YYYY/MM/DD'
          }
        });
      }
    next();
  };

  module.exports = {
    checkBodyUpdate
  };