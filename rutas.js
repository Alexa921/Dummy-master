var usuariosController = require("./apis/controladores/usuariosController.js").usuariosController


var soloadmin = function(request, response, next){

    var token = request.headers.authorization.split(" ")[1].trim()
    jwt.verify(token,config.encriptado, (error, decoded) => {

        if(decoded == undefined){
            response.json({state:false, mensaje:"El Token Caduco"})
            return false
        }
    
        if(decoded.rol == 'Admin'){
            next()
        }
        else{
            response.json({state:false, mensaje:"Esta Api solo es para Uso del Admin"})
        }
    
    })

}
  

   

app.post("/usuarios/guardar", function(request,response){
    usuariosController.Guardar(request, response)
})

app.post("/usuarios/Registrar", function(request,response){
    usuariosController.Registrar(request, response)
})

app.get("/usuarios/listar",soloadmin, function(request,response){
    usuariosController.Listar(request, response)
})

app.post("/usuarios/listarId", function(request,response){
    usuariosController.ListarId(request, response)
})

app.post("/usuarios/actualizar",soloadmin, function(request,response){
    usuariosController.Actualizar(request, response)
})

app.post("/usuarios/eliminar",soloadmin, function(request,response){
    usuariosController.Eliminar(request,response)
})

app.post("/usuarios/login", function(request,response){
    usuariosController.login(request,response)
})

app.post("/usuarios/Activar", function(request,response){
    usuariosController.Activar(request,response)
})

app.post("/usuarios/ActualizarPass", function(request,response){
    usuariosController.ActualizarPass(request, response)
})

app.post("/usuarios/ActualizarName", function(request,response){
    usuariosController.ActualizarName(request, response)
})

app.post("/usuarios/ValidaConfiguracionInicial", function(request,response){
    usuariosController.ValidaConfiguracionInicial(request, response)
})

app.post("/usuarios/CrearAdmin", function(request,response){
    usuariosController.CrearAdmin(request, response)
})





app.post("/usuarios/state", function(request,response){
    usuariosController.state(request,response)
})

var productosController = require("./apis/controladores/productosController.js").productosController

app.post("/productos/Guardar", function(request,response){
    productosController.Guardar(request, response)
})

app.post("/productos/Listar", function(request,response){
    productosController.Listar(request, response)
})

app.post("/productos/ListarId", function(request,response){
    productosController.ListarId(request, response)
})

app.post("/productos/Actualizar", function(request,response){
    productosController.Actualizar(request, response)
})

app.post("/productos/Eliminar", function(request,response){
    productosController.Eliminar(request,response)
})



var archivosController = require("./apis/controladores/archivosController.js").archivosController
app.post('/upload/:idseleccionado', function(request,response){
    archivosController.Subir(request,response)
})

