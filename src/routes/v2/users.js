const express = require('express');

const { registerUser, updateUser, deleteUser, getUserById } = require('../../controller/users');
const {
  validateRegisterUserV2,
  validateUpdateUserV2,
  validateDeleteUser,
  validateGetUser,
  checkValidationResult,
} = require('../../middleware/validateUser');
const {
  checkBodyUpdate
} = require('../../middleware/checkbody');
const router = express.Router();

router.post('/register', validateRegisterUserV2, checkValidationResult, registerUser); // Regitramos a un Usuario
router.put('/:userId', checkBodyUpdate,validateUpdateUserV2, checkValidationResult, updateUser); // Actualizamos información del Usuario por ID
router.delete('/:userId', validateDeleteUser, checkValidationResult, deleteUser); // Eliminamos Usuario por ID
router.get('/:userId', validateGetUser, checkValidationResult, getUserById); // Obtenemos Usuario por ID

module.exports = router;