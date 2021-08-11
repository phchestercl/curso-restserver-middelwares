const express = require('express');
const cors = require('cors');

const { dbConnection }=require('../database/config')
class Server{
    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.userPath='/api/users';
        this.autPath='/api/auth';
        // conectar a base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes();
        
    };
    async conectarDB(){
        await dbConnection();
    };
    routes(){
        this.app.use(this.userPath, require('../routes/user'));
        this.app.use(this.autPath, require('../routes/auth'))
                
    };
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    };
    middlewares(){
        //CORS
        this.app.use( cors());
        // Lectura y parseo del body
        /**
         * Este midellware permite recivir información de los post y put
         */
        this.app.use(express.json());
        // Directorio publico
        this.app.use( express.static('public'));
    }
};


module.exports=Server;