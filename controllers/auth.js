const jwt = require('jsonwebtoken')
const constant= require('../constant')

const badRequest = message => ({
    status: 400,
    message: message || constant.MESSAGES.BAD_REQUEST
})

const isValidCredential = (email, passoword) =>
    email === process.env.USER_EMAIL && passoword === process.env.USER_PASSWORD

const createToken = (req, res, next) => {
    const {email, password} = req.body
    if (!email || !password) {
        return next(badRequest(constant.MESSAGES.MISSING_PARAMS))
    }
    const { TOKEN_SECRET} = process.env

    if (isValidCredential(email, password)) {
        const payload = {email, password}
        const token = jwt.sign(payload, TOKEN_SECRET)
        return res.send({token})
    }
    return res.sendStatus(401)
}

const verifyToken = (req,res, next) => {
    const token = req.headers.authorization
    const {TOKEN_SECRET} = process.env
    if (!token) {
        return next(new Error(constant.MESSAGES.AUTH_ERROR))
    }

    jwt.verify(token, TOKEN_SECRET, (err) => {
        if (err) {
            return next(new Error(constant.MESSAGES.AUTH_ERROR))
        }
        return next()
    })
}

module.exports = {createToken, verifyToken}
