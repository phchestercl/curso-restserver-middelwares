const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(role = '')=>{
    const existeRole = await Role.findOne({role});
    if (!existeRole) {
        throw new Error('El Rol no está regsitrado en la base de datos');
    }
};
const existeUsuarioPorID = async (id)=>{
    const existeUsID = await Usuario.findById(id);
    if (!existeUsID){
        throw new Error('No existe usuario para el ID ingresado');
    }
};
const existeMail = async (correo='')=>{
    const existeCorreo = await Usuario.findOne({correo});
    
    if (existeCorreo) {
        throw new Error(`El Correo ${correo} ya está registrado`);
    }
};

module.exports={
    esRolValido,
    existeMail,
    existeUsuarioPorID
}


