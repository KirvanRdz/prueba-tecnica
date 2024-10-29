const User = require('./user');

class UserFactory {
  static async createUser(version, data) {
    if (version === 'v1') {
      const { nombre, apellido, correo, contraseña } = data;
      const user =new User(version, { nombre, apellido, correo, contraseña });
      const res=await user.save();
      return res; 
    } else if (version === 'v2') {
      const { nombre, apellido, correo, contraseña, edad, fecha_nacimiento } = data;
      const user = new User(version, { nombre, apellido, correo, contraseña, edad, fecha_nacimiento });
      const res=await user.save();
      return res; 
    }
    throw new Error('Versión no soportada');
  }

  static async updateUser(version, id, data) {
    if (version === 'v1') {
      const {  nombre, apellido, correo, contraseña } = data;
      const user =new User(version, { id, nombre, apellido, correo, contraseña });
      const res=await user.updateById();
      return res; 
    } else if (version === 'v2') {
      const {  nombre, apellido, correo, contraseña, edad, fecha_nacimiento } = data;
      const user = new User(version, { id, nombre, apellido, correo, contraseña, edad, fecha_nacimiento });
      const res=await user.updateById();
      return res; 
    }
    throw new Error('Versión no soportada');
  }
}

module.exports = UserFactory;
