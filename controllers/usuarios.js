const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apiKey } = req.query;

    res.json({
        ok: true,
        q,
        nombre,
        apiKey
    })
};

const usuariosPost =async (req, res) => {
 


    const {nombre,correo,password,rol} = req.body
    const usuario = new Usuario( {nombre,correo,password,rol});

    //verificar si el correo existe

    const  existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
        return res.status(400).json({
            msg: ' Ese correo ya está registrado , monada '
        })
    }


    //encriptar la contraseña

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt)

    await usuario.save();

    res.status(201).json({
        msg: 'post API works - controller',
        usuario
    })
};

const usuariosPut = (req, res) => {

    const id = req.params.id;

    res.status(500).json({
        msg: 'put API works - controller',
        id
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        ok: true,
        msg: 'delete API works - controller'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,

}