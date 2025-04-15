const mongoose = require("mongoose")
var usuariosModel = {}

var Schema = mongoose.Schema

var usuariosSchema = new Schema({
    nombre:String,
    email:String,
    password:String,
    rol:String,
    estado:String,
    azar:String
})

const Mymodel = mongoose.model("usuarios",usuariosSchema)


usuariosModel.Guardar = function(post, callback){

    const instancia = new Mymodel
    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.password = post.password
    instancia.rol = post.rol //cliente, Administrador, Facturador
    instancia.estado = "1"
    instancia.azar = post.azar

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje:"Usuario Guardado"})
    }).catch((error)=> {
        console.log(error)
        return callback({state:false, mensaje:"Error al almacenar"})
    })


}
usuariosModel.Registrar = function(post, callback){

    const instancia = new Mymodel
    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.password = post.password
    instancia.rol = "Cliente" //cliente, Admin,
    instancia.estado = "0"
    instancia.azar = post.azar

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje:"Usuario Guardado"})
    }).catch((error)=> {
        console.log(error)
        return callback({state:false, mensaje:"Error al almacenar"})
    })


}
usuariosModel.GuardarAdmin = function(post, callback){

    const instancia = new Mymodel
    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.password = post.password
    instancia.rol = "Admin" //Cliente, Admin
    instancia.estado = "1"
    instancia.azar = "G-0000"

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje:"Usuario Administrador Guardado"})
    }).catch((error)=> {
        console.log(error)
        return callback({state:false, mensaje:"Error al almacenar"})
    })


}



usuariosModel.Listar = function(post, callback){
    Mymodel.find({},{password:0,__v:0}).then((respuesta) => {
        return callback({state:true, datos:respuesta})
    }).catch((error) => {
        console.log(error)
        return callback({state:false, error:error, datos:[]})
    })
  
}

usuariosModel.ValidaConfiguracionInicial = function(post, callback){
    Mymodel.find({},{password:0,__v:0}).then((respuesta) => {
        return callback({state:true, cantidad:respuesta.length})
    }).catch((error) => {
        console.log(error)
        return callback({state:false, error:error, datos:[]})
    })
}




usuariosModel.ListarId = function(post, callback){
    Mymodel.find({_id:post._id},{password:0,__v:0}).then((respuesta) => {
        return callback({state:true, datos:respuesta})
    }).catch((error) => {
        console.log(error)
        return callback({state:false, error:error, datos:[]})
    })
  
}

usuariosModel.VerificarEmail = function(post, callback){

    Mymodel.find({email:post.email},{}).then((respuesta) => {
        console.log(respuesta.length)
        if(respuesta.length >= 1){
            return callback({continuar:'No'})
        }
        else{
            return callback({continuar:'Si'})
        }

    }).catch((error) => {
        console.log(error)
        return callback({state:false, error:error})
    })

    

}

usuariosModel.Actualizar = function(post, callback){

    Mymodel.findOneAndUpdate({_id:post._id},{
        nombre:post.nombre,
        rol:post.rol
    }).then((respuesta) => {
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false, error:error})
    })
   
}

usuariosModel.ActualizarPass = function(post, callback){

    Mymodel.findOneAndUpdate({_id:post._id},{
        password:post.password
    }).then((respuesta) => {
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false, error:error})
    })

    // var posicion = usuarios.findIndex((item) => item.email == post.email)
    // if(posicion >= 0){
    //     usuarios[posicion].password = post.password

    //     return callback({state:true})
    // }
    // else{
    //     return callback({state:false})
    // }
    

}
usuariosModel.ActualizarName = function(post, callback){

    Mymodel.findOneAndUpdate({_id:post._id},{
        nombre:post.nombre
    }).then((respuesta) => {
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false, error:error})
    })

    // var posicion = usuarios.findIndex((item) => item.email == post.email)
    // if(posicion >= 0){
    //     usuarios[posicion].password = post.password

    //     return callback({state:true})
    // }
    // else{
    //     return callback({state:false})
    // }
    

}



usuariosModel.Eliminar = function(post, callback){

    Mymodel.findOneAndDelete({_id:post._id}).then((respuesta) => {
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false, error:error})
    })


}

usuariosModel.login = function(post, callback){

    Mymodel.find({email:post.email, password:post.password, estado:'1'},{}).then((respuesta) => {
        if(respuesta.length == 1){
            return callback({
                state:true 
                ,mensaje:"Bienvenido: " + respuesta[0].nombre
                ,nombre:respuesta[0].nombre
                ,email:respuesta[0].email
                ,rol:respuesta[0].rol
                ,_id:respuesta[0]._id
            })
        }
        else{
            return callback({state:false, mensaje:"Credenciales Invalidas, verifique que su cuenta este activa"})
        }

    }).catch((error) => {
        return callback({state:false, error:error})
    })

}

usuariosModel.Activar = function(post, callback){

    Mymodel.findOneAndUpdate({email:post.email,azar:post.azar},{
        estado:'1'
    }).then((respuesta) => {
       
        if(respuesta == undefined){
            return callback({state:false, mensaje:"Su codigo No es Valido"})
        }
        else{
            console.log('----->')
            console.log(respuesta)
            return callback({state:true, mensaje:"Su cuenta fue Activada"})
        }
       
    }).catch((error) => {
        console.log(error)
        return callback({state:false, error:error})
    })
   
}

module.exports.usuariosModel = usuariosModel