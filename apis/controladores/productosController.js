var productosModel = require('../modelos/productosModel.js').productosModel
var productosController = {}

productosController.Guardar     = function(request,response){
    var post = {
        codigo:request.body.codigo,
        nombre:request.body.nombre,
        precio:request.body.precio
    }

    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"el codigo es un campo obligatorio"})
        return false
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"el nombre es un campo obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje:"el precio es un campo obligatorio"})
        return false
    }

    productosModel.VerificarCodigoUnico(post, function(verifica){
        if(verifica.existe == false){
            productosModel.Guardar(post,function(saved){
                response.json(saved)
            })
        }
        else{
            response.json({state:false, mensaje:"el codigo del elemento la existe intente con otro"})
            return false  
        }

    })



}
productosController.Listar      = function(request,response){
    productosModel.Listar(null, function(listado){
        response.json(listado)
    })
}
productosController.ListarId    = function(request,response){
    var post = {
        _id:request.body._id,
      
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"el _id es un campo obligatorio"})
        return false
    }


    productosModel.ListarId(post, function(listado){
        response.json(listado)
    })

}
productosController.Actualizar  = function(request,response){

    var post = {
        _id:request.body._id,
        nombre:request.body.nombre,
        precio:request.body.precio
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"el _id es un campo obligatorio"})
        return false
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"el nombre es un campo obligatorio"})
        return false
    }
    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje:"el precio es un campo obligatorio"})
        return false
    }

    productosModel.Actualizar(post,function(saved){
       if(saved.state == true){
        response.json({state:true, mensaje:"El elemento fue actualizado correctamente"})
        return false
       }
       else{
        response.json({state:false, mensaje:"El elemento presento un error al actualizar"})
        return false
       }
    })
        
      

  
}
productosController.Eliminar    = function(request,response){

    var post = {
        _id:request.body._id,
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"el _id es un campo obligatorio"})
        return false
    }

    productosModel.Eliminar(post,function(saved){
       if(saved.state == true){
        response.json({state:true, mensaje:"El elemento fue eliminado correctamente"})
        return false
       }
       else{
        response.json({state:false, mensaje:"El elemento presento un error al eliminar"})
        return false
       }
    })

}







module.exports.productosController = productosController