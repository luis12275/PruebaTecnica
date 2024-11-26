const {sign} = require('jsonwebtoken');
const {secret} = require('../config');

module.exports.generateToken = (user) => {
    return sign({user:user}, secret, {expiresIn: "10h"});
}
//refeshToken 48
module.exports.generateRefreshToken = (user) => {
    return sign({user:user}, secret);
}
