const UserFactory = require('../models/userFactory'); 
const User = require('../models/user');

const registerUser = async (req, res, next) => {
	
	try {
		const version = req.baseUrl.split('/')[2]; // Extraer la versión de la URL
  		const userData = req.body;
		const user = await UserFactory.createUser(version, userData); // Crea el usuario según la versión
		if (user=='ERROR')res.status(500).json({ msg: 'Error al regisrar Usuario' });
		// Retornar solo campos relevantes según la versión
		 const responseData = version === 'v1' 
		 ? { id: user.id, nombre: user.nombre, apellido: user.apellido, correo: user.correo, contraseña: user.contraseña }
		 : { id: user.id, nombre: user.nombre, apellido: user.apellido, correo: user.correo, contraseña: user.contraseña, edad: user.edad, fecha_nacimiento: user.fecha_nacimiento };
		 
		res.status(201).json({ msg: 'Usuario registrado con éxito', responseData });
		
	} catch (err) {
		console.log(err)
		next(err);
	}  
	
  };

  const updateUser = async (req, res, next) => {
	try {
		const version = req.baseUrl.split('/')[2]; // Extraer la versión de la URL
		const userId= req.params.userId
  		const userData = req.body;
		const user = await UserFactory.updateUser(version,userId,userData)
		if (user=='ERROR')res.status(500).json({ msg: 'Error al actualizar Usuario' });
		// Retornar solo campos relevantes según la versión
		const responseData = version === 'v1' 
		 ? { id: user.id, nombre: user.nombre, apellido: user.apellido, correo: user.correo, contraseña: user.contraseña }
		 : { id: user.id, nombre: user.nombre, apellido: user.apellido, correo: user.correo, contraseña: user.contraseña, edad: user.edad, fecha_nacimiento: user.fecha_nacimiento };

        return res.status(200).json({msg: 'Usuario actualizado con éxito',responseData});
		
	} catch (err) {
		console.log(err)
		next(err);
	}  
	
  };

  const deleteUser = async (req, res, next) => {
	try {
		const userId= req.params.userId
		const deletedUser = await User.deleteById(userId);
		if (deletedUser=='ERROR')res.status(500).json({ msg: 'Error al eliminar Usuario' });
		if (!deletedUser) {
			return res.status(404).json({ msg: 'El Usuario a eliminar no existe',user:{id:userId} });
		  }
        return res.status(200).json({msg: 'Usuario eliminado con éxito',user:{id:userId}});
		
	} catch (err) {
		console.log(err)
		next(err);
	}  
	
  };

  const getUserById = async (req, res) => {
	const { userId } = req.params;
	const version = req.baseUrl.split('/')[2]; // Extraer la versión de la URL
  
	try {
	  const user = await User.findById(userId);
	  if (!user) {
		return res.status(404).json({ msg: 'Usuario no encontrado' });
	  }
	  if (user=='ERROR')res.status(500).json({ msg: 'Error obteniendo usuario por ID' });
	  // Retornar solo campos relevantes según la versión
	  const responseData = version === 'v1' 
		? { id: user.id, nombre: user.nombre, apellido: user.apellido, correo: user.correo }
		: { id: user.id, nombre: user.nombre, apellido: user.apellido, correo: user.correo, edad: user.edad, fecha_nacimiento: user.fecha_nacimiento };
  
	  res.status(200).json(responseData);
	} catch (err) {
	  console.error('Error obteniendo usuario:', err);
	  next(err);
	}
  };
 
  module.exports = {registerUser, updateUser, deleteUser, getUserById};