var config = {
    email:{}
}
config.urlreal = "http://localhost:3000" //nombre del dominio
config.puerto = 3000

config.bd = "BackendBit" //nombre bd mongo
config.bdUser = ""
config.bdPass = ""
config.bdIp = "127.0.0.1"
config.bdPort = "27017"

config.encriptado = 'f5dsa6f5d7saf587da5fd5f67sda5f67a65fda4564fd86sa'
config.origins = [
    'http://localhost:4200',
    'http://localhost:3000'
]
//claves para envio de correos
config.email.host = "smtp.gmail.com"
config.email.port = 587
config.email.user = "pruebasprogramacion123@gmail.com"
config.email.pass = "ctjvutcgrpiutlqn"

config.tiemposesion = '60m'

module.exports.config = config
