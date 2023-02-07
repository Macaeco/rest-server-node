const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true } 
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        // const resp = await Promise.all([ // SIN DESESTRUCTURAR 
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        
    ])

    res.json({
        // resp // SIN DESESTRUCTURAR
        total,
        usuarios
    })
};

const usuariosPost = async (req, res) => {

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol });

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save();

    res.status(201).json({
        usuario
    })
};

const usuariosPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body

    //TODO VALIDAR CONTRA BASE DE DATOS
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    // res.json(usuario)

    res.json({
        usuario
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