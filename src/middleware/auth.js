const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { AuthError } = require('../routers/helpers/applicationError')
const { handleValidationErrors } = require('../routers/helpers/handleErrors')


const auth = async (req, res, next) => {
    try{
        const cookie = req.headers.cookie
        if(!cookie || cookie.indexOf('token') === -1){
            throw new AuthError('Please authenticate', 401)
        }

        const token = cookie.replace('token=', '').split(';')[0]
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)
       
        const user = await User.findOne({ _id, 'tokens.token': token })
        if(!user) throw new AuthError('Please authenticate', 401)
        next()
    }catch (error){
        handleValidationErrors(error, req, res)
    }
}

module.exports = { auth }

