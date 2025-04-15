const mongoose = require("mongoose")
var productosModel = {}

var Schema = mongoose.Schema

var productosSchema = new Schema({
    codigo:String,
    nombre:String,
    precio:Number
})

const Mymodel = mongoose.model("productos",productosSchema)

productosModel.VerificarCodigoUnico     = function(post, callback){

    Mymodel.find({codigo:post.codigo},{}).then((respuesta) => {
        if(respuesta.length > 0){
            return callback({existe:true})
        }
        else{
            return callback({existe:false})
        }
    }).catch((error) => {
        console.log(error)
        return callback({state:false, error:error})
    })

}
productosModel.Guardar                  = function(post, callback){

    const instancia = new Mymodel
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo
    instancia.precio = parseInt(post.precio)

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje:"Elemento Guardado"})
    }).catch((error)=> {
        console.log(error)
        return callback({state:false, mensaje:"Error al almacenar"})
    })

}
productosModel.Listar                   = function(post, callback){
    Mymodel.find({},{}).then((respuesta) => {
        return callback({state:true, datos:respuesta})
    }).catch((error) => {
        console.log(error)
        return callback({state:false, error:error, datos:[]})
    })
}
productosModel.ListarId                 = function(post, callback){
    Mymodel.find({_id:post._id},{}).then((respuesta) => {
        return callback({state:true, datos:respuesta})
    }).catch((error) => {
        console.log(error)
        return callback({state:false, error:error, datos:[]})
    })
}
productosModel.Actualizar               = function(post, callback){
    Mymodel.findOneAndUpdate({_id:post._id},{
        nombre:post.nombre,
        precio:parseInt(post.precio)
    }).then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false, error:error})
    })
}
productosModel.Eliminar                 = function(post, callback){
    Mymodel.findOneAndDelete({_id:post._id}).then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false, error:error})
    })
}




module.exports.productosModel = productosModel