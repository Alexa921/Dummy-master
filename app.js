const express = require("express")
global.app = express()
global.config = require("./config.js").config
const mongoose = require("mongoose")
var cors = require('cors')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
global.SHA256 = require('sha256')
global.jwt = require("jsonwebtoken")
global.path = require('path')
global.appRoot = path.resolve(__dirname)


mongoose.connect("mongodb://" + config.bdUser + ":" + config.bdPass + '@' + config.bdIp + ":" + config.bdPort +  "/" + config.bd).then((respuesta)=>{
    console.log("Conexion correcta a mongo")
}).catch((error) => {
    console.log(error)
})


app.use(cors({
    origin:function(origin, callback){
        console.log(origin)
        if(!origin) return callback(null, true)
        if(config.origins.indexOf(origin) === -1){
            return callback('Error cors origen no autorizado por favor agregar a lista de Origins', false)
        }
        return callback(null, true)
    }
}))


require("./rutas.js")


app.use("/uploads", express.static(__dirname + '/uploads'))


app.use('/', express.static(__dirname + '/dist/frontend/browser'));
app.get('/*', function(req, res, next) {
    res.sendFile(path.resolve(__dirname + "/dist/frontend/browser/index.html"));
});

app.listen( config.puerto , function(){
    console.log("servidor funcionando por el puerto " + config.puerto)
})


