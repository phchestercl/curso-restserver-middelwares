const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../helpers/generarjwt');
const Usuario = require('../models/usuario');
const login = async (req, res=response)=>{
    const { correo, password }=req.body;
    try {
        // verificar si el mail existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg:'El usuario no existe en la base de datos'
            });
        }
        // verificar si el usuario esta activo
        if (!usuario.estado){
            return res.status(400).json({
                msg:'El usuario no está activo'
            });
        }
        // verificar la contraseña
        const validPassword=bcryptjs.compareSync(password, usuario.password);
        if (!validPassword){
            return res.status(400).json({
                msg:'la password no es la correcta'
            });
        }

        // generar JWT
        const token = await generarJWT(usuario.id);

        res.status(200).json({ 
            msg:'log ok',
            usuario,
            token

        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            msg:'Algo salío mal'
        });
    }
};


module.exports={
    login,
}