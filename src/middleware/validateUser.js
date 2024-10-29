
const { body, param, validationResult } = require('express-validator');
const User = require('../models/user'); // Asegúrate de importar tu modelo de usuario

// Validaciones para registrar un usuario
const validateRegisterUserV1 = [
  body('nombre').notEmpty().withMessage('El nombre es requerido.'),
  body('apellido').notEmpty().withMessage('El apellido es requerido.'),
  body('correo')
    .isEmail().withMessage('El correo debe ser válido.')
    .custom(async (value) => {
      const userExists = await User.findOneByEmail(value);
      if (userExists) {
        throw new Error('El usuario ya existe.');
      }
    }),
  body('contraseña')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
    .matches(/[A-Z]/).withMessage('La contraseña debe tener al menos una letra mayúscula.')
    .matches(/[a-z]/).withMessage('La contraseña debe tener al menos una letra minúscula.')
    .matches(/\d/).withMessage('La contraseña debe tener al menos un dígito.')
    .matches(/[!@#$%^&*]/).withMessage('La contraseña debe tener al menos un carácter especial.'),
];

// Validaciones para registrar un usuario en la versión v2
const validateRegisterUserV2 = [
  ...validateRegisterUserV1,
  body('edad').isInt({ min: 1 }).withMessage('La edad debe ser un número entero positivo.'),
  body('fecha_nacimiento').isDate().withMessage('La fecha de nacimiento debe ser una fecha válida en formato YYYY-MM-DD.')
];

// Validaciones para actualizar un usuario en la versión v1
const validateUpdateUserV1 = [
  param('userId')
    .notEmpty()
    .withMessage('El ID del usuario es requerido.')
    .isInt()
    .withMessage('ID inválido.')
    .custom(async (userId) => {
      // Validar que el usuario exista
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('El usuario no existe.');
      }
    }),
  body('nombre').optional()
    .notEmpty().withMessage('El nombre es requerido si se proporciona.')
    .custom(async (nombre, { req }) => {
      // Verificar duplicado de nombre y apellido en otro usuario
      const user = await User.findOneByNameAndLastname( nombre, req.body.apellido );
      if (user && user.id !== parseInt(req.params.userId)) {
        throw new Error('El nombre y apellido ya están en uso por otro usuario.');
      }
    }),
  body('apellido').optional()
    .notEmpty().withMessage('El apellido es requerido si se proporciona.')
    .custom(async (apellido, { req }) => {
      // Verificar duplicado de apellido y nombre en otro usuario
      const user = await User.findOneByNameAndLastname( req.body.nombre, apellido );
      if (user && user.id !== parseInt(req.params.userId)) {
        throw new Error('El nombre y apellido ya están en uso por otro usuario.');
      }
    }),
  body('correo').optional()
    .isEmail().withMessage('El correo debe ser válido.')
    .custom(async (correo, { req }) => {
      // Validar que el correo no esté duplicado en otro usuario
      const user = await User.findOneByEmail(correo);
      if (user && user.id !== parseInt(req.params.userId)) {
        throw new Error('El correo ya está en uso por otro usuario.');
      }
    }),
];

// Validaciones para actualizar un usuario en la versión v2 (incluye edad y fecha de nacimiento)
const validateUpdateUserV2 = [
  ...validateUpdateUserV1,
  body('edad').optional()
    .isInt({ min: 1 }).withMessage('La edad debe ser un número entero positivo.'),
  body('fecha_nacimiento').optional()
    .isDate().withMessage('La fecha de nacimiento debe ser una fecha válida en formato YYYY-MM-DD.'),
];

// Validación para eliminar un usuario
const validateDeleteUser = [
  param('userId').notEmpty().withMessage('El ID del usuario es requerido.').isInt().withMessage('ID inválido.'),
];

// Validación para obtener un usuario
const validateGetUser = [
  param('userId').notEmpty().withMessage('El ID del usuario es requerido.').isInt().withMessage('ID inválido.'),
];

// Función para manejar resultados de validación
const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegisterUserV1,
  validateRegisterUserV2,
  validateUpdateUserV1,
  validateUpdateUserV2,
  validateDeleteUser,
  validateGetUser,
  checkValidationResult,
};
