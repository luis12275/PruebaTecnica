//IMPORTS DEPENDENCIES FOR app
const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser')
//let { ErrorMiddleware, AuthMiddleware } = require('./middlewares')
const http = require('http');
const { PORT } = require("./config")
//app
const app = express()

//IMPORT ROUTES FOR app
const { EscolaridadRoutes, HabilidadesRoutes,
    UsuarioHabilidadesRoutes, UsuariosRoutes } = require('./routes')


//app CONFIGURATION
app.use(express.json({
    limit: '50mb'
}))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app´S TESTING ENDPOINT
app.get("/echo", (req, res) => {
    res.send("API COMERCAM SAY HELLO!!")
})

//ADD ROUTES TO app
app.use('/api/Escolaridad', EscolaridadRoutes)
app.use('/api/Habilidades', HabilidadesRoutes)
app.use('/api/UsuarioHabilidades', UsuarioHabilidadesRoutes)
app.use('/api/Usuario', UsuariosRoutes)

//app.use(ErrorMiddleware)

//CONFIGURAR PUERTO
app.set('port', PORT)

//CREATE SERVER
const server = http.createServer(app);

//START server
server.listen(PORT, () => {
    console.log(`Application running on PORT ${PORT}`);
})








