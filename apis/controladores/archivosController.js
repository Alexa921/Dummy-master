var archivosController = {}
var multer = require("multer")

archivosController.Subir = function(request,response){
   

    var upload = multer({
        storage:multer.diskStorage({
            destination:(req,file,cb) => {
                cb(null, appRoot + "/uploads/")
            },
            filename: (req,file,cb) => {
                cb(null, request.params.idseleccionado + '.png'  )
            }
        })
    }).single('userFile')

    upload(request, response,function(err){
        if(err){
            console.log(err)
            response.json(err)
        }
        else{
            response.json({state:true})
        }
    })


    
}


module.exports.archivosController = archivosController