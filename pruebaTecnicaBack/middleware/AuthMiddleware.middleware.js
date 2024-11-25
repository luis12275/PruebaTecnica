const jwt = require('jsonwebtoken');
const {secret} = require("../config");

module.exports = (req, res, next) => {

    const token = req.headers["authorization"];
    if(!token){
        console.log('Error de autorizacion')
        const error = new Error();
        error.meta = "El Token debe ser enviado";
        error.status = 400;
        throw error;
    }

    jwt.verify(token, secret, (err, decodedToken) => {
        if(err) {
            io.emit('tokenExpiro', {
                data: token
            })

            const error = new Error();
            error.meta = "Token invalido";
            error.status = 401;
            throw error;
        }

        req.user = decodedToken.user;
        next();
    }); 

}

