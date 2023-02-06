const express = require('express');
const cors = require('cors');
const  { dbConection } = require('../database/config');


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //conectar a bd
        this.conectarDB();


        //midelwares

        this.midelwares();

        //rutas de la app
        this.routes();
    }

    async conectarDB() {
        await dbConection();
    }

    midelwares() {

        //CORS
        this.app.use(cors());

        //Paseo y lectura del body
        this.app.use(express.json());


        //directorio publico
        this.app.use(express.static('public'));


    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en el puerto', this.port);
        });
    }

}

module.exports = Server;