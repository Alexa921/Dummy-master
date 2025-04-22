const express = require("express");
global.app = express();
global.config = require("./config.js").config;
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
global.SHA256 = require("sha256");
global.jwt = require("jsonwebtoken");
global.path = require("path");
global.appRoot = path.resolve(__dirname);

// Construir URI de conexión a Mongo según tenga usuario o no
let mongoUrl = "";

if (config.bdUser && config.bdPass) {
    mongoUrl = `mongodb://${config.bdUser}:${config.bdPass}@${config.bdIp}:${config.bdPort}/${config.bd}`;
} else {
    mongoUrl = `mongodb://${config.bdIp}:${config.bdPort}/${config.bd}`;
}

// Conexión a MongoDB
mongoose.connect(mongoUrl)
    .then(() => {
        console.log("✅ Conexión correcta a MongoDB");
    })
    .catch((error) => {
        console.error("❌ Error al conectar a MongoDB:", error.message);
    });

// Configuración CORS
app.use(cors({
    origin: function (origin, callback) {
        console.log("🌐 Origen recibido:", origin);
        if (!origin) return callback(null, true);
        if (config.origins.indexOf(origin) === -1) {
            return callback('❌ Error CORS: origen no autorizado', false);
        }
        return callback(null, true);
    }
}));

// Rutas
require("./rutas.js");

// Archivos estáticos y SPA
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/", express.static(__dirname + "/dist/frontend/browser"));
app.get("/*", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/dist/frontend/browser/index.html"));
});

// Iniciar servidor
app.listen(config.puerto, function () {
    console.log("🚀 Servidor funcionando por el puerto " + config.puerto);
});
