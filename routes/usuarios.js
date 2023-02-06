const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');
const { esRolValido } = require('../helpers/db-validators');
const { validarCampos } = require('../midelwares/validar-campos');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe tener más de seis letras').isLength({min:6}),
    check('correo','El correo no es válido').isEmail(),
    // check('rol','El rol no es rol permitido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom((rol) => esRolValido(rol)),
    validarCampos
],usuariosPost);

router.put('/:id', usuariosPut);

router.delete('/', usuariosDelete);

module.exports = router;