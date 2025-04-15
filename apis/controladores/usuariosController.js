var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel
var nodemailer = require('nodemailer')
const { config } = require("../../config.js")


var usuariosController = {}

usuariosController.Registrar = function(request, response){

    var post = {
        nombre:request.body.nombre,
        email:request.body.email,
        password:request.body.password
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"el campo nombre es obligatorio"})
        return false
    }

    if(post.nombre.length > 30){
        response.json({state:false, mensaje:"el campo nombre de ser maximo 30 caracteres"})
        return false
    }

    if(post.nombre.length < 1){
        response.json({state:false, mensaje:"el campo nombre debe ser minimo 1 caracteres"})
        return false
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"el campo email es obligatorio"})
        return false
    }
    
    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"el campo password es obligatorio"})
        return false
    }

    const regex = /^(?=.*[A-Z])(?=(.*\d){2,}).{6,}$/;
    if(regex.test(post.password) == false){
        response.json({state:false, mensaje:"el campo password debe contener minimo 2 numeros y una mayuscula y debe ser de longitud minima 6"})
        return false
    }

    post.password = SHA256(post.password + config.encriptado)

     usuariosModel.VerificarEmail(post, function(verif){
         if(verif.continuar == 'Si'){

            post.azar = "G-" + Math.floor(Math.random() * (9999 - 1000) + 1000);

            //enviar correo electronico
            const transporter = nodemailer.createTransport({
                host:config.email.host,
                port:config.email.port,
                secure:false,
                requireTLS:true,
                auth:{
                    user:config.email.user,
                    pass:config.email.pass
                }
            })

            let mailOptions = {
                from:"",
                to:post.email,
                subject:"Verifica tu cuenta con el codigo " + post.azar,
                html:`<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <h2 style="color: #333333;">¡Bienvenido/a!</h2>
                        <p style="color: #666666;">Gracias por registrarte. Haz clic en el botón de abajo para activar tu cuenta:</p>
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="${config.urlreal}/activar/${post.email}/${post.azar}" style="background-color: #28a745; color: #ffffff; padding: 15px 25px; text-decoration: none; font-size: 16px; border-radius: 5px;">Activar Cuenta</a>
                        </div>
                        <p style="color: #666666;">Si no has creado una cuenta, puedes ignorar este correo.</p>
                        <hr style="border: none; border-top: 1px solid #dddddd; margin: 20px 0;">
                        <p style="color: #999999; font-size: 12px; text-align: center;">© 2024 TuCompañía. Todos los derechos reservados.</p>
                    </div>
                </div>`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    console.log(error)
                }
                else{
                    console.log(info)
                }
            })



            usuariosModel.Registrar(post,function(respuesta){
                response.json(respuesta)
            })
         }
         else{
             response.json({state:false, mensaje:"Este Email ya existe en la BD"})
         }
    })

  
   



}
usuariosController.Guardar = function(request, response){

    var post = {
        nombre:request.body.nombre,
        email:request.body.email,
        password:request.body.password,
        rol:request.body.rol
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"el campo nombre es obligatorio"})
        return false
    }

    if(post.rol == undefined || post.rol == null || post.rol == ""){
        response.json({state:false, mensaje:"el campo rol es obligatorio"})
        return false
    }

    if(post.nombre.length > 30){
        response.json({state:false, mensaje:"el campo nombre de ser maximo 30 caracteres"})
        return false
    }

    if(post.nombre.length < 1){
        response.json({state:false, mensaje:"el campo nombre debe ser minimo 1 caracteres"})
        return false
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"el campo email es obligatorio"})
        return false
    }
    
    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"el campo password es obligatorio"})
        return false
    }

    const regex = /^(?=.*[A-Z])(?=(.*\d){2,}).{6,}$/;
    if(regex.test(post.password) == false){
        response.json({state:false, mensaje:"el campo password debe contener minimo 2 numeros y una mayuscula y debe ser de longitud minima 6"})
        return false
    }

    post.password = SHA256(post.password + config.encriptado)

     usuariosModel.VerificarEmail(post, function(verif){
         if(verif.continuar == 'Si'){

            post.azar = "G-" + Math.floor(Math.random() * (9999 - 1000) + 1000);

            //enviar correo electronico
            const transporter = nodemailer.createTransport({
                host:config.email.host,
                port:config.email.port,
                secure:false,
                requireTLS:true,
                auth:{
                    user:config.email.user,
                    pass:config.email.pass
                }
            })

            let mailOptions = {
                from:"",
                to:post.email,
                subject:"Verifica tu cuenta con el codigo " + post.azar,
                html:`<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <h2 style="color: #333333;">¡Bienvenido/a!</h2>
                        <p style="color: #666666;">Gracias por registrarte. Haz clic en el botón de abajo para activar tu cuenta:</p>
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="${config.urlreal}/activar/${post.email}/${post.azar}" style="background-color: #28a745; color: #ffffff; padding: 15px 25px; text-decoration: none; font-size: 16px; border-radius: 5px;">Activar Cuenta</a>
                        </div>
                        <p style="color: #666666;">Si no has creado una cuenta, puedes ignorar este correo.</p>
                        <hr style="border: none; border-top: 1px solid #dddddd; margin: 20px 0;">
                        <p style="color: #999999; font-size: 12px; text-align: center;">© 2024 TuCompañía. Todos los derechos reservados.</p>
                    </div>
                </div>`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    console.log(error)
                }
                else{
                    console.log(info)
                }
            })



            usuariosModel.Guardar(post,function(respuesta){
                response.json(respuesta)
            })
         }
         else{
             response.json({state:false, mensaje:"Este Email ya existe en la BD"})
         }
    })

  
   



}
usuariosController.CrearAdmin = function(request, response){

    var post = {
        nombre:"Administrador",
        email:request.body.email,
        password:request.body.password
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"el campo nombre es obligatorio"})
        return false
    }

    if(post.nombre.length > 30){
        response.json({state:false, mensaje:"el campo nombre de ser maximo 30 caracteres"})
        return false
    }

    if(post.nombre.length < 1){
        response.json({state:false, mensaje:"el campo nombre debe ser minimo 1 caracteres"})
        return false
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"el campo email es obligatorio"})
        return false
    }
    
    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"el campo password es obligatorio"})
        return false
    }

    const regex = /^(?=.*[A-Z])(?=(.*\d){2,}).{6,}$/;
    if(regex.test(post.password) == false){
        response.json({state:false, mensaje:"el campo password debe contener minimo 2 numeros y una mayuscula y debe ser de longitud minima 6"})
        return false
    }

    post.password = SHA256(post.password + config.encriptado)

    usuariosModel.ValidaConfiguracionInicial(null, function(rescant){
        if(rescant.cantidad == 0){
            usuariosModel.GuardarAdmin(post,function(respuesta){
                response.json(respuesta)
            })
        }
        else{
            response.json({state:false, mensaje:"Ya Existe un Usuario Administrador"})
        }
    })
  
  
   



}
usuariosController.Listar = function(request, response){
    usuariosModel.Listar(null,function(respuesta){
        response.json(respuesta)
    })
}

usuariosController.ListarId = function(request, response){

    var post = {
        _id: request.body._id,
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"el campo email es obligatorio"})
        return false
    }

    usuariosModel.ListarId(post,function(respuesta){
        response.json(respuesta)
    })
}
usuariosController.Actualizar = function(request, response){
    var post = {
        _id: request.body._id,
        nombre:request.body.nombre,
        rol:request.body.rol
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"el campo _id es obligatorio"})
        return false
    }
    
    if(post.nombre == undefined || post.nombre == null ){
        response.json({state:false, mensaje:"el campo nombre es obligatorio"})
        return false
    }

       
    if(post.rol == undefined || post.rol == null ){
        response.json({state:false, mensaje:"el campo rol es obligatorio"})
        return false
    }

           usuariosModel.Actualizar(post, function(actualiza){
           
            if(actualiza.state == true){
                response.json({state:true, mensaje:"Usuario Actualizado correctamente"})
            }
            else{
                response.json({state:false, mensaje:"error al actualizar"})
            }            
           })
            
      

}
usuariosController.Eliminar = function(request, response){
    var post = {
        _id: request.body._id,
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"el campo email es obligatorio"})
        return false
    }
    
   

           usuariosModel.Eliminar(post, function(reselim){
           
            if(reselim.state == true){
                response.json({state:true, mensaje:"Usuario Eliminado correctamente"})
            }
            else{
                response.json({state:false, mensaje:"error al Eliminar"})
            }            
           })
            
        

  
}
usuariosController.login = function(request, response){
    var post = {
        email:request.body.email,
        password:request.body.password
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"el campo email es obligatorio"})
        return false
    }
    
    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"el campo password es obligatorio"})
        return false
    }

    post.password = SHA256(post.password + config.encriptado)

    usuariosModel.login(post,function(respuesta){
        respuesta.token = ''

        if(respuesta.state == true){

           var payload = {
                nombre:respuesta.nombre,
                email:respuesta.email,
                rol:respuesta.rol,
                _id:respuesta._id
           } 
           const token = jwt.sign(payload,config.encriptado, {expiresIn:config.tiemposesion})
           respuesta.token = token
        }

        response.json(respuesta)
       
    })


}
usuariosController.Activar = function(request, response){
    var post = {
        email:request.body.email,
        azar:request.body.azar
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"el campo email es obligatorio"})
        return false
    }
    
    if(post.azar == undefined || post.azar == null || post.azar == ""){
        response.json({state:false, mensaje:"el campo azar es obligatorio"})
        return false
    }


    usuariosModel.Activar(post,function(respuesta){
        response.json(respuesta)
    })


}
usuariosController.ActualizarPass = function(request, response){
    var post = {
        password:request.body.password,
        _id:''
    }
    
    if(post.password == undefined || post.password == null || post.password == "" ){
        response.json({state:false, mensaje:"el campo password es obligatorio"})
        return false
    }

    post.password = SHA256(post.password + config.encriptado)

    if(request.headers.authorization == undefined){
        response.json({state:false, mensaje:"Debe enviar el token en Authorization con Bearer"})
        return false
    }

  

    var token = request.headers.authorization.split(" ")[1].trim()
    jwt.verify(token,config.encriptado, (error, decoded) => {
      
        if(decoded == undefined){
            response.json({state:false, mensaje:"Token No Valido"})
            return false
        }

        post._id = decoded._id
       
        usuariosModel.ActualizarPass(post, function(actualiza){
           
            if(actualiza.state == true){
                response.json({state:true, mensaje:"Password Actualizado correctamente"})
            }
            else{
                response.json({state:false, mensaje:"error al actualizar el password"})
            }            
           })
      

    })


  
            
       

 


    

}
usuariosController.ActualizarName = function(request, response){
    var post = {
        nombre:request.body.nombre,
        _id:''
    }
    
    if(post.nombre == undefined || post.nombre == null || post.nombre == "" ){
        response.json({state:false, mensaje:"el campo nombre es obligatorio"})
        return false
    }



    if(request.headers.authorization == undefined){
        response.json({state:false, mensaje:"Debe enviar el token en Authorization con Bearer"})
        return false
    }

  

    var token = request.headers.authorization.split(" ")[1].trim()
    jwt.verify(token,config.encriptado, (error, decoded) => {
      
        if(decoded == undefined){
            response.json({state:false, mensaje:"Token No Valido"})
            return false
        }
        
        post._id = decoded._id
       
        usuariosModel.ActualizarName(post, function(actualiza){
           
            if(actualiza.state == true){
                response.json({state:true, mensaje:"Nombre Actualizado correctamente"})
            }
            else{
                response.json({state:false, mensaje:"error al actualizar el Nombre"})
            }            
           })
      

    })


  
            
       

 


    

}
usuariosController.state = function(request,response){


    var token = request.headers.authorization.split(" ")[1].trim()
    jwt.verify(token,config.encriptado, (error, decoded) => {
        if(error){
            console.log(error)
            response.json({state:false, mensaje:"Token no valido",error:error})
        }
        else{
            request.decoded = decoded
            response.json({state:true, decoded:decoded})
        }
    })
    
}
usuariosController.ValidaConfiguracionInicial = function(request, response){
    usuariosModel.ValidaConfiguracionInicial(null,function(respuesta){
        response.json(respuesta)
    })
}


module.exports.usuariosController = usuariosController