const jwt = require('jsonwebtoken')
const secret = require('./secretKey')

module.exports = (name, id) => {
const secret = require('./secretKey')
    return jwt.sign({name:name, id: id}, secret.secret, {expiresIn: 86400})
}
