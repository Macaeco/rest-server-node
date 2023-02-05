const { response, request } = require('express');


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apiKey} = req.query;

    res.json({
        ok: true,
        q,
        nombre,
        apiKey
    })
};

const usuariosPost = (req, res) => {

    const { nombre, edad } = req.body

    res.status(201).json({
        msg: 'post API works - controller',
        nombre,
        edad,
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